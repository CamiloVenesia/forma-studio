import { media } from '../data/media';

export const site = {
  brand: {
    name: 'FORMA',
    suffix: 'STUDIO',
    slogan: 'Movimiento a tu manera.',
    email: 'formastudio@gmail.com',
    whatsappNumber: '549341XXXXXXX',
    instagramUrl: 'https://www.instagram.com/enforma_formacion/',
    locale: 'es-AR',
  },

  meta: {
    url: 'https://forma-studiofit.vercel.app',
    title: 'FORMA Studio | Movimiento, fuerza y pilates',
    description:
      'FORMA Studio reúne una identidad visual y una experiencia digital centradas en el movimiento, la fuerza y el pilates.',
    socialImage: 'https://forma-studiofit.vercel.app/images/forma-og.jpg',
    socialImageAlt: 'Escena de entrenamiento del universo visual de FORMA Studio',
  },

  hero: {
    eyebrow: 'MOVIMIENTO CON PROPÓSITO',
    intro: 'Fuerza, pilates y acompañamiento para sentirte bien, fuerte y en equilibrio.',
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
