import { ArrowUpRight, CalendarDays, ChartNoAxesCombined, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/common/Reveal';
import { ArrowLink } from '../components/common/ArrowLink';
import { SectionLabel } from '../components/common/SectionLabel';
import { site } from '../config/site';

export function CoachingPage() {
  return (
    <>
      <section className="coaching-hero container">
        <Reveal>
          <SectionLabel number="01 /">TU ENTRENAMIENTO, TU ESPACIO</SectionLabel>
          <h1 className="display-title">
            Más cerca
            <br />
            de tu <em>proceso.</em>
          </h1>
          <p>
            Imaginamos una experiencia donde cada alumno pueda encontrar sus rutinas, explorar
            ejercicios y acompañar su progreso sin perder el foco.
          </p>
          <div className="coaching-hero__actions">
            <ArrowLink to="/espacio">Explorar la demo</ArrowLink>
            <span>ÁREA PRIVADA · EN DESARROLLO</span>
          </div>
        </Reveal>
        <Reveal delay={0.14} className="coaching-hero__image">
          <img
            src={site.images.detail}
            alt="Persona realizando una actividad física"
            loading="eager"
          />
        </Reveal>
      </section>
      <section className="coaching-features section-spacing">
        <div className="container">
          <Reveal>
            <SectionLabel number="02 /">UNA EXPERIENCIA MÁS PERSONAL</SectionLabel>
            <h2 className="display-title">
              Menos ruido.
              <br />
              <em>Más claridad.</em>
            </h2>
          </Reveal>
          <div className="coaching-features__list">
            <Reveal>
              <article>
                <span>01</span>
                <CalendarDays size={28} strokeWidth={1.3} />
                <h3>Tu rutina, organizada.</h3>
                <p>Un lugar para ver cada sesión y saber qué sigue en tu semana.</p>
              </article>
            </Reveal>
            <Reveal delay={0.1}>
              <article>
                <span>02</span>
                <Play size={28} strokeWidth={1.3} />
                <h3>Ejercicios explicados.</h3>
                <p>Indicaciones claras para comprender la propuesta antes de empezar.</p>
              </article>
            </Reveal>
            <Reveal delay={0.2}>
              <article>
                <span>03</span>
                <ChartNoAxesCombined size={28} strokeWidth={1.3} />
                <h3>El progreso a la vista.</h3>
                <p>Un registro simple para reconocer la constancia y mantener el rumbo.</p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="coaching-stage section-spacing">
        <div className="container coaching-stage__grid">
          <Reveal>
            <SectionLabel number="03 /">UNA IDEA QUE CRECE</SectionLabel>
            <h2 className="display-title">
              Una plataforma.
              <br />
              <em>Muchas posibilidades.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              La demostración de alumnos ya permite explorar una semana de rutinas ficticias y
              marcar sesiones como completadas. Más adelante, el acceso auténtico y el seguimiento
              se construirán con autenticación y datos privados por usuario.
            </p>
            <Link className="underlined-link" to="/espacio">
              Abrir espacio de demostración <ArrowUpRight size={19} />
            </Link>
            <p className="coaching-stage__disclaimer">
              Esta versión no incluye cuentas reales, guardado de progreso ni asesoramiento médico.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
