import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '../common/Reveal';
import { SectionLabel } from '../common/SectionLabel';

export function AdvisoryTeaser() {
  return (
    <section className="advisory section-spacing">
      <div className="container advisory__layout">
        <Reveal className="advisory__copy">
          <SectionLabel number="04 /">EL PRÓXIMO CAPÍTULO</SectionLabel>
          <h2 className="display-title">
            Algo más
            <br />
            <em>personal.</em>
          </h2>
          <p>
            Estamos diseñando un espacio para que rutinas, ejercicios y seguimiento estén reunidos
            en una experiencia simple, clara y realmente tuya.
          </p>
          <Link to="/asesoramiento" className="underlined-link">
            Conocé el concepto <ArrowUpRight size={18} />
          </Link>
        </Reveal>
        <Reveal delay={0.1} className="advisory__preview">
          <div className="preview-sheet">
            <div className="preview-sheet__top">
              <span>FORMA / TU ESPACIO</span>
              <span>◉ ◉ ◉</span>
            </div>
            <div className="preview-sheet__greeting">
              Buen día,
              <br />
              <em>¿nos movemos?</em>
            </div>
            <div className="preview-sheet__progress">
              <span>PROGRESO SEMANAL</span>
              <b>
                02 <small>/ 03</small>
              </b>
              <div>
                <span />
              </div>
            </div>
            <div className="preview-sheet__row">
              <span>01</span>
              <strong>Fuerza · Base</strong>
              <span>COMPLETADO</span>
            </div>
            <div className="preview-sheet__row">
              <span>02</span>
              <strong>Pilates · Flow</strong>
              <span>COMPLETADO</span>
            </div>
            <div className="preview-sheet__row">
              <span>03</span>
              <strong>Fuerza · Global</strong>
              <span>PENDIENTE</span>
            </div>
            <div className="preview-sheet__bottom">UNA VISTA DEL FUTURO ESPACIO DE ALUMNOS</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
