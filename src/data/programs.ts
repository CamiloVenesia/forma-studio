import type { Program } from '../types/domain';
import { media } from './media';

/**
 * Programas ficticios para una demostración comercial reutilizable.
 * Los contenidos no son prescripciones ni promesas de servicios disponibles.
 */
export const programs: Program[] = [
  {
    slug: 'fuerza-esencial',
    discipline: 'fuerza',
    level: 'inicial',
    eyebrow: '01 / ENTRENAMIENTO',
    name: 'Fuerza esencial',
    shortDescription: 'Aprendé a entrenar con una base clara y progresiva.',
    description:
      'Una propuesta de iniciación al trabajo de fuerza: técnica, organización y progresiones que pueden adaptarse a la experiencia y al contexto de cada persona.',
    image: media.catalogStrengthStart,
    imageAlt: 'Área de mancuernas de un gimnasio',
    detailImage: media.detailStrengthStart,
    detailImageAlt: 'Persona realizando un levantamiento de pesas',
    duration: 'A definir según objetivos',
    intensity: 'Inicial',
    modalities: ['online', 'presencial'],
    benefits: [
      'Aprender patrones básicos de movimiento',
      'Construir una rutina sostenible',
      'Comprender la progresión de cargas',
      'Ganar confianza en el gimnasio',
    ],
    forYou: 'Para quienes nunca entrenaron fuerza o quieren retomar después de una pausa.',
    approach: [
      'Conocer el punto de partida y la disponibilidad.',
      'Seleccionar ejercicios acordes con la experiencia.',
      'Revisar el aprendizaje técnico y los avances.',
    ],
    sampleWeek: [
      'Día 01 — Sentadilla, empuje y estabilidad',
      'Día 02 — Tracción, bisagra de cadera y movilidad',
      'Día 03 — Fuerza global y repaso técnico',
    ],
  },
  {
    slug: 'fuerza-evolucion',
    discipline: 'fuerza',
    level: 'intermedio',
    eyebrow: '02 / ENTRENAMIENTO',
    name: 'Fuerza evolución',
    shortDescription: 'Dale estructura a tu progreso y a tus objetivos.',
    description:
      'Un concepto para personas con experiencia que buscan entrenar con más planificación, registrar avances y revisar la selección de ejercicios con criterio.',
    image: media.catalogStrengthProgress,
    imageAlt: 'Persona realizando entrenamiento de fuerza',
    detailImage: media.detailStrengthProgress,
    detailImageAlt: 'Persona elevando una barra durante una sesión de fuerza',
    duration: 'A definir según objetivos',
    intensity: 'Intermedio',
    modalities: ['online', 'presencial'],
    benefits: [
      'Organizar objetivos de entrenamiento',
      'Estructurar sesiones y descansos',
      'Registrar cargas y repeticiones',
      'Revisar la progresión periódicamente',
    ],
    forYou: 'Para personas que ya entrenan y buscan más claridad en su planificación.',
    approach: [
      'Revisar experiencia, objetivos y ejercicios habituales.',
      'Organizar el trabajo en sesiones complementarias.',
      'Observar tendencias y ajustar la planificación.',
    ],
    sampleWeek: [
      'Día 01 — Énfasis en tren inferior',
      'Día 02 — Énfasis en tren superior',
      'Día 03 — Fuerza global y trabajo accesorio',
    ],
  },
  {
    slug: 'pilates-flow',
    discipline: 'pilates',
    level: 'multinivel',
    eyebrow: '03 / PILATES',
    name: 'Pilates flow',
    shortDescription: 'Explorá control, fluidez y movimiento consciente.',
    description:
      'Una propuesta de práctica de pilates con foco en coordinación, movilidad y control. La dificultad puede adaptarse a cada nivel y modalidad.',
    image: media.catalogPilatesFlow,
    imageAlt: 'Persona practicando pilates en un reformer',
    detailImage: media.detailPilatesFlow,
    detailImageAlt: 'Persona realizando pilates sobre una máquina reformer',
    duration: 'A definir según objetivos',
    intensity: 'Multinivel',
    modalities: ['online', 'presencial'],
    benefits: [
      'Explorar la coordinación',
      'Mejorar la conciencia del movimiento',
      'Integrar movilidad y control',
      'Practicar a un ritmo adaptable',
    ],
    forYou: 'Para quienes quieren incorporar una práctica corporal con atención al movimiento.',
    approach: [
      'Identificar experiencia y preferencias.',
      'Seleccionar secuencias acordes con el nivel.',
      'Ajustar el ritmo y las variantes de ejercicios.',
    ],
    sampleWeek: [
      'Sesión 01 — Centro y respiración',
      'Sesión 02 — Movilidad y control',
      'Sesión 03 — Integración y fluidez',
    ],
  },
  {
    slug: 'pilates-fundamentos',
    discipline: 'pilates',
    level: 'inicial',
    eyebrow: '04 / PILATES',
    name: 'Pilates fundamentos',
    shortDescription: 'Empezá desde los principios del movimiento.',
    description:
      'Una introducción gradual a pilates para familiarizarse con sus principios, conocer secuencias simples y desarrollar seguridad en la práctica.',
    image: media.catalogPilatesStart,
    imageAlt: 'Persona practicando movilidad sobre una colchoneta',
    detailImage: media.detailPilatesStart,
    detailImageAlt: 'Ejercicio de iniciación a pilates sobre reformer',
    duration: 'A definir según objetivos',
    intensity: 'Inicial',
    modalities: ['online', 'presencial'],
    benefits: [
      'Conocer los fundamentos de pilates',
      'Explorar estabilidad y respiración',
      'Aprender secuencias sencillas',
      'Adaptar la práctica a tu ritmo',
    ],
    forYou: 'Para personas que desean comenzar pilates con una introducción progresiva.',
    approach: [
      'Conversar sobre experiencia y objetivos.',
      'Introducir movimientos y variantes iniciales.',
      'Revisar la ejecución y ajustar la dificultad.',
    ],
    sampleWeek: [
      'Sesión 01 — Principios y respiración',
      'Sesión 02 — Estabilidad y coordinación',
      'Sesión 03 — Secuencias integradas',
    ],
  },
];

export function getProgram(slug: string | undefined): Program | undefined {
  return programs.find((program) => program.slug === slug);
}
