import { ArrowUpRight, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

import { site } from '../../config/site';
import { gym } from '../../data/gym';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div>
          <span className="eyebrow eyebrow--muted">
            MOVIMIENTO A TU MANERA
          </span>

          <Link to="/" className="footer-brand">
            {site.brand.name.toLowerCase()}
            <i>.</i>
          </Link>

          <p>
            Tu proceso. Tu tiempo. Tu forma de moverte.
          </p>

          <a
            className="footer-location"
            href={gym.directionsUrl}
            target="_blank"
            rel="noreferrer"
          >
            <MapPin size={15} aria-hidden="true" />
            {gym.address}
          </a>

          <a
            className="footer-location"
            href={gym.phoneHref}
          >
            <Phone size={15} aria-hidden="true" />
            {gym.phone}
          </a>
        </div>

        <div className="footer-columns">
          <div>
            <span>EXPLORAR</span>

            <Link to="/programas">Programas</Link>

            <Link to="/asesoramiento">
              Asesoramiento
            </Link>

            <Link to="/nuestro-gimnasio">
              Nuestro gimnasio
            </Link>
          </div>

          <div>
            <span>INFORMACIÓN</span>

            <Link to="/empezar">
              Quiero entrenar
            </Link>

            <Link to="/privacidad">
              Privacidad
            </Link>

            <a
              href={gym.mapsUrl}
              target="_blank"
              rel="noreferrer"
            >
              Google Maps
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>

            <a href="#top">
              Volver arriba
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} {site.brand.name} STUDIO
        </span>

        <span>FUERZA · PILATES · MOVIMIENTO</span>

        <span>CRUZ ALTA · CÓRDOBA</span>
      </div>
    </footer>
  );
}