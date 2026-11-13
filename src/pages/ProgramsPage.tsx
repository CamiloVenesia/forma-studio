import { useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';

import { ArrowLink } from '../components/common/ArrowLink';
import { SectionLabel } from '../components/common/SectionLabel';
import { programs } from '../data/programs';
import type { Discipline, ProgramLevel } from '../types/domain';

const disciplines = [
  { value: 'todos', label: 'Todos' },
  { value: 'fuerza', label: 'Entrenamiento' },
  { value: 'pilates', label: 'Pilates' },
] as const satisfies ReadonlyArray<{
  value: Discipline | 'todos';
  label: string;
}>;

const levels: ReadonlyArray<{
  value: ProgramLevel | 'todos';
  label: string;
}> = [
  { value: 'todos', label: 'Todos los niveles' },
  { value: 'inicial', label: 'Inicial' },
  { value: 'intermedio', label: 'Intermedio' },
  { value: 'multinivel', label: 'Multinivel' },
];

const strengthProgram = programs.find((program) => program.discipline === 'fuerza');

const pilatesProgram = programs.find((program) => program.discipline === 'pilates');

function CatalogHero() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const strengthY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 65]);

  const pilatesY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : -45]);

  return (
    <section ref={ref} className="page-hero page-hero--soft page-hero--catalog">
      <div className="container catalog-hero__layout">
        <motion.div
          className="catalog-hero__copy"
          initial={reducedMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reducedMotion ? 0 : 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <SectionLabel number="01 /">EXPLORÁ LOS PROGRAMAS</SectionLabel>

          <h1 className="display-title">
            Un plan
            <br />
            para <em>tu momento.</em>
          </h1>

          <p className="catalog-hero__lead">
            Fuerza para avanzar. Pilates para conectar. Dos formas de empezar a moverte con
            intención.
          </p>

          <div className="catalog-hero__actions">
            <a className="catalog-hero__discover" href="#catalogo">
              Explorá los programas
              <ArrowDown size={19} aria-hidden="true" />
            </a>

            <span className="catalog-hero__count">
              {String(programs.length).padStart(2, '0')}
              {' / '}PROGRAMAS
            </span>
          </div>

          <p className="commercial-disclaimer">
            Catálogo de demostración: los programas son ejemplos adaptables para futuros
            profesionales y estudios.
          </p>
        </motion.div>

        <div className="catalog-hero__art">
          <span className="catalog-hero__outline" aria-hidden="true">
            FORMA
          </span>

          <span className="catalog-hero__orbit" aria-hidden="true" />

          {strengthProgram && (
            <motion.div
              className="catalog-hero__parallax catalog-hero__parallax--strength"
              style={{ y: strengthY }}
            >
              <motion.div
                className="catalog-hero__entrance"
                initial={
                  reducedMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 75,
                        rotate: -7,
                        scale: 0.93,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                  rotate: -4,
                  scale: 1,
                }}
                transition={{
                  duration: reducedMotion ? 0 : 1.05,
                  delay: reducedMotion ? 0 : 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  to={`/programas/${strengthProgram.slug}`}
                  className="catalog-hero__image-link catalog-hero__image-link--strength"
                  aria-label="Explorar programas de entrenamiento"
                >
                  <img
                    src={strengthProgram.image}
                    alt={strengthProgram.imageAlt}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />

                  <span className="catalog-hero__photo-tag">01 / FUERZA</span>

                  <span className="catalog-hero__photo-arrow" aria-hidden="true">
                    <ArrowUpRight size={23} />
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          )}

          {pilatesProgram && (
            <motion.div
              className="catalog-hero__parallax catalog-hero__parallax--pilates"
              style={{ y: pilatesY }}
            >
              <motion.div
                className="catalog-hero__entrance"
                initial={
                  reducedMotion
                    ? false
                    : {
                        opacity: 0,
                        y: -65,
                        rotate: 8,
                        scale: 0.92,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                  rotate: 5,
                  scale: 1,
                }}
                transition={{
                  duration: reducedMotion ? 0 : 1.15,
                  delay: reducedMotion ? 0 : 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  to={`/programas/${pilatesProgram.slug}`}
                  className="catalog-hero__image-link catalog-hero__image-link--pilates"
                  aria-label="Explorar programas de pilates"
                >
                  <img
                    src={pilatesProgram.image}
                    alt={pilatesProgram.imageAlt}
                    loading="eager"
                    decoding="async"
                  />

                  <span className="catalog-hero__photo-tag">02 / PILATES</span>

                  <span className="catalog-hero__photo-arrow" aria-hidden="true">
                    <ArrowUpRight size={23} />
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          )}

          <motion.div
            className="catalog-hero__seal"
            initial={reducedMotion ? false : { opacity: 0, scale: 0.4, rotate: -45 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 12,
            }}
            transition={{
              duration: reducedMotion ? 0 : 1,
              delay: reducedMotion ? 0 : 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            aria-hidden="true"
          >
            MOVETE
            <strong>A TU</strong>
            MANERA
          </motion.div>

          <div className="catalog-hero__footnote" aria-hidden="true">
            <span>FUERZA</span>
            <span>·</span>
            <span>CONTROL</span>
            <span>·</span>
            <span>MOVIMIENTO</span>
          </div>
        </div>
      </div>

      <div className="catalog-hero__bottom-line" aria-hidden="true" />
    </section>
  );
}

export function ProgramsPage() {
  const [discipline, setDiscipline] = useState<Discipline | 'todos'>('todos');

  const [level, setLevel] = useState<ProgramLevel | 'todos'>('todos');

  const reducedMotion = useReducedMotion();

  const filtered = useMemo(
    () =>
      programs.filter(
        (program) =>
          (discipline === 'todos' || program.discipline === discipline) &&
          (level === 'todos' || program.level === level),
      ),
    [discipline, level],
  );

  const hasFilters = discipline !== 'todos' || level !== 'todos';

  function resetFilters() {
    setDiscipline('todos');
    setLevel('todos');
  }

  return (
    <>
      <CatalogHero />

      <section
        id="catalogo"
        className="catalog container section-spacing"
        aria-label="Catálogo de programas"
      >
        <div className="catalog__filters">
          <div className="catalog__categories" role="group" aria-label="Filtrar por disciplina">
            {disciplines.map((item) => (
              <button
                key={item.value}
                type="button"
                className={`catalog-filter-button${discipline === item.value ? ' is-active' : ''}`}
                aria-pressed={discipline === item.value}
                onClick={() => setDiscipline(item.value)}
              >
                {discipline === item.value && (
                  <motion.span
                    layoutId="catalog-active-discipline"
                    className="catalog-filter-button__highlight"
                    aria-hidden="true"
                    transition={
                      reducedMotion
                        ? { duration: 0 }
                        : {
                            type: 'spring',
                            stiffness: 420,
                            damping: 36,
                          }
                    }
                  />
                )}

                <span className="catalog-filter-button__label">{item.label}</span>
              </button>
            ))}
          </div>

          <label className="catalog__mode">
            <SlidersHorizontal size={18} aria-hidden="true" />

            <span>Nivel</span>

            <select
              value={level}
              onChange={(event) => setLevel(event.target.value as ProgramLevel | 'todos')}
            >
              {levels.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="commercial-catalog-tools">
          <p className="catalog__count" aria-live="polite" role="status">
            {filtered.length} {filtered.length === 1 ? 'programa' : 'programas'} disponibles para
            explorar
          </p>

          {hasFilters && (
            <button className="commercial-reset" type="button" onClick={resetFilters}>
              <RotateCcw size={16} aria-hidden="true" />
              Limpiar filtros
            </button>
          )}
        </div>

        <div className="catalog__grid">
          <AnimatePresence initial={false} mode={reducedMotion ? 'sync' : 'popLayout'}>
            {filtered.map((program) => (
              <motion.div
                key={program.slug}
                className="catalog-motion-item"
                layout={!reducedMotion}
                initial={
                  reducedMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 28,
                        scale: 0.96,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={
                  reducedMotion
                    ? { opacity: 1 }
                    : {
                        opacity: 0,
                        y: -14,
                        scale: 0.97,
                      }
                }
                transition={{
                  duration: reducedMotion ? 0 : 0.47,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link className="catalog-card" to={`/programas/${program.slug}`}>
                  <div className="catalog-card__visual">
                    <img
                      src={program.image}
                      alt={program.imageAlt}
                      loading="lazy"
                      decoding="async"
                    />

                    <span className="catalog-card__discipline">
                      {program.discipline === 'fuerza' ? 'ENTRENAMIENTO' : 'PILATES'}
                    </span>

                    <span className="catalog-card__arrow" aria-hidden="true">
                      <ArrowUpRight size={22} />
                    </span>
                  </div>

                  <div className="catalog-card__info">
                    <span>{program.intensity} · Online y presencial</span>

                    <h2>{program.name}</h2>

                    <p>{program.shortDescription}</p>

                    <span className="commercial-card-link">
                      Conocer el programa
                      <ArrowUpRight size={17} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="catalog__empty" role="status">
            <h2>Probá con otra combinación.</h2>

            <p>En esta demostración no hay programas para los filtros elegidos.</p>

            <button type="button" onClick={resetFilters}>
              Mostrar todos
            </button>
          </div>
        )}
      </section>

      <section className="catalog-end container">
        <div>
          <h2 className="display-title">
            ¿No sabés por
            <br />
            <em>dónde empezar?</em>
          </h2>

          <p>
            El formulario te ayuda a ordenar tus objetivos, experiencia y disponibilidad antes de
            elegir una propuesta.
          </p>
        </div>

        <ArrowLink to="/empezar">Explorar mi punto de partida</ArrowLink>
      </section>
    </>
  );
}
