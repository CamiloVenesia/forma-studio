import { useMemo, useState } from 'react';
import { ArrowUpRight, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';

import { ArrowLink } from '../components/common/ArrowLink';
import { Reveal } from '../components/common/Reveal';
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

const levels: ReadonlyArray<{ value: ProgramLevel | 'todos'; label: string }> = [
  { value: 'todos', label: 'Todos los niveles' },
  { value: 'inicial', label: 'Inicial' },
  { value: 'intermedio', label: 'Intermedio' },
  { value: 'multinivel', label: 'Multinivel' },
];

export function ProgramsPage() {
  const [discipline, setDiscipline] = useState<Discipline | 'todos'>('todos');
  const [level, setLevel] = useState<ProgramLevel | 'todos'>('todos');

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
      <section className="page-hero page-hero--soft">
        <div className="container">
          <Reveal>
            <SectionLabel number="01 /">EXPLORÁ LOS PROGRAMAS</SectionLabel>
            <h1 className="display-title">
              Un plan para <br />
              <em>tu momento.</em>
            </h1>
            <p>
              Elegí entre fuerza y pilates. Compará objetivos y niveles antes de decidir cómo querés
              entrenar.
            </p>
            <p className="commercial-disclaimer">
              Catálogo de demostración: los programas son ejemplos adaptables para futuros
              profesionales y estudios.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="catalog container section-spacing" aria-label="Catálogo de programas">
        <div className="catalog__filters">
          <div className="catalog__categories" role="group" aria-label="Filtrar por disciplina">
            {disciplines.map((item) => (
              <button
                key={item.value}
                type="button"
                className={discipline === item.value ? 'is-active' : ''}
                aria-pressed={discipline === item.value}
                onClick={() => setDiscipline(item.value)}
              >
                {item.label}
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
          {filtered.map((program, index) => (
            <Reveal key={program.slug} delay={(index % 2) * 0.08}>
              <Link className="catalog-card" to={`/programas/${program.slug}`}>
                <div className="catalog-card__visual">
                  <img src={program.image} alt={program.imageAlt} loading="lazy" />
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
                    Conocer el programa <ArrowUpRight size={17} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
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
            ¿No sabés por <br />
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
