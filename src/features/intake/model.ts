import type { Discipline, Experience, Modality } from '../../types/domain';
import { formatDiscipline, formatModality } from '../../utils/text';

export const goals = [
  'Ganar fuerza',
  'Desarrollar masa muscular',
  'Mejorar mi movilidad',
  'Aumentar mi condición física',
  'Mejorar mi rendimiento',
  'Crear un hábito',
  'Sentirme mejor con el movimiento',
] as const;

export interface IntakeData {
  discipline: Discipline | '';
  modality: Modality | '';
  name: string;
  city: string;
  age: string;
  phone: string;
  goals: string[];
  experience: Experience | '';
  days: string;
  duration: string;
  location: string;
  equipment: string[];
  hasDiscomfort: string;
  consent: boolean;
}

export const initialIntake: IntakeData = {
  discipline: '',
  modality: '',
  name: '',
  city: '',
  age: '',
  phone: '',
  goals: [],
  experience: '',
  days: '',
  duration: '',
  location: '',
  equipment: [],
  hasDiscomfort: '',
  consent: false,
};

export function validateStep(step: number, data: IntakeData): string[] {
  const errors: string[] = [];
  if (step === 0) {
    if (!data.discipline) errors.push('Seleccioná qué te gustaría entrenar.');
    if (!data.modality) errors.push('Seleccioná una modalidad.');
  }
  if (step === 1) {
    if (data.name.trim().length < 3) errors.push('Ingresá tu nombre y apellido.');
    if (!/^\d{1,3}$/.test(data.age) || Number(data.age) < 18 || Number(data.age) > 100)
      errors.push('Esta demostración está orientada a mayores de 18 años.');
    if (data.city.trim().length < 2) errors.push('Ingresá tu ciudad.');
    if (data.phone.replace(/\D/g, '').length < 8 || data.phone.replace(/\D/g, '').length > 15)
      errors.push('Ingresá un teléfono válido con código de área.');
  }
  if (step === 2) {
    if (data.goals.length < 1 || data.goals.length > 2) errors.push('Elegí uno o dos objetivos.');
    if (!data.experience) errors.push('Indicá tu experiencia.');
    if (!data.days) errors.push('Seleccioná cuántos días por semana.');
    if (!data.duration) errors.push('Seleccioná cuánto dura una sesión.');
    if (data.modality === 'online' && !data.location) errors.push('Indicá dónde vas a entrenar.');
    if (!data.hasDiscomfort) errors.push('Indicá si tenés alguna molestia o lesión.');
  }
  if (step === 3 && !data.consent)
    errors.push('Confirmá que comprendés que esta versión no envía ni guarda datos.');
  return errors;
}

/** No incluye molestias, lesiones ni datos clínicos en los resúmenes compartibles. */
export function createSafeSummary(data: IntakeData): string {
  return [
    'SOLICITUD DE ENTRENAMIENTO — FORMA STUDIO (DEMO)',
    `Nombre: ${data.name.trim()}`,
    `Edad: ${data.age}`,
    `Ciudad: ${data.city.trim()}`,
    `WhatsApp: ${data.phone.trim()}`,
    `Actividad: ${data.discipline ? formatDiscipline(data.discipline) : 'Sin definir'}`,
    `Modalidad: ${data.modality ? formatModality(data.modality) : 'Sin definir'}`,
    `Objetivos: ${data.goals.join(', ')}`,
    `Experiencia: ${data.experience}`,
    `Disponibilidad: ${data.days} días / ${data.duration} min`,
    data.modality === 'online' ? `Lugar: ${data.location}` : '',
    '',
    'Versión demostrativa: no se realizó ningún envío.',
  ]
    .filter(Boolean)
    .join('\n');
}
