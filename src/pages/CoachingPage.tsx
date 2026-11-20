
import {
  ArrowUpRight,
  BookOpenText,
  CalendarDays,
  ChartNoAxesCombined,
} from 'lucide-react';

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
      'Conversamos sobre tus objetivos, experiencia, disponibilidad y preferencias de entrenamiento.',
  },
  {
    number: '02',
    title: 'Organizar el entrenamiento',
    description:
      'Exploramos las opciones de fuerza y pilates, junto con la modalidad que mejor se adapte a vos.',
  },
  {
    number: '03',
    title: 'Acompañar tu proceso',
    description:
      'La propuesta de entrenamiento y las condiciones de seguimiento se conversan según tus necesidades.',
  },
];

const trainingTools = [
  {
    title: 'Sesiones organizadas',
    text:
      'Explorá ejemplos de sesiones de fuerza y pilates para conocer diferentes formas de entrenar.',
    icon: CalendarDays,
  },
  {
    title: 'Biblioteca de ejercicios',
    text:
      'Consultá movimientos, indicaciones generales y ejercicios organizados por disciplina.',
    icon: BookOpenText,
  },
  {
    title: 'Registro de actividad',
    text:
      'Marcá sesiones completadas y consultá tu progreso en el dispositivo que estés utilizando.',
    icon: ChartNoAxesCombined,
  },
];

export function CoachingPage() {
  return (
    <>
      <section className="coaching-hero container">
        <Reveal>
          <SectionLabel number="01 /">
            ASESORAMIENTO PERSONALIZADO
          </SectionLabel>

          <h1 className="display-title">
            Tu objetivo.
            <br />
            <em>Un camino propio.</em>
          </h1>

          <p>
            Cada persona tiene sus propios objetivos,
            tiempos y experiencias. Por eso,
            antes de comenzar, queremos conocer
            qué necesitás y cómo te gustaría entrenar.
          </p>

          <div className="coaching-hero__actions">
            <ArrowLink to="/empezar">
              Quiero empezar
            </ArrowLink>

            <span>
              FUERZA · PILATES · ONLINE Y PRESENCIAL
            </span>
          </div>
        </Reveal>

        <Reveal
          delay={0.12}
          className="coaching-hero__image"
        >
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
            <SectionLabel number="02 /">
              CÓMO EMPEZAMOS
            </SectionLabel>

            <h2 className="display-title">
              Primero
              <br />
              <em>escucharte.</em>
            </h2>

            <p>
              Para encontrar una propuesta adecuada,
              empezamos por conocerte. Tu experiencia,
              disponibilidad y preferencias nos ayudan
              a comprender qué buscás.
            </p>
          </Reveal>

          <div className="commercial-coaching-process__steps">
            {coachingSteps.map((step, index) => (
              <Reveal
                key={step.number}
                delay={index * 0.07}
              >
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

      <section
        className="coaching-features section-spacing"
        id="herramientas"
      >
        <div className="container">
          <Reveal>
            <SectionLabel number="03 /">
              RECURSOS PARA MOVERTE
            </SectionLabel>

            <h2 className="display-title">
              El movimiento,
              <br />
              <em>a tu alcance.</em>
            </h2>

            <p className="commercial-section-intro">
              En nuestra sección de rutinas podés
              explorar sesiones de fuerza y pilates,
              descubrir ejercicios y llevar un
              registro sencillo de las sesiones
              que completaste.
            </p>
          </Reveal>

          <div className="coaching-features__list">
            {trainingTools.map(
              ({ title, text, icon: Icon }, index) => (
                <Reveal
                  key={title}
                  delay={index * 0.07}
                >
                  <article>
                    <span>
                      0{index + 1} / RECURSOS
                    </span>

                    <Icon
                      size={29}
                      strokeWidth={1.3}
                      aria-hidden="true"
                    />

                    <h3>{title}</h3>
                    <p>{text}</p>
                  </article>
                </Reveal>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="coaching-stage section-spacing">
        <div className="container coaching-stage__grid">
          <Reveal>
            <SectionLabel number="04 /">
              RUTINAS Y EJERCICIOS
            </SectionLabel>

            <h2 className="display-title">
              Descubrí
              <br />
              <em>nuevos movimientos.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p>
              Explorá sesiones de fuerza y pilates,
              consultá las indicaciones de los
              ejercicios y registrá las sesiones
              completadas desde tu navegador.
            </p>

            <Link
              className="underlined-link"
              to="/espacio"
            >
              Explorar rutinas
              <ArrowUpRight
                size={19}
                aria-hidden="true"
              />
            </Link>

            <p className="coaching-stage__disclaimer">
              Las rutinas disponibles son ejemplos
              generales de entrenamiento. No reemplazan
              una evaluación profesional ni constituyen
              un plan personalizado. El progreso
              permanece en tu navegador y no se
              sincroniza con un entrenador.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
