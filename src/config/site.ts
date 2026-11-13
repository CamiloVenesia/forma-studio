import { media } from '../data/media';

export const site = {
  brand: {
    name: 'FORMA',
    suffix: 'STUDIO',
    slogan: 'Movimiento a tu manera.',
    email: 'formastudio@gmail.com',
    whatsappNumber: '549341XXXXXXX',
    instagramUrl: 'https://www.instagram.com/pilarprado00',
    locale: 'es-AR',
  },

  meta: {
    title: 'FORMA Studio — Movimiento a tu manera',
    description:
      'Entrenamiento y pilates, online y presencial. Explorá propuestas y encontrá una forma de moverte a tu ritmo.',
  },

  hero: {
    eyebrow: 'FUERZA / PILATES / MOVIMIENTO',
    intro: 'Gimnasio y pilates, online y presencial. Entrená con intención y avanzá a tu ritmo.',
  },

  images: {
    hero: media.hero,
    detail: media.coaching,
    studio: media.storyContinuity,
    spotlightStrength: media.spotlightStrength,
    spotlightPilates: media.spotlightPilates,
  },

  demo: true,
} as const;
