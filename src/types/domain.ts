
/**
 * Tipos compartidos de FORMA Studio.
 *
 * Utilizados por:
 * - Programas de entrenamiento.
 * - Formulario de inscripción.
 * - Validaciones.
 * - Pruebas automatizadas.
 */

export type Discipline = 'fuerza' | 'pilates';

export type Modality = 'online' | 'presencial';

/**
 * Valores reales utilizados por el formulario.
 *
 * Deben coincidir con src/features/intake/model.ts
 * para que las validaciones y las pruebas funcionen.
 */
export type Experience =
  | 'nunca'
  | 'retomo'
  | 'menos-de-un-ano'
  | 'mas-de-un-ano';

export type ProgramLevel =
  | 'inicial'
  | 'intermedio'
  | 'multinivel';

/**
 * Estructura de los programas de fuerza y Pilates.
 */
export interface Program {
  slug: string;
  discipline: Discipline;
  level: ProgramLevel;
  eyebrow: string;
  name: string;
  shortDescription: string;
  description: string;
  image: string;
  imageAlt: string;
  detailImage: string;
  detailImageAlt: string;
  duration: string;
  intensity: string;
  modalities: Modality[];
  benefits: string[];
  forYou: string;
  approach: string[];
  sampleWeek: string[];
}
