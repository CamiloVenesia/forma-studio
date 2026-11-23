
import { isIP } from 'node:net';
import { env } from 'node:process';
import nodemailer from 'nodemailer';

import {
  activities,
  createSubmissionSummary,
  difficulties,
  experiences,
  formatExperience,
  formatTrainingEquipment,
  formatTrainingLocation,
  getEquipmentOptions,
  goals,
  intakeLimits,
  validateStep,
} from '../src/features/intake/model.js';

import type { IntakeData } from '../src/features/intake/model.js';

import {
  formatDiscipline,
  formatModality,
} from '../src/utils/text.js';

const MAX_BODY_BYTES = 20_000;
const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_MAX_CLIENTS = 1_000;
const RATE_LIMIT_CLEANUP_INTERVAL = 60_000;

const rateLimitStore = new Map<
  string,
  { count: number; expiresAt: number }
>();

let lastRateLimitCleanup = 0;

const stringFields = [
  'discipline',
  'modality',
  'name',
  'age',
  'city',
  'phone',
  'otherGoal',
  'activity',
  'otherActivity',
  'experience',
  'days',
  'duration',
  'location',
  'otherEquipment',
  'hasDiscomfort',
  'discomfortDetails',
  'otherDifficulty',
  'comments',
] as const;

const arrayFields = [
  'goals',
  'equipment',
  'difficulties',
] as const;

function jsonResponse(
  body: Record<string, unknown>,
  status = 200,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value)
  );
}

function isIntakeData(value: unknown): value is IntakeData {
  if (!isRecord(value)) return false;

  const validStrings = stringFields.every(
    (field) => typeof value[field] === 'string',
  );

  const validArrays = arrayFields.every(
    (field) =>
      Array.isArray(value[field]) &&
      value[field].every((item: unknown) => typeof item === 'string'),
  );

  return validStrings && validArrays;
}

function isOriginAllowed(origin: string | null): boolean {
  const allowedOrigins = (env.ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  return Boolean(
    origin &&
      allowedOrigins.length > 0 &&
      allowedOrigins.includes(origin),
  );
}

function getClientIp(request: Request): string {
  // Vercel proporciona x-real-ip.
  const realIp = request.headers.get('x-real-ip')?.trim();

  if (realIp && isIP(realIp)) {
    return realIp;
  }

  const forwardedIp = request.headers
    .get('x-forwarded-for')
    ?.split(',')[0]
    ?.trim();

  return forwardedIp && isIP(forwardedIp) ? forwardedIp : 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  if (
    now - lastRateLimitCleanup >= RATE_LIMIT_CLEANUP_INTERVAL ||
    rateLimitStore.size >= RATE_LIMIT_MAX_CLIENTS
  ) {
    for (const [key, entry] of rateLimitStore) {
      if (now >= entry.expiresAt) {
        rateLimitStore.delete(key);
      }
    }

    lastRateLimitCleanup = now;
  }

  const current = rateLimitStore.get(ip);

  if (!current || now >= current.expiresAt) {
    if (!current && rateLimitStore.size >= RATE_LIMIT_MAX_CLIENTS) {
      return true;
    }

    rateLimitStore.set(ip, {
      count: 1,
      expiresAt: now + RATE_LIMIT_WINDOW,
    });

    return false;
  }

  if (current.count >= RATE_LIMIT_MAX) {
    return true;
  }

  current.count += 1;
  return false;
}

function isJsonContentType(contentType: string): boolean {
  return (
    contentType.split(';', 1)[0]?.trim().toLowerCase() ===
    'application/json'
  );
}

type BodyReadResult =
  | { ok: true; body: string }
  | { ok: false; status: 400 | 413; message: string };

async function readLimitedBody(
  request: Request,
): Promise<BodyReadResult> {
  if (!request.body) {
    return {
      ok: false,
      status: 400,
      message: 'La solicitud está vacía.',
    };
  }

  const reader = request.body.getReader();
  const decoder = new TextDecoder('utf-8', { fatal: true });
  const chunks: string[] = [];
  let bytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      bytes += value.byteLength;

      if (bytes > MAX_BODY_BYTES) {
        void reader.cancel().catch(() => undefined);

        return {
          ok: false,
          status: 413,
          message: 'La solicitud supera el tamaño permitido.',
        };
      }

      chunks.push(decoder.decode(value, { stream: true }));
    }

    chunks.push(decoder.decode());

    return {
      ok: true,
      body: chunks.join(''),
    };
  } catch {
    return {
      ok: false,
      status: 400,
      message: 'No se pudo leer la solicitud.',
    };
  } finally {
    reader.releaseLock();
  }
}

