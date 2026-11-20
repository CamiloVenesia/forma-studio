
import { describe, expect, it } from 'vitest';

import {
  createSubmissionSummary,
  experiences,
  formatExperience,
  formatTrainingEquipment,
  formatTrainingLocation,
  getEquipmentOptions,
  initialIntake,
  validateStep,
} from '../src/features/intake/model';

import type { IntakeData } from '../src/features/intake/model';

const valid: IntakeData = {
  ...initialIntake,
  discipline: 'fuerza',
  modality: 'online',
  name: 'Alex Ejemplo',
  age: '27',
  city: 'Rosario',
  phone: '+54 9 341 555 1234',
  goals: ['Ganar masa muscular', 'Aumentar mi fuerza'],
  activity: 'Running',
  experience: 'nunca',
  days: '3',
  duration: '45 minutos',
  location: 'Mi casa',
  equipment: ['Mancuernas', 'Bandas elásticas'],
  hasDiscomfort: 'si',
  discomfortDetails: 'Molestia de rodilla al correr.',
  difficulties: ['Ser constante'],
  comments: 'Quiero empezar de manera progresiva.',
};

const validPresencial: IntakeData = {
  ...valid,
  modality: 'presencial',
  location: '',
  equipment: [],
  otherEquipment: '',
};

describe('FORM Studio - Datos personales y objetivos', () => {
  it('requiere disciplina y modalidad', () => {
    expect(validateStep(0, initialIntake)).toHaveLength(2);
    expect(validateStep(0, valid)).toEqual([]);
  });

  it('valida nombre, edad, ciudad y WhatsApp', () => {
    expect(validateStep(1, valid)).toEqual([]);

    expect(
      validateStep(1, {
        ...valid,
        name: 'Alex',
        age: '0',
        phone: '123',
      }),
    ).toHaveLength(3);
  });

  it('permite inscripciones de menores de edad', () => {
    expect(validateStep(1, { ...valid, age: '16' })).toEqual([]);
  });

  it('rechaza edades fuera del rango permitido', () => {
    expect(validateStep(1, { ...valid, age: '121' })).toContain(
      'Ingresá una edad válida entre 1 y 120 años.',
    );
  });

  it('requiere nombre y apellido', () => {
    expect(validateStep(1, { ...valid, name: 'Alex' })).toContain(
      'Ingresá tu nombre y apellido.',
    );

    expect(validateStep(1, { ...valid, name: 'María José Da Silva' })).toEqual([]);
  });

  it('no permite más de dos objetivos', () => {
    expect(
      validateStep(2, { ...valid, goals: ['A', 'B', 'C'] }),
    ).toContain('Elegí uno o dos objetivos.');
  });

  it('requiere desarrollar Otros en objetivos', () => {
    expect(
      validateStep(2, { ...valid, goals: ['Otros'], otherGoal: '' }),
    ).toContain('Contanos cuál es tu otro objetivo.');
  });

  it('requiere detallar otra actividad', () => {
    expect(
      validateStep(2, { ...valid, activity: 'Otros', otherActivity: '' }),
    ).toContain('Contanos qué otra actividad realizás.');
  });

  it('mantiene las cuatro opciones de experiencia', () => {
    expect(experiences.map((experience) => experience.value)).toEqual([
      'nunca',
      'retomo',
      'menos-de-un-ano',
      'mas-de-un-ano',
    ]);

    expect(validateStep(2, valid)).toEqual([]);
    expect(formatExperience('nunca')).toBe('Nunca entrené');
  });
});

describe('FORMA Studio - Modalidad y equipamiento', () => {
  it('requiere días y duración en cualquier modalidad', () => {
    expect(
      validateStep(3, {
        ...validPresencial,
        days: '',
        duration: '',
      }),
    ).toHaveLength(2);
  });

  it('permite presencial sin responder las preguntas 10 y 11', () => {
    expect(validateStep(3, validPresencial)).toEqual([]);
  });

  it('rechaza datos antiguos de equipamiento al elegir presencial', () => {
    expect(
      validateStep(3, {
        ...valid,
        modality: 'presencial',
      }),
    ).toContain(
      'La modalidad presencial no requiere seleccionar lugar ni equipamiento.',
    );
  });

  it('requiere seleccionar lugar cuando la modalidad es online', () => {
    expect(
      validateStep(3, {
        ...valid,
        location: '',
        equipment: [],
      }),
    ).toContain('Seleccioná dónde vas a realizar tus entrenamientos.');
  });

  it('acepta entrenamiento online en gimnasio sin equipamiento propio', () => {
    expect(
      validateStep(3, {
        ...valid,
        location: 'Gimnasio',
        equipment: [],
      }),
    ).toEqual([]);
  });

  it('rechaza equipamiento sobrante cuando se cambia a gimnasio', () => {
    expect(
      validateStep(3, {
        ...valid,
        location: 'Gimnasio',
        equipment: ['Mancuernas'],
      }),
    ).toContain(
      'No es necesario indicar equipamiento si entrenás en gimnasio.',
    );
  });

  it('requiere equipamiento cuando se entrena online en casa', () => {
    expect(
      validateStep(3, {
        ...valid,
        equipment: [],
      }),
    ).toContain('Indicá qué equipamiento tenés o pensás conseguir.');
  });

  it('permite entrenar en casa sin tener equipamiento', () => {
    expect(
      validateStep(3, {
        ...valid,
        equipment: ['No tengo nada y prefiero arrancar así'],
      }),
    ).toEqual([]);
  });

  it('no permite combinar opciones excluyentes', () => {
    expect(
      validateStep(3, {
        ...valid,
        equipment: [
          'No tengo nada y prefiero arrancar así',
          'Mancuernas',
        ],
      }),
    ).toContain(
      'Las opciones de no tener equipamiento deben seleccionarse por separado.',
    );
  });

  it('muestra equipamiento específico para Pilates', () => {
    const options = getEquipmentOptions('pilates');

    expect(options).toContain('Aro de pilates');
    expect(options).toContain('Pelota de pilates');
    expect(options).not.toContain('Mancuernas');
  });

  it('muestra equipamiento específico para Fuerza', () => {
    const options = getEquipmentOptions('fuerza');

    expect(options).toContain('Mancuernas');
    expect(options).toContain('Banco o step');
    expect(options).not.toContain('Aro de pilates');
  });

  it('acepta equipamiento de Pilates en casa', () => {
    expect(
      validateStep(3, {
        ...valid,
        discipline: 'pilates',
        equipment: ['Colchoneta', 'Aro de pilates'],
      }),
    ).toEqual([]);
  });

  it('rechaza equipamiento de otra disciplina', () => {
    expect(
      validateStep(3, {
        ...valid,
        discipline: 'pilates',
        equipment: ['Mancuernas'],
      }),
    ).toContain('La selección de equipamiento no es válida.');
  });

  it('requiere describir la opción Otro', () => {
    expect(
      validateStep(3, {
        ...valid,
        equipment: ['Otro'],
        otherEquipment: '',
      }),
    ).toContain('Contanos qué otro elemento tenés o pensás comprar.');
  });

  it('rechaza las antiguas opciones redundantes de ubicación', () => {
    expect(
      validateStep(3, {
        ...valid,
        location: 'Mi casa con equipamiento',
      }),
    ).toContain('Seleccioná dónde vas a realizar tus entrenamientos.');
  });
});

