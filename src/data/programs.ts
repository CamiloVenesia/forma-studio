import type { Program } from '../types/domain';

/** Contenido editorial demostrativo. No son planes terapéuticos ni asesoramiento individual. */
export const programs: Program[] = [
  {
    slug: 'fuerza-esencial',
    discipline: 'fuerza',
    eyebrow: '01 / FUERZA',
    name: 'Fuerza esencial',
    shortDescription: 'Una base sólida, sin apuros.',
    description:
      'Un recorrido progresivo para familiarizarte con el entrenamiento de fuerza, ganar confianza con los movimientos y empezar a construir una práctica sostenible.',
    image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Zona de mancuernas en un gimnasio contemporáneo',
    duration: 'Adaptable',
    intensity: 'Inicial',
    modalities: ['online', 'presencial'],
    benefits: [
      'Fundamentos de técnica',
      'Organización de sesiones',
      'Progresión adaptada',
      'Acompañamiento del proceso',
    ],
    forYou: 'Si estás empezando o querés volver a entrenar con una estructura clara.',
    sampleWeek: [
      'Día 01 — Patrón de sentadilla y empuje',
      'Día 02 — Movimientos de tracción y estabilidad',
      'Día 03 — Trabajo global y movilidad',
    ],
  },
  {
    slug: 'fuerza-evolucion',
    discipline: 'fuerza',
    eyebrow: '02 / FUERZA',
    name: 'Fuerza evolución',
    shortDescription: 'Progreso con intención.',
    description:
      'Para quienes ya entrenan y buscan desarrollar una planificación más consistente, con foco en la ejecución, el seguimiento y la progresión gradual.',
    image:
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Sesión de entrenamiento en gimnasio',
    duration: 'Adaptable',
    intensity: 'Intermedia',
    modalities: ['online', 'presencial'],
    benefits: [
      'Objetivos definidos',
      'Selección de ejercicios',
      'Registro de progreso',
      'Ajustes del programa',
    ],
    forYou: 'Si tenés experiencia y querés entrenar con una dirección más clara.',
    sampleWeek: [
      'Día 01 — Tren inferior',
      'Día 02 — Tren superior',
      'Día 03 — Fuerza global y accesorios',
    ],
  },
  {
    slug: 'pilates-flow',
    discipline: 'pilates',
    eyebrow: '03 / PILATES',
    name: 'Pilates flow',
    shortDescription: 'Fuerza, fluidez y control.',
    description:
      'Sesiones que exploran la coordinación, la movilidad y el control del movimiento, respetando el ritmo y las posibilidades de cada persona.',
    image:
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Práctica de actividad física en colchoneta',
    duration: 'Adaptable',
    intensity: 'Todos los niveles',
    modalities: ['online', 'presencial'],
    benefits: ['Conciencia corporal', 'Movilidad', 'Control y coordinación', 'Progresión gradual'],
    forYou: 'Si buscás una práctica consciente y una nueva forma de conectarte con el movimiento.',
    sampleWeek: [
      'Sesión 01 — Centro y respiración',
      'Sesión 02 — Movilidad y control',
      'Sesión 03 — Fluidez y estabilidad',
    ],
  },
  {
    slug: 'pilates-fundamentos',
    discipline: 'pilates',
    eyebrow: '04 / PILATES',
    name: 'Pilates fundamentos',
    shortDescription: 'Empezar desde lo esencial.',
    description:
      'Una introducción al trabajo consciente del movimiento. El objetivo es conocer los principios básicos y desarrollar una práctica a tu medida.',
    image:
      'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Espacio para práctica de movimiento y pilates',
    duration: 'Adaptable',
    intensity: 'Inicial',
    modalities: ['online', 'presencial'],
    benefits: [
      'Principios básicos',
      'Movimiento consciente',
      'Atención a la postura',
      'Ritmo personalizado',
    ],
    forYou: 'Si querés descubrir pilates y construir una práctica cómoda y progresiva.',
    sampleWeek: [
      'Sesión 01 — Introducción al movimiento',
      'Sesión 02 — Estabilidad y control',
      'Sesión 03 — Integración de movimientos',
    ],
  },
];

export function getProgram(slug: string | undefined) {
  return programs.find((program) => program.slug === slug);
}
