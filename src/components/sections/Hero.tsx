import { useRef, useState, type PointerEvent } from 'react';
import { ArrowDownRight, ArrowUpRight, Asterisk } from 'lucide-react';
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

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const photographs = {
  pilates: {
    id: 'photo-1747240549807-fc3962949818',
    label: 'PILATES',
    description: 'Encontrá tu centro.',
    alt: 'Mujer practicando pilates en una máquina reformer',
    credit: 'Roxana Popovici',
    source: 'https://unsplash.com/photos/woman-doing-pilates-on-a-reformer-machine-Zp4APUiwEsM',
  },
  fuerza: {
    id: 'photo-1567598317136-3cd762432241',
    label: 'FUERZA',
    description: 'Descubrí de qué sos capaz.',
    alt: 'Mujer entrenando con mancuernas en un gimnasio',
    credit: 'Benjamin Klaver',
    source: 'https://unsplash.com/photos/woman-carries-dumbbells-e08l4Ny-0eg',
  },
} as const;

function photoUrl(id: string, width: number) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
}

const imageVariants = {
  enter: {
    x: '105%',
    scale: 1.08,
    clipPath: 'polygon(7% 0%, 100% 0%, 100% 100%, 0% 100%)',
    zIndex: 2,
  },
  visible: {
    x: '0%',
    scale: 1,
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    zIndex: 2,
    transition: {
      duration: 0.92,
      ease,
    },
  },
  exit: {
    x: '0%',
    scale: 1.035,
    zIndex: 1,
    transition: {
      duration: 0.92,
      ease,
    },
  },
};

