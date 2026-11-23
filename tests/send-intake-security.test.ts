
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { initialIntake } from '../src/features/intake/model';
import type { IntakeData } from '../src/features/intake/model';

const { sendMailMock, createTransportMock } = vi.hoisted(() => {
  const sendMailMock = vi.fn();
  const createTransportMock = vi.fn(() => ({ sendMail: sendMailMock }));

  return { sendMailMock, createTransportMock };
});

vi.mock('nodemailer', () => ({
  default: { createTransport: createTransportMock },
}));

const ORIGIN = 'http://localhost:3000';
const ENDPOINT = 'http://localhost:3000/api/send-intake';

const validData: IntakeData = {
  ...initialIntake,
  discipline: 'fuerza',
  modality: 'online',
  name: 'Alex Ejemplo',
  age: '27',
  city: 'Rosario',
  phone: '+54 9 341 555 1234',
  goals: ['Ganar masa muscular'],
  activity: 'Running',
  experience: 'nunca',
  days: '3',
  duration: '45 minutos',
  location: 'Mi casa',
  equipment: ['Mancuernas'],
  hasDiscomfort: 'no',
  discomfortDetails: '',
  difficulties: ['Ser constante'],
};

function makeRequest(
  payload: unknown,
  options: {
    method?: string;
    origin?: string | null;
    contentType?: string;
    clientIp?: string;
    contentLength?: string;
    rawBody?: string;
  } = {},
): Request {
  const headers = new Headers();

  if (options.origin !== null) {
    headers.set('origin', options.origin ?? ORIGIN);
  }

  headers.set(
    'content-type',
    options.contentType ?? 'application/json',
  );
  headers.set('x-real-ip', options.clientIp ?? '198.51.100.11');

  if (options.contentLength !== undefined) {
    headers.set('content-length', options.contentLength);
  }

  const method = options.method ?? 'POST';
  const body = options.rawBody ?? JSON.stringify(payload);

  return new Request(ENDPOINT, {
    method,
    headers,
    ...(method === 'GET' || method === 'HEAD' ? {} : { body }),
  });
}

