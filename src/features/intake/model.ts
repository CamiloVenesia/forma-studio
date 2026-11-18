
import type { Discipline, Experience, Modality } from '../../types/domain';
import { formatDiscipline, formatModality } from '../../utils/text';

export const intakeLimits = {
  name: 100,
  age: 3,
  city: 80,
  phone: 25,
  other: 120,
  discomfortDetails: 500,
  comments: 1000,
} as const;

export const goals = [
  'Ganar masa muscular',
  'Aumentar mi fuerza',
  'Reducir grasa corporal',
  'Mejorar mi condición física',
  'Mejorar mi rendimiento deportivo',
  'Mejorar mi movilidad',
  'Incorporar el entrenamiento como hábito',
  'Otros',
] as const;

export const activities = [
  'Running',
  'Tenis',
  'Fútbol',
  'Hockey',
  'Pádel',
  'Ninguno',
  'Otros',
] as const;

export const experiences = [
  { label: 'Nunca entrené', value: 'nunca' },
  { label: 'Entrené, pero hace mucho', value: 'retomo' },
  { label: 'Entreno hace menos de 1 año', value: 'menos-de-un-ano' },
  { label: 'Entreno hace más de 1 año', value: 'mas-de-un-ano' },
] as const satisfies readonly { label: string; value: Experience }[];

export const trainingLocations = [
  'Gimnasio',
  'Mi casa con equipamiento',
  'Mi casa sin equipamiento',
] as const;

export const equipmentOptions = [
  'Mancuernas',
  'Bandas elásticas',
  'Colchoneta',
  'Banco o step',
  'No tengo nada y prefiero arrancar así',
  'No tengo nada pero me compraría algo',
  'Otro',
] as const;

export const difficulties = [
  'Ser constante',
  'Saber cuánto peso usar y cuándo puedo subirlo',
  'La técnica de los ejercicios',
  'Otros',
] as const;

export interface IntakeData {
  discipline: Discipline | '';
  modality: Modality | '';
  name: string;
  age: string;
  city: string;
  phone: string;
  goals: string[];
  otherGoal: string;
  activity: string;
  otherActivity: string;
  experience: Experience | '';
  days: string;
  duration: string;
  location: string;
  equipment: string[];
  otherEquipment: string;
  hasDiscomfort: string;
  discomfortDetails: string;
  difficulties: string[];
  otherDifficulty: string;
  comments: string;
}

export const initialIntake: IntakeData = {
  discipline: '',
  modality: '',
  name: '',
  age: '',
  city: '',
  phone: '',
  goals: [],
  otherGoal: '',
  activity: '',
  otherActivity: '',
  experience: '',
  days: '',
  duration: '',
  location: '',
  equipment: [],
  otherEquipment: '',
  hasDiscomfort: '',
  discomfortDetails: '',
  difficulties: [],
  otherDifficulty: '',
  comments: '',
};

export function formatExperience(value: Experience | ''): string {
  return (
    experiences.find((experience) => experience.value === value)?.label ?? 'Sin indicar'
  );
}

function hasTextLength(value: string, minimum: number, maximum: number): boolean {
  const length = value.trim().length;
  return length >= minimum && length <= maximum;
}

function isValidFullName(value: string): boolean {
  const normalized = value.trim().replace(/\s+/g, ' ');
  const namePattern =
    /^[\p{L}\p{M}][\p{L}\p{M}.'’-]*(?:\s+[\p{L}\p{M}][\p{L}\p{M}.'’-]*)+$/u;

  return normalized.length <= intakeLimits.name && namePattern.test(normalized);
}

