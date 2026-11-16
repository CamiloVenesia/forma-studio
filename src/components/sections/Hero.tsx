
import { useRef, useState, type PointerEvent } from 'react';
import { Dumbbell, Flower2, Sparkles } from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';

import { ArrowLink } from '../common/ArrowLink';
import { site } from '../../config/site';

type Discipline = 'pilates' | 'fuerza';

type Selection = {
  discipline: Discipline;
  direction: number;
};

const ease: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
];

const photographs = {
  pilates: {
    id: 'photo-1747240549807-fc3962949818',
    label: 'PILATES',
    alt: 'Mujer practicando pilates en una máquina reformer',
  },
  fuerza: {
    id: 'photo-1567598317136-3cd762432241',
    label: 'FUERZA',
    alt: 'Entrenamiento de fuerza en gimnasio',
  },
} as const;

const highlights = [
  {
    title: 'FUERZA',
    description: 'Construí tu potencia',
    Icon: Dumbbell,
  },
  {
    title: 'PILATES',
    description: 'Conectá con tu cuerpo',
    Icon: Flower2,
  },
  {
    title: 'ACOMPAÑAMIENTO',
    description: 'Un plan a tu medida',
    Icon: Sparkles,
  },
] as const;

function photoUrl(id: string, width: number) {
  return `/images/${id}-${width}.webp`;
}

/*
 * Conservamos el recorte original de la fotografía.
 * Este trazado se utiliza también para dibujar
 * un borde que sigue exactamente su contorno.
 */

const photoShape = [
  'M0 260',
  'C0 100 185 0 500 0',
  'C815 0 1000 100 1000 260',
  'L1000 835',
  'C805 835 630 810 450 850',
  'C280 895 180 985 0 1000',
  'Z',
].join(' ');

/*
 * La curva cambia de forma continuamente.
 *
 * Los seis estados tienen la misma estructura SVG
 * para permitir una interpolación suave.
 *
 * El último estado coincide con el primero:
 * el movimiento no tiene saltos al reiniciarse.
 */

const snakePaths = [
  'M -70 750 C 120 680 55 455 230 540 C 410 660 490 705 650 565 C 805 430 775 180 1080 150',

  'M -70 750 C 145 760 115 420 260 490 C 400 575 530 645 665 510 C 800 355 855 220 1080 125',

  'M -70 750 C 100 685 150 570 235 620 C 410 730 475 570 645 620 C 825 580 760 175 1080 170',

  'M -70 750 C 155 730 65 400 220 510 C 390 665 555 700 675 515 C 840 325 865 240 1080 135',

  'M -70 750 C 110 700 105 525 255 570 C 420 625 525 625 625 545 C 785 410 815 205 1080 165',

  'M -70 750 C 120 680 55 455 230 540 C 410 660 490 705 650 565 C 805 430 775 180 1080 150',
];

const morphTransition = {
  duration: 16,
  times: [0, 0.19, 0.41, 0.63, 0.83, 1],
  repeat: Infinity,
  ease: 'easeInOut' as const,
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    scale: 1.055,
    opacity: 1,
    zIndex: 2,
  }),

  center: {
    x: '0%',
    scale: 1,
    opacity: 1,
    zIndex: 2,
    transition: {
      duration: 0.95,
      ease,
    },
  },

  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    scale: 1.025,
    opacity: 1,
    zIndex: 1,
    transition: {
      duration: 0.95,
      ease,
    },
  }),
};

