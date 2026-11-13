import { ArrowLink } from '../common/ArrowLink';
import { Reveal } from '../common/Reveal';

export function FinalCta() {
  return (
    <section className="final-cta">
      <div className="container final-cta__inner">
        <Reveal>
          <span className="eyebrow">EL MOMENTO ES AHORA</span>
          <h2>
            Tu mejor versión
            <br />
            no se encuentra.
            <br />
            <em>Se construye.</em>
          </h2>
          <p>Empezá por algo simple: conocernos y encontrar un plan que encaje en tu vida.</p>
          <ArrowLink to="/empezar" variant="light">
            Quiero empezar
          </ArrowLink>
        </Reveal>
      </div>
      <span className="final-cta__watermark" aria-hidden="true">
        forma.
      </span>
    </section>
  );
}
