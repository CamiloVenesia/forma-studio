
import { describe, expect, it } from 'vitest';
import {
  createSubmissionSummary,
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
  experience: 'inicio' as const,
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

  it('valida nombre, edad, ciudad y WhatsApp', () => {
    expect(validateStep(1, valid)).toEqual([]);
    expect(validateStep(1, { ...valid, phone: '123', age: '0' })).toHaveLength(2);
  });

  it('no permite seleccionar más de dos objetivos', () => {
    expect(validateStep(2, { ...valid, goals: ['A', 'B', 'C'] })).toContain(
      'Elegí uno o dos objetivos.',
    );
  });

  it('requiere desarrollar la opción Otros en objetivos', () => {
    expect(validateStep(2, { ...valid, goals: ['Otros'], otherGoal: '' })).toContain(
      'Contanos cuál es tu otro objetivo.',
    );
  });

  it('requiere detallar la actividad cuando se elige Otros', () => {
    expect(validateStep(2, { ...valid, activity: 'Otros', otherActivity: '' })).toContain(
      'Contanos qué otra actividad realizás.',
    );
  });

  it('requiere disponibilidad, duración y lugar de entrenamiento', () => {
    expect(validateStep(3, { ...valid, days: '', duration: '', location: '' })).toHaveLength(3);
  });

  it('requiere equipamiento si el entrenamiento será en casa', () => {
    expect(validateStep(3, { ...valid, equipment: [] })).toContain(
      'Seleccioná qué elementos tenés o pensás comprar.',
    );
  });

  it('no requiere equipamiento si la persona entrena en gimnasio', () => {
    expect(validateStep(3, { ...valid, location: 'Gimnasio', equipment: [] })).toEqual([]);
  });

  it('requiere completar las preguntas de lesiones, dificultades y comentarios', () => {
    expect(
      validateStep(4, {
        ...valid,
        hasDiscomfort: '',
        discomfortDetails: '',
        difficulties: [],
        comments: '',
      }),
    ).toHaveLength(4);
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
    ).toContain('Contanos qué otro elemento tenés o pensás comprar.');
  });

  it('prepara un resumen con las 15 respuestas y las preferencias iniciales', () => {
    const summary = createSubmissionSummary(valid);
    expect(summary).toContain('FORMA STUDIO');
    expect(summary).toContain('Disciplina: Entrenamiento de fuerza');
    expect(summary).toContain('5. OBJETIVOS');
    expect(summary).toContain('13. DÓNDE Y QUÉ PASÓ');
    expect(summary).toContain('Molestia de rodilla al correr.');
    expect(summary).toContain('15. COMENTARIOS ADICIONALES');
  });
});
