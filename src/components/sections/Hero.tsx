
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
import { MarbleClouds } from './MarbleClouds';
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
    caption: 'Encontrá tu centro.',
    alt: 'Persona practicando pilates sobre una máquina reformer',
  },
  fuerza: {
    id: 'photo-1567598317136-3cd762432241',
    label: 'FUERZA',
    caption: 'Construí tu potencia.',
    alt: 'Persona realizando entrenamiento de fuerza en un gimnasio',
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

/* Transición horizontal entre fotografías */

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    scale: 1.03,
    opacity: 1,
    zIndex: 2,
  }),

  center: {
    x: '0%',
    scale: 1,
    opacity: 1,
    zIndex: 2,
    transition: {
      duration: 0.9,
      ease,
    },
  },

  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    scale: 1.015,
    opacity: 1,
    zIndex: 1,
    transition: {
      duration: 0.9,
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

/* Franja inferior de servicios */

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
              delay: reducedMotion ? 0 : index * 0.12,
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
    stiffness: 90,
    damping: 18,
    mass: 0.75,
  });

  const rotateY = useSpring(pointerX, {
    stiffness: 90,
    damping: 18,
    mass: 0.75,
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const photoY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reducedMotion ? 0 : 34],
  );

  const titleY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reducedMotion ? 0 : -24],
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
    if (typeof window === 'undefined') return;

    const image = new Image();
    image.src = photoUrl(photographs[value].id, 720);
  }

  function handlePointerMove(
    event: PointerEvent<HTMLDivElement>,
  ) {
    if (
      reducedMotion ||
      event.pointerType !== 'mouse'
    ) {
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

    pointerX.set(horizontal * 8);
    pointerY.set(vertical * -8);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  const imageNumber =
    selection.discipline === 'pilates'
      ? '01'
      : '02';

  return (
    <>
      <section
        ref={sectionRef}
        className="hero hero--cinematic hero-v2 container"
        aria-labelledby="hero-title"
      >

        <MarbleClouds
          hostRef={sectionRef}
          reducedMotion={reducedMotion}
        />

        {/* Columna editorial */}

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
                    duration:
                      reducedMotion ? 0 : 1.08,
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

        {/* Composición fotográfica */}

        <div
          className="hero-v2__visual"
          onPointerMove={handlePointerMove}
          onPointerLeave={resetPointer}
        >
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
                      opacity: 0,
                      y: 30,
                      scale: 0.98,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration:
                  reducedMotion ? 0 : 1.05,
                delay:
                  reducedMotion ? 0 : 0.2,
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

                <div
                  className="hero-v2__photo-shade"
                  aria-hidden="true"
                />
              </div>

              {/* Texto interior de cada foto */}

              <AnimatePresence
                mode="wait"
                initial={false}
              >
                <motion.div
                  key={selection.discipline}
                  className="hero-v2__photo-caption"
                  initial={
                    reducedMotion
                      ? false
                      : { opacity: 0, y: 12 }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={
                    reducedMotion
                      ? undefined
                      : { opacity: 0, y: -8 }
                  }
                  transition={{
                    duration:
                      reducedMotion ? 0 : 0.3,
                    ease,
                  }}
                >
                  <span>
                    FORMA / {selected.label}
                  </span>

                  <strong>
                    {selected.caption}
                  </strong>
                </motion.div>
              </AnimatePresence>

              <div
                className="hero-v2__photo-counter"
                aria-hidden="true"
              >
                {imageNumber}
                <small> / 02</small>
              </div>
            </motion.div>
          </div>

          {/* Sello circular original */}

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

          {/* Selector de fotografías */}

          <motion.div
            className="hero-v2__switcher"
            initial={
              reducedMotion
                ? false
                : { opacity: 0, y: 18 }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: reducedMotion ? 0 : 0.7,
              delay: reducedMotion ? 0 : 0.82,
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
                  <span className="hero-v2__switch-number">
                    0{index + 1}
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
