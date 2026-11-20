
import { env } from 'node:process';
import nodemailer from 'nodemailer';

import {
  activities,
  createSubmissionSummary,
  difficulties,
  equipmentOptions,
  experiences,
  formatExperience,
  goals,
  intakeLimits,
  trainingLocations,
  validateStep,
} from '../src/features/intake/model.js';

import type { IntakeData } from '../src/features/intake/model.js';

import {
  formatDiscipline,
  formatModality,
} from '../src/utils/text.js';

const MAX_BODY_LENGTH = 20_000;
const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

const rateLimitStore = new Map<
  string,
  {
    count: number;
    expiresAt: number;
  }
>();

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

function isRecord(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value)
  );
}

function isIntakeData(value: unknown): value is IntakeData {
  if (!isRecord(value)) {
    return false;
  }

  const validStrings = stringFields.every(
    (field) => typeof value[field] === 'string',
  );

  const validArrays = arrayFields.every(
    (field) =>
      Array.isArray(value[field]) &&
      value[field].every(
        (item: unknown) => typeof item === 'string',
      ),
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
  return (
    request.headers
      .get('x-forwarded-for')
      ?.split(',')[0]
      ?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const current = rateLimitStore.get(ip);

  if (!current || now > current.expiresAt) {
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

    if (
      typeof value === 'string' &&
      value.length > maximum
    ) {
      errors.push(
        `El campo ${field} supera el límite permitido.`,
      );
    }
  }

  const validGoals = new Set<string>(goals);
  const validActivities = new Set<string>(activities);
  const validEquipment = new Set<string>(equipmentOptions);
  const validDifficulties = new Set<string>(difficulties);
  const validLocations = new Set<string>(trainingLocations);

  if (!data.goals.every((value) => validGoals.has(value))) {
    errors.push('Hay objetivos no válidos.');
  }

  if (!validActivities.has(data.activity)) {
    errors.push('La actividad seleccionada no es válida.');
  }

  if (
    !data.equipment.every(
      (value) => validEquipment.has(value),
    )
  ) {
    errors.push('Hay elementos de equipamiento no válidos.');
  }

  if (
    !data.difficulties.every(
      (value) => validDifficulties.has(value),
    )
  ) {
    errors.push('Hay dificultades no válidas.');
  }

  if (!validLocations.has(data.location)) {
    errors.push('El lugar de entrenamiento no es válido.');
  }

  if (data.goals.length > 2) {
    errors.push('No se permiten más de dos objetivos.');
  }

  if (data.equipment.length > equipmentOptions.length) {
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

  const equipmentText =
    data.location === 'Gimnasio'
      ? 'No corresponde: entrena en gimnasio.'
      : formatOtherValues(
          data.equipment,
          data.otherEquipment,
        );

  const difficultiesText = formatOtherValues(
    data.difficulties,
    data.otherDifficulty,
  );

  const discomfortText =
    data.discomfortDetails.trim() ||
    (data.hasDiscomfort === 'no'
      ? 'No aplica'
      : 'Sin indicar');

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
    ['6. Deporte u otra actividad física', activityText],
    ['7. Experiencia entrenando', formatExperience(data.experience)],
    ['8. Días por semana', `${data.days} días`],
    ['9. Tiempo por entrenamiento', data.duration],
    ['10. Lugar de entrenamiento', data.location],
    ['11. Elementos disponibles o a comprar', equipmentText],
    [
      '12. Lesiones o molestias',
      data.hasDiscomfort === 'si' ? 'Sí' : 'No',
    ],
    ['13. Dónde y qué pasó', discomfortText],
    ['14. Qué es lo que más le cuesta', difficultiesText],
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
  const rows = buildEmailRows(data);

  const tableRows = rows
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
          message: 'El servicio todavía no está configurado.',
        },
        503,
      );
    }

    const origin = request.headers.get('origin');

    if (!origin || !isOriginAllowed(origin)) {
      return jsonResponse(
        {
          ok: false,
          message: 'Origen de solicitud no autorizado.',
        },
        403,
      );
    }

    const contentType =
      request.headers.get('content-type') ?? '';

    if (!contentType.toLowerCase().includes('application/json')) {
      return jsonResponse(
        {
          ok: false,
          message: 'El formato de solicitud no es válido.',
        },
        415,
      );
    }

    const declaredLength = Number(
      request.headers.get('content-length') ?? '0',
    );

    if (declaredLength > MAX_BODY_LENGTH) {
      return jsonResponse(
        {
          ok: false,
          message: 'La solicitud supera el tamaño permitido.',
        },
        413,
      );
    }

    const clientIp = getClientIp(request);

    if (isRateLimited(clientIp)) {
      return jsonResponse(
        {
          ok: false,
          message:
            'Se realizaron demasiados intentos. Esperá unos minutos antes de volver a enviar.',
        },
        429,
      );
    }

    let rawBody: string;

    try {
      rawBody = await request.text();
    } catch {
      return jsonResponse(
        {
          ok: false,
          message: 'No se pudo leer la solicitud.',
        },
        400,
      );
    }

    if (rawBody.length > MAX_BODY_LENGTH) {
      return jsonResponse(
        {
          ok: false,
          message: 'La solicitud supera el tamaño permitido.',
        },
        413,
      );
    }

    let payload: unknown;

    try {
      payload = JSON.parse(rawBody) as unknown;
    } catch {
      return jsonResponse(
        {
          ok: false,
          message: 'El contenido enviado no es válido.',
        },
        400,
      );
    }

    if (!isRecord(payload)) {
      return jsonResponse(
        {
          ok: false,
          message: 'La solicitud no tiene un formato válido.',
        },
        400,
      );
    }

    // Una solicitud bloqueada por el antispam
    // nunca debe devolver ok: true.
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
          message: 'Las respuestas del formulario no son válidas.',
        },
        400,
      );
    }

    const data = payload.data;
    const validationErrors = validateIntakeData(data);

    if (validationErrors.length > 0) {
      return jsonResponse(
        {
          ok: false,
          message: 'Revisá las respuestas antes de enviar.',
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

    const receivedAt = new Date().toLocaleString('es-AR', {
      dateStyle: 'long',
      timeStyle: 'short',
      timeZone: 'America/Argentina/Buenos_Aires',
    });

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
        subject: `Nueva solicitud de entrenamiento — ${safeName}`,
        text: `${createSubmissionSummary(data)}\n\nRecibida el ${receivedAt}.`,
        html: buildEmailHtml(data, receivedAt),
      });

      const recipientAccepted = info.accepted.some(
        (address) =>
          address.toLowerCase() === recipient.toLowerCase(),
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
          messageId: info.messageId,
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
        '[FORMA Studio] Error al enviar la solicitud:',
        error,
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