const reducedSlideVariants = {
  enter: { opacity: 0 },

  center: {
    opacity: 1,
    transition: { duration: 0.15 },
  },

  exit: {
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

const headline = [
  {
    key: 'moverse',
    content: <>Moverse</>,
  },
  {
    key: 'tambien',
    content: <>también es</>,
  },
  {
    key: 'elegirte',
    content: (
      <em>
        elegirte
        <span className="hero-v2__period">.</span>
      </em>
    ),
  },
];

function FormaSeal() {
  return (
    <svg
      className="hero-v2__seal-art"
      viewBox="0 0 160 160"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        cx="80"
        cy="80"
        r="75"
        className="hero-v2__seal-border"
        fill="none"
      />

      <circle
        cx="80"
        cy="80"
        r="62"
        className="hero-v2__seal-inner-ring"
        fill="none"
      />

      <text
        x="80"
        y="35"
        textAnchor="middle"
        className="hero-v2__seal-word"
      >
        FORMA
      </text>

      <g className="hero-v2__seal-star">
        <path
          d="M80 48 C84 68 92 76 112 80
             C92 84 84 92 80 112
             C76 92 68 84 48 80
             C68 76 76 68 80 48 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinejoin="round"
        />

        <path
          d="M80 61 V99 M61 80 H99"
          stroke="currentColor"
          strokeWidth="0.9"
          strokeOpacity="0.45"
          strokeLinecap="round"
        />

        <circle
          cx="80"
          cy="80"
          r="2.7"
          fill="currentColor"
        />
      </g>

      <text
        x="80"
        y="137"
        textAnchor="middle"
        className="hero-v2__seal-word"
      >
        STUDIO
      </text>
    </svg>
  );
}

/*
 * La curva está dentro de .hero-v2__visual.
 * Nunca se dibuja encima del texto de la izquierda.
 */

function HeroDecorativeLine({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  return (
    <svg
      className="hero-v2__trace"
      viewBox="0 0 1000 800"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.path
        className="hero-v2__trace-base"
        d={snakePaths[0]}
        fill="none"
        animate={
          reducedMotion
            ? undefined
            : { d: snakePaths }
        }
        transition={morphTransition}
      />

      <motion.path
        className="hero-v2__trace-light"
        d={snakePaths[0]}
        fill="none"
        strokeDasharray="75 250"
        animate={
          reducedMotion
            ? undefined
            : {
                d: snakePaths,
                strokeDashoffset: [0, -650],
              }
        }
        transition={{
          d: morphTransition,
          strokeDashoffset: {
            duration: 5.2,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
      />
    </svg>
  );
}

/*
 * El marco fotográfico y su borde usan
 * el mismo trazado SVG.
 *
 * El borde se dibuja fuera de la máscara,
 * evitando que el navegador lo recorte.
 */

function PhotoOutline() {
  return (
    <svg
      className="hero-v2__photo-outline"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d={photoShape}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function HeroHighlights({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  return (
    <div
      className="hero-v2__highlights"
      aria-label="Áreas de FORMA Studio"
    >
      {highlights.map(
        ({ title, description, Icon }, index) => (
          <motion.div
            key={title}
            className="hero-v2__highlight"
            initial={
              reducedMotion
                ? false
                : { opacity: 0, y: 20 }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.4,
            }}
            transition={{
              duration: reducedMotion ? 0 : 0.7,
              delay: reducedMotion ? 0 : index * 0.13,
              ease,
            }}
          >
            <Icon
              size={31}
              strokeWidth={1.3}
              aria-hidden="true"
            />

            <div className="hero-v2__highlight-copy">
              <strong>{title}</strong>
              <span>{description}</span>
            </div>
          </motion.div>
        ),
      )}
    </div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const [selection, setSelection] = useState<Selection>({
    discipline: 'pilates',
    direction: 1,
  });

  const reducedMotion = Boolean(useReducedMotion());
  const selected = photographs[selection.discipline];

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const rotateX = useSpring(pointerY, {
    stiffness: 85,
    damping: 18,
    mass: 0.7,
  });

  const rotateY = useSpring(pointerX, {
    stiffness: 85,
    damping: 18,
    mass: 0.7,
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const photoY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reducedMotion ? 0 : 40],
  );

  const titleY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reducedMotion ? 0 : -30],
  );

  function changeDiscipline(value: Discipline) {
    setSelection((previous) => {
      if (previous.discipline === value) {
        return previous;
      }

      return {
        discipline: value,
        direction: value === 'fuerza' ? 1 : -1,
      };
    });
  }

  function preloadDiscipline(value: Discipline) {
    const image = new Image();
    image.src = photoUrl(photographs[value].id, 720);
  }

  function handlePointerMove(
    event: PointerEvent<HTMLDivElement>,
  ) {
    if (reducedMotion || event.pointerType !== 'mouse') {
      return;
    }

    const bounds =
      event.currentTarget.getBoundingClientRect();

    const horizontal =
      (event.clientX - bounds.left) /
        bounds.width -
      0.5;

    const vertical =
      (event.clientY - bounds.top) /
        bounds.height -
      0.5;

    pointerX.set(horizontal * 9);
    pointerY.set(vertical * -9);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <>
      <section
        ref={sectionRef}
        className="hero hero--cinematic hero-v2 container"
        aria-labelledby="hero-title"
      >
        <div className="hero-v2__text">
          <motion.span
            className="eyebrow hero-v2__eyebrow"
            initial={
              reducedMotion
                ? false
                : { opacity: 0, y: 15 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reducedMotion ? 0 : 0.75,
              ease,
            }}
          >
            <span className="hero-v2__eyebrow-number">
              01 /
            </span>

            {site.hero.eyebrow}
          </motion.span>

          <motion.h1
            id="hero-title"
            style={
              reducedMotion
                ? undefined
                : { y: titleY }
            }
          >
            {headline.map((line, index) => (
              <span
                key={line.key}
                className="hero-v2__line-mask"
              >
                <motion.span
                  className="hero-v2__title-line"
                  initial={
                    reducedMotion
                      ? false
                      : { y: '115%' }
                  }
                  animate={{ y: '0%' }}
                  transition={{
                    duration: reducedMotion ? 0 : 1.12,
                    delay:
                      reducedMotion
                        ? 0
                        : 0.12 + index * 0.16,
                    ease,
                  }}
                >
                  {line.content}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.div
            className="hero-v2__lower"
            initial={
              reducedMotion
                ? false
                : { opacity: 0, y: 22 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reducedMotion ? 0 : 0.9,
              delay: reducedMotion ? 0 : 0.65,
              ease,
            }}
          >
            <p className="hero-v2__intro">
              {site.hero.intro}
            </p>

            <div className="hero-v2__buttons">
              <ArrowLink to="/programas">
                Conocer programas
              </ArrowLink>

              <ArrowLink
                to="/asesoramiento"
                variant="outline"
              >
                Asesoramiento
              </ArrowLink>
            </div>
          </motion.div>
        </div>

        <div
          className="hero-v2__visual"
          onPointerMove={handlePointerMove}
          onPointerLeave={resetPointer}
        >
          <HeroDecorativeLine
            reducedMotion={reducedMotion}
          />

          <div className="hero-v2__perspective">
            <motion.div
              className="hero-v2__photo-shell"
              style={
                reducedMotion
                  ? undefined
                  : { rotateX, rotateY }
              }
              initial={
                reducedMotion
                  ? false
                  : {
                      clipPath:
                        'inset(0 0 100% 0)',
                    }
              }
              animate={{
                clipPath: 'inset(0 0 0% 0)',
              }}
              transition={{
                duration: reducedMotion ? 0 : 1.25,
                delay: reducedMotion ? 0 : 0.18,
                ease,
              }}
            >
              <div className="hero-v2__photo-frame">
                <motion.div
                  className="hero-v2__photo-parallax"
                  style={
                    reducedMotion
                      ? undefined
                      : { y: photoY }
                  }
                >
                  <div className="hero-v2__photo-zoom">
                    <AnimatePresence
                      initial={false}
                      mode="sync"
                      custom={selection.direction}
                    >
                      <motion.div
                        key={selection.discipline}
                        className="hero-v2__slide"
                        custom={selection.direction}
                        variants={
                          reducedMotion
                            ? reducedSlideVariants
                            : slideVariants
                        }
                        initial="enter"
                        animate="center"
                        exit="exit"
                      >
                        <img
                          className="hero-v2__photo"
                          src={photoUrl(
                            selected.id,
                            1600,
                          )}
                          srcSet={[
                            `${photoUrl(selected.id, 720)} 720w`,
                            `${photoUrl(selected.id, 1200)} 1200w`,
                            `${photoUrl(selected.id, 1600)} 1600w`,
                            `${photoUrl(selected.id, 2200)} 2200w`,
                          ].join(', ')}
                          sizes="(max-width: 767px) 92vw, (max-width: 1199px) 50vw, 45vw"
                          alt={selected.alt}
                          loading="eager"
                          decoding="async"
                          fetchPriority={
                            selection.discipline ===
                            'pilates'
                              ? 'high'
                              : 'auto'
                          }
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>

              <PhotoOutline />
            </motion.div>
          </div>

          <motion.div
            className="hero-v2__seal"
            aria-hidden="true"
            initial={
              reducedMotion
                ? false
                : {
                    opacity: 0,
                    scale: 0.7,
                    rotate: -20,
                  }
            }
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}
            transition={{
              duration: reducedMotion ? 0 : 1,
              delay: reducedMotion ? 0 : 0.8,
              ease,
            }}
          >
            <FormaSeal />
          </motion.div>

          <motion.div
            className="hero-v2__switcher"
            initial={
              reducedMotion
                ? false
                : { opacity: 0, y: 20 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reducedMotion ? 0 : 0.7,
              delay: reducedMotion ? 0 : 0.9,
              ease,
            }}
            role="group"
            aria-label="Elegir fotografía de Pilates o Fuerza"
          >
            {(
              ['pilates', 'fuerza'] as const
            ).map((value, index) => {
              const active =
                selection.discipline === value;

              return (
                <button
                  key={value}
                  type="button"
                  className={`hero-v2__switch${
                    active ? ' is-active' : ''
                  }`}
                  aria-pressed={active}
                  onPointerEnter={() =>
                    preloadDiscipline(value)
                  }
                  onFocus={() =>
                    preloadDiscipline(value)
                  }
                  onClick={() =>
                    changeDiscipline(value)
                  }
                >
                  {active && (
                    <motion.span
                      className="hero-v2__switch-indicator"
                      layoutId="hero-v2-active"
                      transition={
                        reducedMotion
                          ? { duration: 0 }
                          : {
                              type: 'spring',
                              stiffness: 360,
                              damping: 31,
                            }
                      }
                      aria-hidden="true"
                    />
                  )}

                  <span className="hero-v2__switch-number">
                    0{index + 1} /
                  </span>

                  <span className="hero-v2__switch-label">
                    {photographs[value].label}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      <HeroHighlights
        reducedMotion={reducedMotion}
      />
    </>
  );
}
