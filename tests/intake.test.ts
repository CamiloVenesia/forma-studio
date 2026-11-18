
import { describe, expect, it } from 'vitest';

import {
  createSubmissionSummary,
  experiences,
  formatExperience,
  initialIntake,
  validateStep,
} from '../src/features/intake/model';

const valid = {
  ...initialIntake,
  discipline: 'fuerza' as const,
  modality: 'online' as const,
  name: 'Alex Ejemplo',
  age: '27',
  city: 'Rosario',
  phone: '+54 9 341 555 1234',
  goals: ['Ganar masa muscular', 'Aumentar mi fuerza'],
  activity: 'Running',
  experience: 'nunca' as const,
  days: '3',
  duration: '45 minutos',
  location: 'Mi casa con equipamiento',
  equipment: ['Mancuernas', 'Bandas elásticas'],
  hasDiscomfort: 'si',
  discomfortDetails: 'Molestia de rodilla al correr.',
  difficulties: ['Ser constante'],
  comments: 'Quiero empezar de manera progresiva.',
};

describe('formulario FORMA Studio: validación por etapas', () => {
  it('requiere disciplina y modalidad en la primera etapa', () => {
    expect(validateStep(0, initialIntake)).toHaveLength(2);
    expect(validateStep(0, valid)).toEqual([]);
  });

  it('valida nombre y apellido, edad, ciudad y WhatsApp', () => {
    expect(validateStep(1, valid)).toEqual([]);

    expect(
      validateStep(1, {
        ...valid,
        name: 'Alex',
        phone: '123',
        age: '0',
      }),
    ).toHaveLength(3);
  });

  it('acepta personas menores de 18 años', () => {
    expect(validateStep(1, { ...valid, age: '16' })).toEqual([]);
    expect(validateStep(1, { ...valid, age: '17' })).toEqual([]);
  });

  it('acepta los límites de edad definidos y rechaza edades fuera del rango', () => {
    expect(validateStep(1, { ...valid, age: '1' })).toEqual([]);
    expect(validateStep(1, { ...valid, age: '120' })).toEqual([]);

    expect(validateStep(1, { ...valid, age: '121' })).toContain(
      'Ingresá una edad válida entre 1 y 120 años.',
    );

    expect(validateStep(1, { ...valid, age: '17.5' })).toContain(
      'Ingresá una edad válida entre 1 y 120 años.',
    );
  });

  it('requiere que el nombre incluya nombre y apellido', () => {
    expect(validateStep(1, { ...valid, name: 'Alex' })).toContain(
      'Ingresá tu nombre y apellido.',
    );

    expect(validateStep(1, { ...valid, name: 'Alex Ejemplo' })).toEqual([]);

    expect(
      validateStep(1, { ...valid, name: 'María José Da Silva' }),
    ).toEqual([]);
  });

  it('no permite seleccionar más de dos objetivos', () => {
    expect(
      validateStep(2, {
        ...valid,
        goals: ['A', 'B', 'C'],
      }),
    ).toContain('Elegí uno o dos objetivos.');
  });

  it('requiere desarrollar la opción Otros en objetivos', () => {
    expect(
      validateStep(2, {
        ...valid,
        goals: ['Otros'],
        otherGoal: '',
      }),
    ).toContain('Contanos cuál es tu otro objetivo.');
  });

  it('requiere detallar la actividad cuando se elige Otros', () => {
    expect(
      validateStep(2, {
        ...valid,
        activity: 'Otros',
        otherActivity: '',
      }),
    ).toContain('Contanos qué otra actividad realizás.');
  });

  it('utiliza valores internos válidos para las cuatro opciones de experiencia', () => {
    expect(experiences.map((experience) => experience.value)).toEqual([
      'nunca',
      'retomo',
      'menos-de-un-ano',
      'mas-de-un-ano',
    ]);

    expect(validateStep(2, valid)).toEqual([]);

    expect(
      validateStep(2, {
        ...valid,
        experience: '',
      }),
    ).toContain('Seleccioná tu experiencia entrenando.');
  });

  it('requiere disponibilidad, duración y lugar de entrenamiento', () => {
    expect(
      validateStep(3, {
        ...valid,
        days: '',
        duration: '',
        location: '',
      }),
    ).toHaveLength(3);
  });

  it('requiere equipamiento si el entrenamiento será en casa', () => {
    expect(
      validateStep(3, {
        ...valid,
        equipment: [],
      }),
    ).toContain('Seleccioná qué elementos tenés o pensás comprar.');
  });

  it('no requiere equipamiento si la persona entrena en gimnasio', () => {
    expect(
      validateStep(3, {
        ...valid,
        location: 'Gimnasio',
        equipment: [],
      }),
    ).toEqual([]);
  });

  it('impide combinar una opción de equipamiento exclusivo con otras', () => {
    expect(
      validateStep(3, {
        ...valid,
        equipment: [
          'No tengo nada y prefiero arrancar así',
          'Mancuernas',
        ],
      }),
    ).toContain(
      'La opción de no tener equipamiento debe seleccionarse por separado.',
    );
  });

  it('requiere completar lesiones, detalle y dificultades', () => {
    expect(
      validateStep(4, {
        ...valid,
        hasDiscomfort: '',
        discomfortDetails: '',
        difficulties: [],
        comments: '',
      }),
    ).toHaveLength(3);
  });

  it('permite continuar sin completar comentarios adicionales', () => {
    expect(
      validateStep(4, {
        ...valid,
        comments: '',
      }),
    ).toEqual([]);
  });

  it('permite comentarios opcionales sin espacios ni contenido', () => {
    expect(
      validateStep(4, {
        ...valid,
        comments: '   ',
      }),
    ).toEqual([]);
  });

  it('mantiene obligatoria la pregunta 13 aunque la respuesta sobre lesiones sea No', () => {
    expect(
      validateStep(4, {
        ...valid,
        hasDiscomfort: 'no',
        discomfortDetails: '',
      }),
    ).toContain(
      'Completá dónde y qué te pasó. Si no corresponde, escribí “No aplica”.',
    );

    expect(
      validateStep(4, {
        ...valid,
        hasDiscomfort: 'no',
        discomfortDetails: 'No aplica',
      }),
    ).toEqual([]);
  });

  it('requiere desarrollar Otros en equipamiento y dificultades', () => {
    expect(
      validateStep(4, {
        ...valid,
        difficulties: ['Otros'],
        otherDifficulty: '',
      }),
    ).toContain('Contanos qué otra dificultad tenés.');

    expect(
      validateStep(3, {
        ...valid,
        equipment: ['Otro'],
        otherEquipment: '',
      }),
    ).toContain(
      'Contanos qué otro elemento tenés o pensás comprar.',
    );
  });

  it('convierte el valor interno de experiencia en una etiqueta legible', () => {
    expect(formatExperience('nunca')).toBe('Nunca entrené');

    expect(formatExperience('mas-de-un-ano')).toBe(
      'Entreno hace más de 1 año',
    );

    expect(formatExperience('')).toBe('Sin indicar');
  });

  it('prepara un resumen con las 15 respuestas y las preferencias iniciales', () => {
    const summary = createSubmissionSummary({
      ...valid,
      age: '16',
    });

    expect(summary).toContain('FORMA STUDIO');
    expect(summary).toContain('Disciplina: Entrenamiento de fuerza');
    expect(summary).toContain('2. EDAD\n16 años');
    expect(summary).toContain('5. OBJETIVOS');
    expect(summary).toContain('7. EXPERIENCIA ENTRENANDO\nNunca entrené');
    expect(summary).not.toContain('7. EXPERIENCIA ENTRENANDO\nnunca');
    expect(summary).toContain('13. DÓNDE Y QUÉ PASÓ');
    expect(summary).toContain('Molestia de rodilla al correr.');
    expect(summary).toContain('15. COMENTARIOS ADICIONALES');
  });

  it('muestra Sin comentarios cuando la pregunta 15 queda vacía', () => {
    const summary = createSubmissionSummary({
      ...valid,
      comments: '',
    });

    expect(summary).toContain(
      '15. COMENTARIOS ADICIONALES\nSin comentarios',
    );
  });

  it('conserva los comentarios cuando la persona decide completarlos', () => {
    const summary = createSubmissionSummary({
      ...valid,
      comments: 'Tengo una consulta sobre la modalidad online.',
    });

    expect(summary).toContain(
      '15. COMENTARIOS ADICIONALES\nTengo una consulta sobre la modalidad online.',
    );
  });
});
