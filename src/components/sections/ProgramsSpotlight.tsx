import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';

import { Reveal } from '../common/Reveal';
import { SectionLabel } from '../common/SectionLabel';
import { site } from '../../config/site';
import { unsplashWidth } from '../../utils/unsplash';

const featuredPrograms = [
  {
    slug: 'fuerza',
    title: 'Entrenamiento',
    description: 'Una nueva relación con tu fuerza.',
    image: site.images.spotlightStrength,
    alt: 'Sesión de entrenamiento de fuerza en gimnasio',
    to: '/programas?disciplina=fuerza',
    label: '01 / FUERZA',
  },
  {
    slug: 'pilates',
    title: 'Pilates',
    description: 'Control, precisión y libertad para moverte.',
    image: site.images.spotlightPilates,
    alt: 'Práctica de pilates sobre una máquina reformer',
    to: '/programas?disciplina=pilates',
    label: '02 / PILATES',
  },
] as const;

export function ProgramsSpotlight() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="spotlight section-spacing" id="programas">
      <div className="container">
        <Reveal className="spotlight__head">
          <div>
            <SectionLabel number="03 /">ELEGÍ TU CAMINO</SectionLabel>

            <h2 className="display-title">
              Dos disciplinas.
              <br />
              <em>Infinitas formas.</em>
            </h2>
          </div>

          <p>
            Fuerza y pilates, dos maneras de desarrollar tu movimiento. Explorá la propuesta que
            mejor se adapte a tus objetivos.
          </p>
        </Reveal>

        <div className="spotlight__grid spotlight__grid--cinematic">
          {featuredPrograms.map((item, index) => (
            <article className="spotlight-motion" key={item.slug}>
              <Link className={`spotlight-item spotlight-item--${index}`} to={item.to}>
                <div className="spotlight-item__visual">
                  <motion.img
                    src={unsplashWidth(item.image, 720)}
                    srcSet={`${unsplashWidth(item.image, 720)} 720w, ${unsplashWidth(
                      item.image,
                      1200,
                    )} 1200w`}
                    sizes="(min-width: 768px) 44vw, 90vw"
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    initial={false}
                    whileInView={reducedMotion ? undefined : { scale: [1.045, 1] }}
                    viewport={{
                      once: true,
                      amount: 0.12,
                    }}
                    transition={{
                      duration: 1.25,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />

                  <span>{item.label}</span>

                  <span className="spotlight-item__arrow" aria-hidden="true">
                    <ArrowUpRight size={24} strokeWidth={1.5} />
                  </span>
                </div>

                <div className="spotlight-item__footer">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <Reveal className="spotlight__all">
          <Link className="underlined-link" to="/programas">
            Ver todos los programas
            <ArrowUpRight size={19} aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