const headline = [
  {
    key: 'moverse',
    content: <>Moverse</>,
  },
  {
    key: 'tambien',
    content: <em>también es</em>,
  },
  {
    key: 'elegirte',
    content: (
      <>
        elegirte
        <span className="hero-v2__period">.</span>
      </>
    ),
  },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const [discipline, setDiscipline] = useState<Discipline>('pilates');

  const reducedMotion = useReducedMotion();
  const selected = photographs[discipline];

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

  const photoY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 48]);

  const titleY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : -35]);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reducedMotion || event.pointerType !== 'mouse') {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();

    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;

    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;

    pointerX.set(horizontal * 17);
    pointerY.set(vertical * -17);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <section
      ref={sectionRef}
      className="hero hero--cinematic hero-v2 container"
      aria-labelledby="hero-title"
    >
      <div className="hero-v2__text">
        <motion.span
          className="eyebrow hero-v2__eyebrow"
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: reducedMotion ? 0 : 0.75,
            ease,
          }}
        >
          <span className="eyebrow-line" />
          {site.hero.eyebrow}
        </motion.span>

        <motion.h1 id="hero-title" style={reducedMotion ? undefined : { y: titleY }}>
          {headline.map((line, index) => (
            <span key={line.key} className="hero-v2__line-mask">
              <motion.span
                className="hero-v2__title-line"
                initial={reducedMotion ? false : { y: '115%' }}
                animate={{ y: '0%' }}
                transition={{
                  duration: reducedMotion ? 0 : 1.16,
                  delay: reducedMotion ? 0 : 0.12 + index * 0.17,
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
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: reducedMotion ? 0 : 0.9,
            delay: reducedMotion ? 0 : 0.63,
            ease,
          }}
        >
          <p className="hero-v2__intro">{site.hero.intro}</p>

          <div className="hero-v2__buttons">
            <ArrowLink to="/programas">Explorar programas</ArrowLink>

            <ArrowLink to="/empezar" variant="text">
              Quiero empezar
            </ArrowLink>
          </div>
        </motion.div>

        <motion.div
          className="hero-v2__foot"
          initial={reducedMotion ? false : { opacity: 0, y: 15 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: reducedMotion ? 0 : 0.8,
            delay: reducedMotion ? 0 : 1.1,
            ease,
          }}
          aria-hidden="true"
        >
          <span>UNA NUEVA FORMA DE MOVERTE</span>

          <span className="hero-v2__foot-line" />

          <ArrowDownRight size={22} strokeWidth={1.4} />
        </motion.div>
      </div>

      <div
        className="hero-v2__visual"
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPointer}
      >
        <span className="hero-v2__outline" aria-hidden="true">
          FORMA
        </span>

        <span className="hero-v2__orbit" aria-hidden="true" />

        <span className="hero-v2__orbit hero-v2__orbit--secondary" aria-hidden="true" />

        <div className="hero-v2__perspective">
          <motion.div
            className="hero-v2__photo-frame"
            style={reducedMotion ? undefined : { rotateX, rotateY }}
            initial={
              reducedMotion
                ? false
                : {
                    clipPath: 'inset(0 0 100% 0)',
                  }
            }
            animate={{
              clipPath: 'inset(0 0 0% 0)',
            }}
            transition={{
              duration: reducedMotion ? 0 : 1.28,
              delay: reducedMotion ? 0 : 0.18,
              ease,
            }}
          >
            <motion.div
              className="hero-v2__photo-parallax"
              style={reducedMotion ? undefined : { y: photoY }}
            >
              <div className="hero-v2__photo-zoom">
                <AnimatePresence initial={false} mode="sync">
                  <motion.img
                    key={selected.id}
                    className="hero-v2__photo"
                    src={photoUrl(selected.id, 1600)}
                    srcSet={[
                      `${photoUrl(selected.id, 720)} 720w`,
                      `${photoUrl(selected.id, 1200)} 1200w`,
                      `${photoUrl(selected.id, 1600)} 1600w`,
                      `${photoUrl(selected.id, 2200)} 2200w`,
                    ].join(', ')}
                    sizes="(max-width: 767px) 90vw, (max-width: 1199px) 48vw, 45vw"
                    alt={selected.alt}
                    loading="eager"
                    decoding="async"
                    fetchPriority={discipline === 'pilates' ? 'high' : 'auto'}
                    initial={reducedMotion ? false : 'enter'}
                    animate="visible"
                    exit={reducedMotion ? undefined : 'exit'}
                    variants={imageVariants}
                  />
                </AnimatePresence>
              </div>
            </motion.div>

            <div className="hero-v2__photo-shade" aria-hidden="true" />

            <div className="hero-v2__photo-caption" aria-live="polite" aria-atomic="true">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={discipline}
                  className="hero-v2__caption-inner"
                  initial={
                    reducedMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 18,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={
                    reducedMotion
                      ? undefined
                      : {
                          opacity: 0,
                          y: -12,
                        }
                  }
                  transition={{
                    duration: reducedMotion ? 0 : 0.32,
                    ease,
                  }}
                >
                  <span>FORMA / {selected.label}</span>

                  <strong>{selected.description}</strong>
                </motion.div>
              </AnimatePresence>
            </div>

            <span className="hero-v2__photo-index" aria-hidden="true">
              {discipline === 'pilates' ? '01' : '02'}
              <span>/ 02</span>
            </span>
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
                  scale: 0.65,
                  rotate: -35,
                }
          }
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 12,
          }}
          transition={{
            duration: reducedMotion ? 0 : 1.1,
            delay: reducedMotion ? 0 : 0.8,
            ease,
          }}
        >
          <Asterisk size={29} strokeWidth={1.2} />

          <span>
            MOVIMIENTO
            <br />A TU MANERA
          </span>
        </motion.div>

        <motion.div
          className="hero-v2__switcher"
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  y: 25,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: reducedMotion ? 0 : 0.75,
            delay: reducedMotion ? 0 : 1,
            ease,
          }}
          role="group"
          aria-label="Elegir disciplina para explorar"
        >
          {(['pilates', 'fuerza'] as const).map((value, index) => {
            const active = discipline === value;

            return (
              <button
                key={value}
                type="button"
                className={`hero-v2__switch${active ? ' is-active' : ''}`}
                onClick={() => setDiscipline(value)}
                aria-pressed={active}
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

                <span className="hero-v2__switch-number">0{index + 1}</span>

                <span className="hero-v2__switch-label">{photographs[value].label}</span>
              </button>
            );
          })}

          <ArrowUpRight className="hero-v2__switch-decoration" size={20} aria-hidden="true" />
        </motion.div>

        <a
          className="hero-v2__credit"
          href={selected.source}
          target="_blank"
          rel="noopener noreferrer"
        >
          Foto: {selected.credit} / Unsplash
        </a>
      </div>
    </section>
  );
}