function getSmtpErrorCode(error: unknown): string {
  if (!isRecord(error)) return 'UNKNOWN';

  const code = error.code;

  return (
    typeof code === 'string' &&
    /^[A-Z0-9_]{1,32}$/.test(code)
  )
    ? code
    : 'UNKNOWN';
}

function escapeHtml(value: string): string {
  const replacements: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };

  return value.replace(
    /[&<>"']/g,
    (character) => replacements[character] ?? character,
  );
}

function formatOtherValues(
  values: string[],
  other: string,
): string {
  return (
    values
      .map((value) =>
        value === 'Otros' || value === 'Otro'
          ? `${value}: ${other.trim()}`
          : value,
      )
      .join(', ') || '—'
  );
}

function validateIntakeData(data: IntakeData): string[] {
  const errors: string[] = [];

  const maxLengths = {
    name: intakeLimits.name,
    age: intakeLimits.age,
    city: intakeLimits.city,
    phone: intakeLimits.phone,
    otherGoal: intakeLimits.other,
    otherActivity: intakeLimits.other,
    otherEquipment: intakeLimits.other,
    discomfortDetails: intakeLimits.discomfortDetails,
    otherDifficulty: intakeLimits.other,
    comments: intakeLimits.comments,
  } satisfies Partial<Record<keyof IntakeData, number>>;

  for (const [field, maximum] of Object.entries(maxLengths)) {
    const value = data[field as keyof IntakeData];

    if (typeof value === 'string' && value.length > maximum) {
      errors.push(
        `El campo ${field} supera el límite permitido.`,
      );
    }
  }

  const validGoals = new Set<string>(goals);
  const validActivities = new Set<string>(activities);
  const validDifficulties = new Set<string>(difficulties);
  const validEquipment = new Set<string>(
    getEquipmentOptions(data.discipline),
  );

  if (!data.goals.every((value) => validGoals.has(value))) {
    errors.push('Hay objetivos no válidos.');
  }

  if (!validActivities.has(data.activity)) {
    errors.push('La actividad seleccionada no es válida.');
  }

  if (
    !data.equipment.every((value) =>
      validEquipment.has(value),
    )
  ) {
    errors.push('Hay elementos de equipamiento no válidos.');
  }

  if (
    !data.difficulties.every((value) =>
      validDifficulties.has(value),
    )
  ) {
    errors.push('Hay dificultades no válidas.');
  }

  if (data.goals.length > 2) {
    errors.push('No se permiten más de dos objetivos.');
  }

  if (data.equipment.length > validEquipment.size) {
    errors.push('La selección de equipamiento no es válida.');
  }

  if (data.difficulties.length > difficulties.length) {
    errors.push('La selección de dificultades no es válida.');
  }

  if (
    !experiences.some(
      (experience) => experience.value === data.experience,
    )
  ) {
    errors.push('La experiencia seleccionada no es válida.');
  }

  for (const selections of [
    data.goals,
    data.equipment,
    data.difficulties,
  ]) {
    if (new Set(selections).size !== selections.length) {
      errors.push(
        'Hay opciones seleccionadas más de una vez.',
      );
    }
  }

  for (let step = 0; step < 5; step += 1) {
    errors.push(...validateStep(step, data));
  }

  return [...new Set(errors)];
}

function buildEmailRows(
  data: IntakeData,
): Array<[string, string]> {
  const goalsText = formatOtherValues(
    data.goals,
    data.otherGoal,
  );

  const activityText =
    data.activity === 'Otros'
      ? `Otros: ${data.otherActivity.trim()}`
      : data.activity;

  const difficultiesText = formatOtherValues(
    data.difficulties,
    data.otherDifficulty,
  );

  const discomfortText =
    data.discomfortDetails.trim() ||
    (
      data.hasDiscomfort === 'no'
        ? 'No aplica'
        : 'Sin indicar'
    );

  return [
    [
      'Disciplina',
      data.discipline
        ? formatDiscipline(data.discipline)
        : 'Sin definir',
    ],
    [
      'Modalidad',
      data.modality
        ? formatModality(data.modality)
        : 'Sin definir',
    ],
    ['1. Nombre y apellido', data.name.trim()],
    ['2. Edad', `${data.age} años`],
    ['3. Ciudad', data.city.trim()],
    ['4. WhatsApp', data.phone.trim()],
    ['5. Objetivos', goalsText],
    [
      '6. Deporte u otra actividad física',
      activityText,
    ],
    [
      '7. Experiencia entrenando',
      formatExperience(data.experience),
    ],
    ['8. Días por semana', `${data.days} días`],
    ['9. Tiempo por entrenamiento', data.duration],
    [
      '10. Lugar de entrenamiento',
      formatTrainingLocation(data),
    ],
    [
      '11. Equipamiento',
      formatTrainingEquipment(data),
    ],
    [
      '12. Lesiones o molestias',
      data.hasDiscomfort === 'si' ? 'Sí' : 'No',
    ],
    ['13. Dónde y qué pasó', discomfortText],
    [
      '14. Qué es lo que más le cuesta',
      difficultiesText,
    ],
    [
      '15. Comentarios adicionales',
      data.comments.trim() || 'Sin comentarios',
    ],
  ];
}

