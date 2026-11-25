
import { Reveal } from '../common/Reveal';
import { SectionLabel } from '../common/SectionLabel';
import { ArrowLink } from '../common/ArrowLink';

const steps = [
  ['01', 'Contanos de vos', 'Tus objetivos, tus tiempos y tu punto de partida.'],
  ['02', 'Encontrá tu propuesta', 'Elegí una disciplina y la modalidad que mejor se adapte a vos.'],
  ['03', 'Empezá a construir', 'Entrená con una dirección clara y espacio para progresar.'],
];

export function Journey() {
  return (
    <section className="journey section-spacing">
      <div className="container journey__layout">
        <div className="journey__intro">
          <Reveal>
            <SectionLabel number="03 /">UN CAMINO A TU MEDIDA</SectionLabel>
            <h2 className="display-title">
              Tu primer
              <br />
              paso cambia
              <br />
              <em>todo.</em>
            </h2>
            <p>
              No hace falta tener todo resuelto para empezar. A veces alcanza con encontrar una
              forma de moverte que tenga sentido para vos.
            </p>
            <ArrowLink to="/empezar" variant="outline">
              Empezar mi camino
            </ArrowLink>
          </Reveal>
        </div>

        <div className="journey__steps">
          {steps.map(([index, title, text]) => (
            <Reveal key={index}>
              <div className="journey-step">
                <span>{index}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>

                <span className="journey-step__star" aria-hidden="true">
                  <svg viewBox="0 0 100 100" width="18" height="18" focusable="false">
                    <path
                      fill="currentColor"
                      d="M46 0h8v34l24-24 6 6-24 24h34v8H60l24 24-6 6-24-24v34h-8V60L22 84l-6-6 24-24H6v-8h34L16 22l6-6 24 24z"
                    />
                  </svg>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