export function validateStep(step: number, data: IntakeData): string[] {
  const errors: string[] = [];

  if (step === 0) {
    if (data.discipline !== 'fuerza' && data.discipline !== 'pilates') {
      errors.push('Seleccioná qué querés practicar.');
    }

    if (data.modality !== 'online' && data.modality !== 'presencial') {
      errors.push('Seleccioná cómo preferís entrenar.');
    }
  }

  if (step === 1) {
    if (!isValidFullName(data.name)) {
      errors.push('Ingresá tu nombre y apellido.');
    }

    if (
      !/^\d{1,3}$/.test(data.age.trim()) ||
      Number(data.age) < 1 ||
      Number(data.age) > 120
    ) {
      errors.push('Ingresá una edad válida entre 1 y 120 años.');
    }

    if (!hasTextLength(data.city, 2, intakeLimits.city)) {
      errors.push('Ingresá una ciudad válida.');
    }

    const phoneLength = data.phone.replace(/\D/g, '').length;

    if (
      phoneLength < 8 ||
      phoneLength > 15 ||
      data.phone.trim().length > intakeLimits.phone
    ) {
      errors.push('Ingresá un WhatsApp válido con código de área.');
    }
  }

  if (step === 2) {
    if (data.goals.length < 1 || data.goals.length > 2) {
      errors.push('Elegí uno o dos objetivos.');
    }

    if (
      data.goals.includes('Otros') &&
      !hasTextLength(data.otherGoal, 2, intakeLimits.other)
    ) {
      errors.push('Contanos cuál es tu otro objetivo.');
    }

    if (!activities.includes(data.activity as (typeof activities)[number])) {
      errors.push('Indicá si realizás algún deporte o actividad física.');
    }

    if (
      data.activity === 'Otros' &&
      !hasTextLength(data.otherActivity, 2, intakeLimits.other)
    ) {
      errors.push('Contanos qué otra actividad realizás.');
    }

    if (!experiences.some((experience) => experience.value === data.experience)) {
      errors.push('Seleccioná tu experiencia entrenando.');
    }
  }

  if (step === 3) {
    if (!['2', '3', '4', '5'].includes(data.days)) {
      errors.push('Seleccioná cuántos días por semana podrías entrenar.');
    }

    if (
      !['30 minutos', '45 minutos', '60 minutos', 'Más de 60 minutos'].includes(
        data.duration,
      )
    ) {
      errors.push(
        'Seleccioná cuánto tiempo podrías dedicarle a cada entrenamiento.',
      );
    }

    if (!trainingLocations.includes(data.location as (typeof trainingLocations)[number])) {
      errors.push('Indicá dónde vas a entrenar.');
    }

    if (data.location && data.location !== 'Gimnasio' && data.equipment.length === 0) {
      errors.push('Seleccioná qué elementos tenés o pensás comprar.');
    }

    const exclusiveEquipment = [
      'No tengo nada y prefiero arrancar así',
      'No tengo nada pero me compraría algo',
    ];

    const hasExclusiveEquipment = data.equipment.some((item) =>
      exclusiveEquipment.includes(item),
    );

    if (hasExclusiveEquipment && data.equipment.length > 1) {
      errors.push(
        'La opción de no tener equipamiento debe seleccionarse por separado.',
      );
    }

    if (
      data.location &&
      data.location !== 'Gimnasio' &&
      data.equipment.includes('Otro') &&
      !hasTextLength(data.otherEquipment, 2, intakeLimits.other)
    ) {
      errors.push('Contanos qué otro elemento tenés o pensás comprar.');
    }
  }

  if (step === 4) {
    if (data.hasDiscomfort !== 'si' && data.hasDiscomfort !== 'no') {
      errors.push('Indicá si tenés alguna lesión o molestia.');
    }

    if (!hasTextLength(data.discomfortDetails, 2, intakeLimits.discomfortDetails)) {
      errors.push(
        'Completá dónde y qué te pasó. Si no corresponde, escribí “No aplica”.',
      );
    }

    if (data.difficulties.length === 0) {
      errors.push('Elegí qué es lo que más te cuesta.');
    }

    if (
      data.difficulties.includes('Otros') &&
      !hasTextLength(data.otherDifficulty, 2, intakeLimits.other)
    ) {
      errors.push('Contanos qué otra dificultad tenés.');
    }

    // La pregunta 15 (comentarios adicionales) es opcional.
  }

  return errors;
}

function withOther(values: string[], other: string): string {
  return values
    .map((value) =>
      value === 'Otros' || value === 'Otro' ? `${value}: ${other.trim()}` : value,
    )
    .join(', ');
}

export function createSubmissionSummary(data: IntakeData): string {
  const goalsText = withOther(data.goals, data.otherGoal);

  const activityText =
    data.activity === 'Otros' ? `Otros: ${data.otherActivity.trim()}` : data.activity;

  const equipmentText = withOther(data.equipment, data.otherEquipment);
  const difficultiesText = withOther(data.difficulties, data.otherDifficulty);

  return [
    'SOLICITUD DE ENTRENAMIENTO — FORMA STUDIO',
    '',
    'PREFERENCIAS INICIALES',
    `Disciplina: ${data.discipline ? formatDiscipline(data.discipline) : 'Sin definir'}`,
    `Modalidad: ${data.modality ? formatModality(data.modality) : 'Sin definir'}`,
    '',
    '1. NOMBRE Y APELLIDO',
    data.name.trim(),
    '2. EDAD',
    `${data.age} años`,
    '3. CIUDAD',
    data.city.trim(),
    '4. WHATSAPP',
    data.phone.trim(),
    '5. OBJETIVOS',
    goalsText,
    '6. DEPORTE U OTRA ACTIVIDAD FÍSICA',
    activityText,
    '7. EXPERIENCIA ENTRENANDO',
    formatExperience(data.experience),
    '8. DÍAS POR SEMANA',
    `${data.days} días`,
    '9. TIEMPO POR ENTRENAMIENTO',
    data.duration,
    '10. LUGAR DE ENTRENAMIENTO',
    data.location,
    '11. ELEMENTOS DISPONIBLES O A COMPRAR',
    data.location === 'Gimnasio'
      ? 'No corresponde: entrenará en gimnasio.'
      : equipmentText,
    '12. LESIONES O MOLESTIAS',
    data.hasDiscomfort === 'si' ? 'Sí' : 'No',
    '13. DÓNDE Y QUÉ PASÓ',
    data.discomfortDetails.trim(),
    '14. QUÉ ES LO QUE MÁS LE CUESTA',
    difficultiesText,
    '15. COMENTARIOS ADICIONALES',
    data.comments.trim() || 'Sin comentarios',
  ].join('\n');
}
