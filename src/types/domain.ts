export type Discipline = 'fuerza' | 'pilates';
export type Modality = 'online' | 'presencial';
export type Experience = 'inicio' | 'retomo' | 'intermedio' | 'avanzado';
export type ProgramLevel = 'inicial' | 'intermedio' | 'multinivel';

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

export interface Exercise {
  id: string;
  title: string;
  category: Discipline;
  sets: string;
  repetitions: string;
  rest: string;
  cue: string;
}

export interface Workout {
  id: string;
  day: string;
  title: string;
  caption: string;
  duration: string;
  exerciseIds: string[];
}
