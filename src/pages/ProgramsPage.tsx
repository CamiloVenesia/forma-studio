import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, SlidersHorizontal } from 'lucide-react';
import { programs } from '../data/programs';
import type { Discipline, Modality } from '../types/domain';
import { Reveal } from '../components/common/Reveal';
import { ArrowLink } from '../components/common/ArrowLink';
import { SectionLabel } from '../components/common/SectionLabel';

export function ProgramsPage() {
  const [category, setCategory] = useState<Discipline | 'todos'>('todos');
  const [modality, setModality] = useState<Modality | 'todas'>('todas');
  const filtered = useMemo(
    () =>
      programs.filter(
        (program) =>
          (category === 'todos' || program.discipline === category) &&
          (modality === 'todas' || program.modalities.includes(modality)),
      ),
    [category, modality],
  );

  return (
    <>
      <section className="page-hero page-hero--soft">
        <div className="container">
          <Reveal>
            <SectionLabel number="01 /">EL CATÁLOGO</SectionLabel>
            <h1 className="display-title">
              Encontrá lo que
              <br />
              <em>te mueve.</em>
            </h1>
            <p>
              Explorá disciplinas y propuestas. Cada recorrido se adapta a la persona que lo elige.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="catalog container section-spacing">
        <div className="catalog__filters">
          <div className="catalog__categories" role="group" aria-label="Filtrar por disciplina">
            {(
              [
                ['todos', 'Todos'],
                ['fuerza', 'Entrenamiento'],
                ['pilates', 'Pilates'],
              ] as const
            ).map(([value, label]) => (
              <button
                type="button"
                key={value}
                aria-pressed={category === value}
                className={category === value ? 'is-active' : ''}
                onClick={() => setCategory(value)}
              >
                {label}
              </button>
            ))}
          </div>
          <label className="catalog__mode">
            <SlidersHorizontal size={16} aria-hidden="true" />
            <span>Modalidad</span>
            <select
              value={modality}
              onChange={(e) => setModality(e.target.value as Modality | 'todas')}
            >
              <option value="todas">Todas</option>
              <option value="online">Online</option>
              <option value="presencial">Presencial</option>
            </select>
          </label>
        </div>
        <p className="catalog__count" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? 'propuesta' : 'propuestas'} para explorar
        </p>
        <div className="catalog__grid">
          {filtered.map((program, index) => (
            <Reveal key={program.slug} delay={(index % 2) * 0.1}>
              <Link className="catalog-card" to={`/programas/${program.slug}`}>
                <div className="catalog-card__visual">
                  <img src={program.image} alt={program.imageAlt} loading="lazy" />
                  <span className="catalog-card__discipline">
                    {program.discipline === 'fuerza' ? 'FUERZA' : 'PILATES'}
                  </span>
                  <span className="catalog-card__arrow">
                    <ArrowUpRight size={22} aria-hidden="true" />
                  </span>
                </div>
                <div className="catalog-card__info">
                  <span>{program.intensity} / Online & presencial</span>
                  <h2>{program.name}</h2>
                  <p>{program.shortDescription}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="catalog__empty">
            <p>No encontramos propuestas con esos filtros.</p>
            <button
              type="button"
              onClick={() => {
                setCategory('todos');
                setModality('todas');
              }}
            >
              Limpiar filtros
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
          <p>Respondé unas preguntas para encontrar una dirección que vaya con vos.</p>
        </div>
        <ArrowLink to="/empezar">Contanos de vos</ArrowLink>
      </section>
    </>
  );
}