describe('FORMA Studio - Bienestar', () => {
  it('requiere responder si hay lesiones y seleccionar dificultades', () => {
    expect(
      validateStep(4, {
        ...valid,
        hasDiscomfort: '',
        discomfortDetails: '',
        difficulties: [],
      }),
    ).toHaveLength(2);
  });

  it('requiere explicar las lesiones cuando se responde Sí', () => {
    expect(
      validateStep(4, {
        ...valid,
        hasDiscomfort: 'si',
        discomfortDetails: '',
      }),
    ).toContain('Contanos dónde tenés la lesión o molestia y qué ocurrió.');
  });

  it('permite dejar la pregunta 13 vacía cuando se responde No', () => {
    expect(
      validateStep(4, {
        ...valid,
        hasDiscomfort: 'no',
        discomfortDetails: '',
      }),
    ).toEqual([]);
  });

  it('mantiene opcional la pregunta 15', () => {
    expect(
      validateStep(4, {
        ...valid,
        comments: '',
      }),
    ).toEqual([]);
  });

  it('requiere desarrollar Otros en dificultades', () => {
    expect(
      validateStep(4, {
        ...valid,
        difficulties: ['Otros'],
        otherDifficulty: '',
      }),
    ).toContain('Contanos qué otra dificultad tenés.');
  });
});

describe('FORMA Studio - Resumen para Gmail', () => {
  it('conserva las quince preguntas numeradas', () => {
    const summary = createSubmissionSummary(valid);

    for (let question = 1; question <= 15; question += 1) {
      expect(summary).toContain(`${question}. `);
    }

    expect(summary).toContain('FORMA STUDIO');
    expect(summary).toContain('Entrenamiento de fuerza');
    expect(summary).toContain('Nunca entrené');
  });

  it('marca las preguntas 10 y 11 como no aplicables en presencial', () => {
    const summary = createSubmissionSummary(validPresencial);

    expect(summary).toContain(
      '10. LUGAR DE ENTRENAMIENTO\nSe coordina con FORMA Studio (modalidad presencial)',
    );

    expect(summary).toContain(
      '11. EQUIPAMIENTO\nNo corresponde: modalidad presencial',
    );

    expect(formatTrainingLocation(validPresencial)).toContain('FORMA Studio');
    expect(formatTrainingEquipment(validPresencial)).toContain('No corresponde');
  });

  it('marca como no aplicable el equipamiento si entrena en gimnasio', () => {
    const data = {
      ...valid,
      location: 'Gimnasio',
      equipment: [],
    };

    expect(formatTrainingLocation(data)).toBe('En un gimnasio');

    expect(formatTrainingEquipment(data)).toBe(
      'No corresponde: entrenamiento en gimnasio',
    );
  });

  it('incluye el equipamiento de casa correctamente', () => {
    const summary = createSubmissionSummary({
      ...valid,
      discipline: 'pilates',
      equipment: ['Colchoneta', 'Aro de pilates'],
    });

    expect(summary).toContain(
      '11. EQUIPAMIENTO\nColchoneta, Aro de pilates',
    );
  });

  it('muestra No aplica cuando no hay lesiones', () => {
    const summary = createSubmissionSummary({
      ...valid,
      hasDiscomfort: 'no',
      discomfortDetails: '',
    });

    expect(summary).toContain(
      '13. DÓNDE Y QUÉ PASÓ\nNo aplica',
    );
  });

  it('muestra Sin comentarios cuando la pregunta 15 está vacía', () => {
    const summary = createSubmissionSummary({
      ...valid,
      comments: '',
    });

    expect(summary).toContain(
      '15. COMENTARIOS ADICIONALES\nSin comentarios',
    );
  });
});
