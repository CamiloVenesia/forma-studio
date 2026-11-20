
import { ArrowLink } from '../common/ArrowLink';
import { Reveal } from '../common/Reveal';

export function FinalCta() {
  return (
    <section className="final-cta">
      <div className="container final-cta__inner">
        <Reveal>
          <span className="eyebrow">
            FUERZA · PILATES · ONLINE Y PRESENCIAL
          </span>

          <h2>
            Encontrá una forma
            <br />
            <em>de empezar.</em>
          </h2>

          <p>
            Cada proceso comienza con una decisión.
            Contanos tus objetivos, tu experiencia
            y cómo te gustaría entrenar.
            Queremos conocer tu punto de partida
            y ayudarte a dar el primer paso.
          </p>

          <ArrowLink
            to="/empezar"
            variant="light"
          >
            Quiero empezar a entrenar
          </ArrowLink>
        </Reveal>
      </div>

      <span
        className="final-cta__watermark"
        aria-hidden="true"
      >
        forma.
      </span>
    </section>
  );
}
