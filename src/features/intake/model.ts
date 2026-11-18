
import type { Discipline, Experience, Modality } from '../../types/domain';
import { formatDiscipline, formatModality } from '../../utils/text';

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
  'Nunca entrené',
  'Entrené, pero hace mucho',
  'Entreno hace menos de 1 año',
  'Entreno hace más de 1 año',
] as const;

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

export function validateStep(step: number, data: IntakeData): string[] {
  const errors: string[] = [];

  if (step === 0) {
    if (!data.discipline) errors.push('Seleccioná qué querés practicar.');
    if (!data.modality) errors.push('Seleccioná cómo preferís entrenar.');
  }

  if (step === 1) {
    if (data.name.trim().length < 3) errors.push('Ingresá tu nombre y apellido.');
    if (!/^\d{1,3}$/.test(data.age) || Number(data.age) < 1 || Number(data.age) > 120)
      errors.push('Ingresá una edad válida.');
    if (data.city.trim().length < 2) errors.push('Ingresá tu ciudad.');
    const phoneLength = data.phone.replace(/\D/g, '').length;
    if (phoneLength < 8 || phoneLength > 15)
      errors.push('Ingresá un WhatsApp válido con código de área.');
  }

  if (step === 2) {
    if (data.goals.length < 1 || data.goals.length > 2) errors.push('Elegí uno o dos objetivos.');
    if (data.goals.includes('Otros') && data.otherGoal.trim().length < 2)
      errors.push('Contanos cuál es tu otro objetivo.');
    if (!data.activity) errors.push('Indicá si realizás algún deporte o actividad física.');
    if (data.activity === 'Otros' && data.otherActivity.trim().length < 2)
      errors.push('Contanos qué otra actividad realizás.');
    if (!data.experience) errors.push('Seleccioná tu experiencia entrenando.');
  }

  if (step === 3) {
    if (!data.days) errors.push('Seleccioná cuántos días por semana podrías entrenar.');
    if (!data.duration)
      errors.push('Seleccioná cuánto tiempo podrías dedicarle a cada entrenamiento.');
    if (!data.location) errors.push('Indicá dónde vas a entrenar.');
    if (data.location && data.location !== 'Gimnasio' && data.equipment.length === 0)
      errors.push('Seleccioná qué elementos tenés o pensás comprar.');
    if (
      data.location &&
      data.location !== 'Gimnasio' &&
      data.equipment.includes('Otro') &&
      data.otherEquipment.trim().length < 2
    )
      errors.push('Contanos qué otro elemento tenés o pensás comprar.');
  }

  if (step === 4) {
    if (!data.hasDiscomfort) errors.push('Indicá si tenés alguna lesión o molestia.');
    if (data.discomfortDetails.trim().length < 2)
      errors.push('Completá dónde y qué te pasó. Si no corresponde, escribí “No aplica”.');
    if (data.difficulties.length === 0) errors.push('Elegí qué es lo que más te cuesta.');
    if (data.difficulties.includes('Otros') && data.otherDifficulty.trim().length < 2)
      errors.push('Contanos qué otra dificultad tenés.');
    if (data.comments.trim().length < 2)
      errors.push(
        'Completá el último campo. Si no tenés nada para agregar, escribí “Sin comentarios”.',
      );
  }

  return errors;
}

function withOther(values: string[], other: string): string {
  return values
    .map((value) => (value === 'Otros' || value === 'Otro' ? `${value}: ${other.trim()}` : value))
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
    data.age,
    '3. CIUDAD',
    data.city.trim(),
    '4. WHATSAPP',
    data.phone.trim(),
    '5. OBJETIVOS',
    goalsText,
    '6. DEPORTE U OTRA ACTIVIDAD FÍSICA',
    activityText,
    '7. EXPERIENCIA ENTRENANDO',
    data.experience,
    '8. DÍAS POR SEMANA',
    `${data.days} días`,
    '9. TIEMPO POR ENTRENAMIENTO',
    data.duration,
    '10. LUGAR DE ENTRENAMIENTO',
    data.location,
    '11. ELEMENTOS DISPONIBLES O A COMPRAR',
    data.location === 'Gimnasio' ? 'No corresponde: entrenará en gimnasio.' : equipmentText,
    '12. LESIONES O MOLESTIAS',
    data.hasDiscomfort === 'si' ? 'Sí' : 'No',
    '13. DÓNDE Y QUÉ PASÓ',
    data.discomfortDetails.trim(),
    '14. QUÉ ES LO QUE MÁS LE CUESTA',
    difficultiesText,
    '15. COMENTARIOS ADICIONALES',
    data.comments.trim(),
  ].join('\n');
}