function buildEmailHtml(
  data: IntakeData,
  receivedAt: string,
): string {
  const tableRows = buildEmailRows(data)
    .map(
      ([label, value]) => `
        <tr>
          <th
            scope="row"
            style="
              width: 38%;
              padding: 13px 15px;
              text-align: left;
              vertical-align: top;
              color: #76263f;
              background: #fff0f3;
              border-bottom: 1px solid #f1d8df;
              font-size: 13px;
              font-weight: 600;
            "
          >
            ${escapeHtml(label)}
          </th>

          <td
            style="
              padding: 13px 15px;
              vertical-align: top;
              color: #33313a;
              background: #ffffff;
              border-bottom: 1px solid #f1d8df;
              font-size: 14px;
              line-height: 1.6;
              overflow-wrap: anywhere;
            "
          >
            ${escapeHtml(value).replace(/\n/g, '<br>')}
          </td>
        </tr>
      `,
    )
    .join('');

  return `
    <!doctype html>
    <html lang="es">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title>Nueva solicitud de FORMA Studio</title>
      </head>

      <body style="
        margin: 0;
        padding: 28px 12px;
        background: #f8edf0;
        font-family: Arial, Helvetica, sans-serif;
      ">
        <main style="
          max-width: 720px;
          margin: 0 auto;
          padding: 28px;
          background: #ffffff;
          border-radius: 12px;
        ">
          <p style="
            margin: 0 0 8px;
            color: #c34668;
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 3px;
          ">
            FORMA STUDIO
          </p>

          <h1 style="
            margin: 0 0 12px;
            color: #302d35;
            font-size: 25px;
          ">
            Nueva solicitud de entrenamiento
          </h1>

          <p style="
            margin: 0 0 24px;
            color: #68636d;
            font-size: 14px;
            line-height: 1.6;
          ">
            Se recibió una nueva solicitud desde el
            formulario de entrenamiento del sitio web.
          </p>

          <table
            role="presentation"
            cellspacing="0"
            cellpadding="0"
            style="
              width: 100%;
              border-collapse: collapse;
              border: 1px solid #f1d8df;
            "
          >
            <tbody>
              ${tableRows}
            </tbody>
          </table>

          <p style="
            margin: 22px 0 0;
            color: #827b84;
            font-size: 12px;
            line-height: 1.6;
          ">
            Recibida el ${escapeHtml(receivedAt)}.
            <br>
            Mensaje automático de FORMA Studio.
          </p>
        </main>
      </body>
    </html>
  `;
}

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== 'POST') {
      return jsonResponse(
        {
          ok: false,
          message: 'Método no permitido.',
        },
        405,
      );
    }

    const allowedOrigins = (env.ALLOWED_ORIGINS ?? '')
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);

    if (allowedOrigins.length === 0) {
      return jsonResponse(
        {
          ok: false,
          message:
            'El servicio todavía no está configurado.',
        },
        503,
      );
    }

    const origin = request.headers.get('origin');

    if (!origin || !isOriginAllowed(origin)) {
      return jsonResponse(
        {
          ok: false,
          message:
            'Origen de solicitud no autorizado.',
        },
        403,
      );
    }

    const contentType =
      request.headers.get('content-type') ?? '';

    if (!isJsonContentType(contentType)) {
      return jsonResponse(
        {
          ok: false,
          message:
            'El formato de solicitud no es válido.',
        },
        415,
      );
    }

    const contentLength =
      request.headers.get('content-length');

    if (contentLength !== null) {
      if (!/^\d+$/.test(contentLength)) {
        return jsonResponse(
          {
            ok: false,
            message:
              'La longitud de la solicitud no es válida.',
          },
          400,
        );
      }

      if (Number(contentLength) > MAX_BODY_BYTES) {
        return jsonResponse(
          {
            ok: false,
            message:
              'La solicitud supera el tamaño permitido.',
          },
          413,
        );
      }
    }

    if (isRateLimited(getClientIp(request))) {
      return jsonResponse(
        {
          ok: false,
          message:
            'Se realizaron demasiados intentos. Esperá unos minutos antes de volver a enviar.',
        },
        429,
      );
    }

    const bodyResult = await readLimitedBody(request);

    if (!bodyResult.ok) {
      return jsonResponse(
        {
          ok: false,
          message: bodyResult.message,
        },
        bodyResult.status,
      );
    }

    let payload: unknown;

    try {
      payload = JSON.parse(
        bodyResult.body,
      ) as unknown;
    } catch {
      return jsonResponse(
        {
          ok: false,
          message:
            'El contenido enviado no es válido.',
        },
        400,
      );
    }

    if (!isRecord(payload)) {
      return jsonResponse(
        {
          ok: false,
          message:
            'La solicitud no tiene un formato válido.',
        },
        400,
      );
    }

    if (
      typeof payload.website === 'string' &&
      payload.website.trim().length > 0
    ) {
      return jsonResponse(
        {
          ok: false,
          message:
            'No pudimos verificar la solicitud. Revisá el formulario e intentá nuevamente.',
        },
        422,
      );
    }

    if (!isIntakeData(payload.data)) {
      return jsonResponse(
        {
          ok: false,
          message:
            'Las respuestas del formulario no son válidas.',
        },
        400,
      );
    }

    const data = payload.data;
    const validationErrors =
      validateIntakeData(data);

    if (validationErrors.length > 0) {
      return jsonResponse(
        {
          ok: false,
          message:
            'Revisá las respuestas antes de enviar.',
          errors: validationErrors,
        },
        422,
      );
    }

    const smtpUser = env.SMTP_USER?.trim();
    const smtpPassword =
      env.SMTP_APP_PASSWORD?.replace(/\s+/g, '');
    const recipient =
      env.FORM_RECIPIENT?.trim() || smtpUser;

    if (!smtpUser || !smtpPassword || !recipient) {
      return jsonResponse(
        {
          ok: false,
          message:
            'El servicio de correo todavía no está configurado.',
        },
        503,
      );
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
      connectionTimeout: 8000,
      greetingTimeout: 8000,
      socketTimeout: 15000,
    });

    const receivedAt = new Date().toLocaleString(
      'es-AR',
      {
        dateStyle: 'long',
        timeStyle: 'short',
        timeZone: 'America/Argentina/Buenos_Aires',
      },
    );

    const safeName = data.name
      .trim()
      .replace(/[\r\n\t]+/g, ' ')
      .slice(0, intakeLimits.name);

    try {
      const info = await transporter.sendMail({
        from: {
          name: 'FORMA Studio',
          address: smtpUser,
        },
        to: recipient,
        subject:
          `Nueva solicitud de entrenamiento — ${safeName}`,
        text:
          `${createSubmissionSummary(data)}\n\nRecibida el ${receivedAt}.`,
        html: buildEmailHtml(data, receivedAt),
      });

      const recipientAccepted = info.accepted.some(
        (address) =>
          address.toLowerCase() ===
          recipient.toLowerCase(),
      );

      if (!recipientAccepted) {
        console.error(
          '[FORMA Studio] El destinatario no fue aceptado por SMTP.',
        );

        return jsonResponse(
          {
            ok: false,
            message:
              'El servidor de correo no aceptó el destinatario. Intentá nuevamente más tarde.',
          },
          502,
        );
      }

      console.info(
        '[FORMA Studio] SMTP aceptó la solicitud.',
        {
          acceptedCount: info.accepted.length,
        },
      );

      return jsonResponse({
        ok: true,
        message:
          'Tu solicitud fue aceptada por nuestro servicio de correo.',
      });
    } catch (error) {
      console.error(
        '[FORMA Studio] Error SMTP.',
        {
          code: getSmtpErrorCode(error),
        },
      );

      return jsonResponse(
        {
          ok: false,
          message:
            'No pudimos enviar tu solicitud en este momento. Tus respuestas siguen disponibles; intentá nuevamente en unos minutos.',
        },
        502,
      );
    }
  },
};
