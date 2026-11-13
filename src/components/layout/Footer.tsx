import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { site } from '../../config/site';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div>
          <span className="eyebrow eyebrow--muted">MOVIMIENTO A TU MANERA</span>
          <Link to="/" className="footer-brand">
            {site.brand.name.toLowerCase()}
            <i>.</i>
          </Link>
          <p>Tu proceso. Tu tiempo. Tu forma de moverte.</p>
        </div>
        <div className="footer-columns">
          <div>
            <span>EXPLORAR</span>
            <Link to="/programas">Programas</Link>
            <Link to="/asesoramiento">Asesoramiento</Link>
            <Link to="/espacio">Espacio alumno</Link>
          </div>
          <div>
            <span>INFORMACIÓN</span>
            <Link to="/empezar">Empezar</Link>
            <Link to="/privacidad">Privacidad</Link>
            <a href="#top">
              Volver arriba <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} {site.brand.name} STUDIO
        </span>
        <span>PROYECTO CONCEPTUAL PARA PORTFOLIO · SIN VÍNCULO CON PROFESIONALES REALES</span>
        <span>DISEÑADO MOBILE-FIRST</span>
      </div>
    </footer>
  );
}