async function loadHandler() {
  const { default: handler } = await import('../api/send-intake');
  return handler.fetch;
}

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();

  vi.stubEnv('ALLOWED_ORIGINS', ORIGIN);
  vi.stubEnv('SMTP_USER', 'test@example.com');
  vi.stubEnv('SMTP_APP_PASSWORD', 'fake-test-password');
  vi.stubEnv('FORM_RECIPIENT', 'test@example.com');

  sendMailMock.mockResolvedValue({
    accepted: ['test@example.com'],
  });
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe('FORMA Studio - Seguridad de la API de solicitudes', () => {
  it('rechaza métodos distintos de POST', async () => {
    const fetch = await loadHandler();

    const response = await fetch(
      makeRequest(null, { method: 'GET' }),
    );

    expect(response.status).toBe(405);
    expect(sendMailMock).not.toHaveBeenCalled();
  });

  it('rechaza solicitudes sin origen o desde un origen no autorizado', async () => {
    const fetch = await loadHandler();

    const withoutOrigin = await fetch(
      makeRequest({ data: validData }, { origin: null }),
    );

    const fromAnotherSite = await fetch(
      makeRequest(
        { data: validData },
        { origin: 'https://otro-sitio.com' },
      ),
    );

    expect(withoutOrigin.status).toBe(403);
    expect(fromAnotherSite.status).toBe(403);
    expect(sendMailMock).not.toHaveBeenCalled();
  });

  it('rechaza solicitudes cuando no hay orígenes permitidos configurados', async () => {
    vi.stubEnv('ALLOWED_ORIGINS', '');

    const fetch = await loadHandler();
    const response = await fetch(
      makeRequest({ data: validData }),
    );

    expect(response.status).toBe(503);
  });

  it('solo acepta Content-Type application/json', async () => {
    const fetch = await loadHandler();

    const response = await fetch(
      makeRequest(
        { data: validData },
        { contentType: 'application/jsonp' },
      ),
    );

    expect(response.status).toBe(415);
    expect(sendMailMock).not.toHaveBeenCalled();
  });

  it('acepta application/json con charset UTF-8', async () => {
    const fetch = await loadHandler();

    const response = await fetch(
      makeRequest(
        { data: validData },
        { contentType: 'application/json; charset=utf-8' },
      ),
    );

    expect(response.status).toBe(200);
    expect(sendMailMock).toHaveBeenCalledOnce();
  });

  it('rechaza Content-Length inválido o superior a 20 KB', async () => {
    const fetch = await loadHandler();

    const invalidLength = await fetch(
      makeRequest(
        { data: validData },
        { contentLength: 'invalid' },
      ),
    );

    const tooLarge = await fetch(
      makeRequest(
        { data: validData },
        { contentLength: '20001' },
      ),
    );

    expect(invalidLength.status).toBe(400);
    expect(tooLarge.status).toBe(413);
    expect(sendMailMock).not.toHaveBeenCalled();
  });

  it('bloquea un cuerpo mayor a 20 KB aunque Content-Length sea falso', async () => {
    const fetch = await loadHandler();

    const response = await fetch(
      makeRequest(null, {
        contentLength: '10',
        rawBody: 'a'.repeat(20_001),
      }),
    );

    expect(response.status).toBe(413);
    expect(sendMailMock).not.toHaveBeenCalled();
  });

  it('rechaza JSON malformado o estructuras no válidas', async () => {
    const fetch = await loadHandler();

    const malformed = await fetch(
      makeRequest(null, { rawBody: '{invalid-json' }),
    );

    const invalidStructure = await fetch(
      makeRequest(['datos']),
    );

    expect(malformed.status).toBe(400);
    expect(invalidStructure.status).toBe(400);
    expect(sendMailMock).not.toHaveBeenCalled();
  });

  it('bloquea un campo honeypot completado', async () => {
    const fetch = await loadHandler();

    const response = await fetch(
      makeRequest({
        website: 'https://spam.example',
        data: validData,
      }),
    );

    expect(response.status).toBe(422);
    expect(sendMailMock).not.toHaveBeenCalled();
  });

  it('rechaza opciones inventadas y campos demasiado largos', async () => {
    const fetch = await loadHandler();

    const invalidOption = await fetch(
      makeRequest({
        data: {
          ...validData,
          goals: ['Objetivo inventado'],
        },
      }),
    );

    const oversizedName = await fetch(
      makeRequest({
        data: {
          ...validData,
          name: 'A'.repeat(101),
        },
      }),
    );

    expect(invalidOption.status).toBe(422);
    expect(oversizedName.status).toBe(422);
    expect(sendMailMock).not.toHaveBeenCalled();
  });

  it('escapa caracteres HTML del usuario antes de generar el correo', async () => {
    const fetch = await loadHandler();

    const response = await fetch(
      makeRequest({
        data: {
          ...validData,
          comments: '<script>alert("hola")</script>',
        },
      }),
    );

    expect(response.status).toBe(200);
    expect(sendMailMock).toHaveBeenCalledOnce();

    const message = sendMailMock.mock.calls[0]?.[0] as {
      html: string;
    };

    expect(message.html).toContain('&lt;script&gt;');
    expect(message.html).not.toContain('<script>');
  });

  it('bloquea el sexto intento por IP dentro de la ventana temporal', async () => {
    const fetch = await loadHandler();

    for (let attempt = 0; attempt < 5; attempt += 1) {
      const response = await fetch(
        makeRequest(null, { rawBody: 'invalid-json' }),
      );

      expect(response.status).toBe(400);
    }

    const blocked = await fetch(
      makeRequest(null, { rawBody: 'invalid-json' }),
    );

    expect(blocked.status).toBe(429);
    expect(sendMailMock).not.toHaveBeenCalled();
  });

  it('rechaza un destinatario SMTP no aceptado', async () => {
    sendMailMock.mockResolvedValue({ accepted: [] });

    const log = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);

    const fetch = await loadHandler();
    const response = await fetch(
      makeRequest({ data: validData }),
    );

    expect(response.status).toBe(502);
    expect(log).toHaveBeenCalled();
  });

  it('no expone detalles internos si falla SMTP', async () => {
    const privateMessage =
      'password secreto de prueba: no divulgar';

    sendMailMock.mockRejectedValue(
      Object.assign(new Error(privateMessage), {
        code: 'EAUTH',
      }),
    );

    const log = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);

    const fetch = await loadHandler();
    const response = await fetch(
      makeRequest({ data: validData }),
    );

    const body = await response.text();

    expect(response.status).toBe(502);
    expect(body).not.toContain(privateMessage);
    expect(JSON.stringify(log.mock.calls)).not.toContain(
      privateMessage,
    );
    expect(log).toHaveBeenCalled();
  });
});
