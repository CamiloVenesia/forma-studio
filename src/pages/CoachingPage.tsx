import { ArrowUpRight, BookOpenText, CalendarDays, ChartNoAxesCombined } from 'lucide-react';
import { Link } from 'react-router-dom';

import { ArrowLink } from '../components/common/ArrowLink';
import { Reveal } from '../components/common/Reveal';
import { SectionLabel } from '../components/common/SectionLabel';
import { site } from '../config/site';

const coachingSteps = [
  {
    number: '01',
    title: 'Conocer tu punto de partida',
    description:
      'Objetivos, experiencia, horarios y recursos para explorar una propuesta coherente.',
  },
  {
    number: '02',
    title: 'Organizar el entrenamiento',
    description: 'Elegir una modalidad y pensar cómo podrían distribuirse las sesiones.',
  },
  {
    number: '03',
    title: 'Acompañar el proceso',
    description: 'Revisar constancia y avances con la frecuencia que acuerde cada profesional.',
  },
];

const futureTools = [
  {
    title: 'Rutinas organizadas',
    text: 'Un espacio privado para consultar sesiones y ejercicios asignados.',
    icon: CalendarDays,
  },
  {
    title: 'Biblioteca de ejercicios',
    text: 'Indicaciones y recursos de consulta cuando se incorpore contenido propio.',
    icon: BookOpenText,
  },
  {
    title: 'Seguimiento visual',
    text: 'Un registro de actividad para comprender la evolución del alumno.',
    icon: ChartNoAxesCombined,
  },
];

export function CoachingPage() {
  return (
    <>
      <section className="coaching-hero container">
        <Reveal>
          <SectionLabel number="01 /">ASESORAMIENTO PERSONALIZADO</SectionLabel>
          <h1 className="display-title">
            Tu objetivo. <br />
            <em>Un camino propio.</em>
          </h1>
          <p>
            La mejor propuesta de entrenamiento empieza por entender a la persona. FORMA muestra
            cómo un profesional podría presentar su servicio de asesoramiento con claridad y
            cercanía.
          </p>
          <div className="coaching-hero__actions">
            <ArrowLink to="/empezar">Explorar la consulta</ArrowLink>
            <span>RECORRIDO DEMOSTRATIVO · SIN ENVÍO DE DATOS</span>
          </div>
        </Reveal>
        <Reveal delay={0.12} className="coaching-hero__image">
          <img
            src={site.images.detail}
            alt="Entrenamiento físico en un entorno interior"
            loading="eager"
          />
        </Reveal>
      </section>

      <section className="commercial-coaching-process section-spacing">
        <div className="container commercial-coaching-process__grid">
          <Reveal>
            <SectionLabel number="02 /">CÓMO PODRÍA FUNCIONAR</SectionLabel>
            <h2 className="display-title">
              Primero <br />
              <em>escucharte.</em>
            </h2>
            <p>
              Un ejemplo del recorrido comercial que podrá adaptarse al método real de cada
              preparador físico o estudio de pilates.
            </p>
          </Reveal>
          <div className="commercial-coaching-process__steps">
            {coachingSteps.map((step, index) => (
              <Reveal key={step.number} delay={index * 0.07}>
                <div className="commercial-coaching-process__step">
                  <span>{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="coaching-features section-spacing" id="herramientas">
        <div className="container">
          <Reveal>
            <SectionLabel number="03 /">UNA PLATAFORMA EN PROYECTO</SectionLabel>
            <h2 className="display-title">
              El seguimiento, <br />
              <em>en un solo lugar.</em>
            </h2>
            <p className="commercial-section-intro">
              Además de la web comercial, FORMA prepara una futura experiencia privada para alumnos.
              Estas herramientas no están disponibles como servicio real en esta versión.
            </p>
          </Reveal>
          <div className="coaching-features__list">
            {futureTools.map(({ title, text, icon: Icon }, index) => (
              <Reveal key={title} delay={index * 0.07}>
                <article>
                  <span>0{index + 1} / CONCEPTO</span>
                  <Icon size={29} strokeWidth={1.3} aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="coaching-stage section-spacing">
        <div className="container coaching-stage__grid">
          <Reveal>
            <SectionLabel number="04 /">EXPERIENCIA INTERACTIVA</SectionLabel>
            <h2 className="display-title">
              Probá el <br />
              <em>espacio alumno.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p>
              Podés recorrer rutinas de ejemplo, consultar indicaciones y marcar sesiones
              completadas. Todo funciona únicamente en memoria, con información ficticia y sin crear
              una cuenta.
            </p>
            <Link className="underlined-link" to="/espacio">
              Abrir demostración del alumno
              <ArrowUpRight size={19} aria-hidden="true" />
            </Link>
            <p className="coaching-stage__disclaimer">
              Sin usuarios reales, almacenamiento de progreso, videos propios ni seguimiento
              profesional integrado.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
