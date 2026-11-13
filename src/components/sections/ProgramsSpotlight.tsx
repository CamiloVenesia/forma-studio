import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '../common/Reveal';
import { SectionLabel } from '../common/SectionLabel';
import { programs } from '../../data/programs';

const spotlight = [programs[1], programs[2]];

export function ProgramsSpotlight() {
  return (
    <section className="spotlight section-spacing" id="programas">
      <div className="container">
        <Reveal className="spotlight__head">
          <div>
            <SectionLabel number="02 /">ELEGÍ TU CAMINO</SectionLabel>
            <h2 className="display-title">
              Dos disciplinas.
              <br />
              <em>Infinitas formas.</em>
            </h2>
          </div>
          <p>
            Desde la energía del entrenamiento de fuerza hasta el control y la fluidez del pilates.
            Todo empieza por descubrir qué necesitás.
          </p>
        </Reveal>
        <div className="spotlight__grid">
          {spotlight.map(
            (program, index) =>
              program && (
                <Reveal key={program.slug} delay={index * 0.12}>
                  <Link
                    to={`/programas/${program.slug}`}
                    className={`spotlight-item spotlight-item--${index}`}
                  >
                    <div className="spotlight-item__visual">
                      <img src={program.image} alt={program.imageAlt} loading="lazy" />
                      <span>{program.eyebrow}</span>
                      <span className="spotlight-item__arrow">
                        <ArrowUpRight size={24} strokeWidth={1.5} />
                      </span>
                    </div>
                    <div className="spotlight-item__footer">
                      <h3>{program.discipline === 'fuerza' ? 'Entrenamiento' : 'Pilates'}</h3>
                      <p>{program.shortDescription}</p>
                    </div>
                  </Link>
                </Reveal>
              ),
          )}
        </div>
        <Reveal className="spotlight__all">
          <Link className="underlined-link" to="/programas">
            Ver todos los programas <ArrowUpRight size={19} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
