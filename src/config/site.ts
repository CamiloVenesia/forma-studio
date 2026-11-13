/**
 * Configuración comercial de FORMA Studio.
 *
 * Para adaptar el proyecto a otra marca, comenzar por
 * este archivo y src/data/programs.ts.
 *
 * Los datos de profesionales y fotografías personales
 * deben utilizarse únicamente con autorización.
 */

export const site = {
  brand: {
    name: 'FORMA',
    suffix: 'STUDIO',
    slogan: 'Movimiento a tu manera.',
    email: '',
    whatsappNumber: '',
    instagramUrl: '',
    locale: 'es-AR',
  },

  meta: {
    title: 'FORMA Studio — Movimiento a tu manera',
    description:
      'Un nuevo concepto de entrenamiento y pilates, online y presencial. Explorá programas y descubrí una forma de moverte a tu ritmo.',
  },

  hero: {
    eyebrow: 'FUERZA / PILATES / MOVIMIENTO',
    intro: 'Gimnasio y pilates, online y presencial. Entrená con intención y avanzá a tu ritmo.',
  },

  images: {
    hero: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1400&q=85',
    detail:
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=85',
    studio:
      'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=85',
  },

  demo: true,
} as const;
