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
    socialImage:
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?fit=crop&w=1200&h=630&q=85&fm=jpg',
    socialImageAlt: 'Escena de entrenamiento del universo visual de FORMA Studio',
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
