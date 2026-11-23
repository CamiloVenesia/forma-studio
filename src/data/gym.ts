import { media } from './media';


export const gym = {
  name: 'Forma Studio ENTRENAMIENTO',

  address:
    'Av. San Martín 748, X2189 Cruz Alta, Córdoba, Argentina',

  phone: '+54 3467 44-4971',

  phoneHref: 'tel:+543467444971',

  rating: '4.9',

  reviewCount: 7,

  hours: [
    {
      days: 'Lunes a jueves',
      time: '08:00 a 21:00',
    },
    {
      days: 'Viernes a domingo',
      time: 'Consultar',
    },
  ],

  mapsUrl:
    'https://www.google.com/maps/place/Pilar+Prado+ENTRENAMIENTO/@-33.0078382,-61.805641,19.08z/data=!4m6!3m5!1s0x95c9bbad3e057047:0xab46ed7edef7dad1!8m2!3d-33.0076797!4d-61.8061638!16s%2Fg%2F11rwlgrx99?entry=ttu',

  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=-33.0076797%2C-61.8061638',

  mapEmbedUrl:
    'https://www.google.com/maps?q=-33.0076797,-61.8061638&z=17&output=embed',

  reviewsUrl:
    'https://search.google.com/local/writereview?placeid=ChIJR3AFPq27yZUR0dr33n7tRqs',

  disciplines: [
    {
      number: '01',

      eyebrow: 'FUERZA Y ACONDICIONAMIENTO',

      title: 'Fuerza y entrenamiento funcional',

      description:
        'Una propuesta de movimiento y acondicionamiento físico para trabajar la fuerza y la capacidad corporal con ejercicios guiados.',

      image: media.spotlightStrength,

      imageAlt:
        'Persona realizando un ejercicio de fuerza con barra en un gimnasio',

      className: 'gym-discipline-card--strength',
    },

    {
      number: '02',

      eyebrow: 'PILATES CON APARATOS',

      title: 'Pilates guiado',

      description:
        'Una práctica centrada en el control del movimiento, la estabilidad y la coordinación, utilizando las máquinas.',

      image: media.catalogPilatesFlow,

      imageAlt:
        'Persona practicando Pilates sobre una máquina Reformer',

      className: 'gym-discipline-card--pilates',
    },
  ],

  equipmentImages: [
    {
      image: media.catalogStrengthStart,

      alt: 'Área de entrenamiento de fuerza con equipamiento de gimnasio',

      label: 'Entrenamiento de fuerza',
    },

    {
      image: media.detailPilatesFlow,

      alt: 'Máquina utilizada para ejercicios de Pilates guiados',

      label: 'Pilates guiado',
    },

    {
      image: media.storyStrength,

      alt: 'Entrenadora acompañando un ejercicio de fuerza',

      label: 'Acompañamiento',
    },
  ],
} as const;