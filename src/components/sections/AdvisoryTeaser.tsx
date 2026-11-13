import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Reveal } from '../common/Reveal';
import { SectionLabel } from '../common/SectionLabel';

export function AdvisoryTeaser() {
  return (
    <section className="advisory section-spacing" id="asesoramiento">
      <div className="container advisory__layout">
        <Reveal className="advisory__copy">
          <SectionLabel number="04 /">UNA PROPUESTA A TU MEDIDA</SectionLabel>
          <h2 className="display-title">
            Empezar por <br />
            <em>conocerte.</em>
          </h2>
          <p>
            El acompañamiento comienza con una conversación: qué querés lograr, cuánto tiempo tenés
            y cómo te gusta entrenar. Una propuesta clara se construye a partir de esas respuestas.
          </p>
          <Link to="/asesoramiento" className="underlined-link">
            Conocer el asesoramiento
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </Reveal>

        <Reveal delay={0.1} className="advisory__preview">
          <div className="preview-sheet" aria-label="Vista ilustrativa del proceso">
            <div className="preview-sheet__top">
              <span>FORMA / PRIMEROS PASOS</span>
              <span>01 — 03</span>
            </div>
            <div className="preview-sheet__greeting">
              Un plan <br />
              <em>que te acompañe.</em>
            </div>
            <div className="preview-sheet__row">
              <span>01</span>
              <strong>Tu objetivo</strong>
              <span>CONOCER</span>
            </div>
            <div className="preview-sheet__row">
              <span>02</span>
              <strong>Tu disponibilidad</strong>
              <span>ORGANIZAR</span>
            </div>
            <div className="preview-sheet__row">
              <span>03</span>
              <strong>Tu modalidad</strong>
              <span>ELEGIR</span>
            </div>
            <div className="preview-sheet__bottom">
              EJEMPLO DE RECORRIDO · NO ES UN SERVICIO ACTIVO
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
