import { ArrowLink } from '../common/ArrowLink';
import { Reveal } from '../common/Reveal';

export function FinalCta() {
  return (
    <section className="final-cta">
      <div className="container final-cta__inner">
        <Reveal>
          <span className="eyebrow">FUERZA · PILATES · ONLINE Y PRESENCIAL</span>
          <h2>
            Encontrá una forma <br />
            <em>de empezar.</em>
          </h2>
          <p>
            Explorá las propuestas y descubrí cómo podría organizarse un entrenamiento a tu medida.
            Esta versión es una demostración.
          </p>
          <ArrowLink to="/empezar" variant="light">
            Completar formulario de muestra
          </ArrowLink>
        </Reveal>
      </div>
      <span className="final-cta__watermark" aria-hidden="true">
        forma.
      </span>
    </section>
  );
}
