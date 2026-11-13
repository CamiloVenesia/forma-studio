import { Reveal } from '../common/Reveal';
import { SectionLabel } from '../common/SectionLabel';

export function Philosophy() {
  return (
    <section className="philosophy section-spacing" id="enfoque">
      <div className="container philosophy__grid">
        <Reveal>
          <SectionLabel number="01 /">NUESTRA MIRADA</SectionLabel>
        </Reveal>
        <div>
          <Reveal>
            <h2 className="display-title philosophy__title">
              El movimiento
              <br />
              no tiene una
              <br />
              <em>única forma.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="philosophy__bottom">
              <p>
                Creemos en entrenamientos que se ajustan a la vida real. A tus horarios, tu
                experiencia y todo eso que te hace única. Sin fórmulas mágicas. Con dirección,
                atención y constancia.
              </p>
              <span className="philosophy__symbol" aria-hidden="true">
                (F)
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
