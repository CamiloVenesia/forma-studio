import {
  ArrowUpRight,
  MapPin,
  MonitorPlay,
  Phone,
} from 'lucide-react';

import { Link } from 'react-router-dom';

import { ArrowLink } from '../components/common/ArrowLink';
import { Reveal } from '../components/common/Reveal';
import { SectionLabel } from '../components/common/SectionLabel';

import { site } from '../config/site';
import { gym } from '../data/gym';

const coachingSteps = [
  {
    number: '01',
    title: 'Contanos qué estás buscando',
    description:
      'Compartí tus objetivos, tu experiencia y el tipo de actividad que te interesa realizar.',
  },
  {
    number: '02',
    title: 'Revisamos tu punto de partida',
    description:
      'La información nos permite conocer tus preferencias, tus tiempos y la modalidad que te resulta más conveniente.',
  },
  {
    number: '03',
    title: 'Coordinamos cómo empezar',
    description:
      'Nos ponemos en contacto para conversar sobre las opciones disponibles y los próximos pasos.',
  },
];

const modalities = [
  {
    title: 'Entrenamiento presencial',
    text:
      'Para quienes prefieren acercarse al espacio de Forma Studio en Cruz Alta y consultar las actividades y horarios disponibles.',
    icon: MapPin,
    label: 'EN EL GIMNASIO',
  },
  {
    title: 'Entrenamiento online',
    text:
      'Una alternativa para quienes buscan organizar su entrenamiento desde otro lugar. Consultá cómo se desarrolla esta modalidad y qué necesitás para comenzar.',
    icon: MonitorPlay,
    label: 'A DISTANCIA',
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
            Tu objetivo. <br />
            <em>Tu entrenamiento.</em>
          </h1>

          <p>
            Cada persona llega con una historia, una rutina y
            objetivos diferentes. El primer paso es conocer qué
            estás buscando para conversar sobre una propuesta
            que se adapte a vos.
          </p>

          <div className="coaching-hero__actions">
            <ArrowLink to="/empezar">
              Quiero hacer una consulta
            </ArrowLink>

            <Link
              className="underlined-link"
              to="/nuestro-gimnasio"
            >
              Conocer el gimnasio
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <Reveal
          delay={0.12}
          className="coaching-hero__image"
        >
          <img
            src={site.images.detail}
            alt="Persona realizando una actividad física en un espacio de entrenamiento"
            loading="eager"
          />
        </Reveal>
      </section>

      <section className="commercial-coaching-process section-spacing">
        <div className="container commercial-coaching-process__grid">
          <Reveal>
            <SectionLabel number="02 /">
              CÓMO EMPEZAR
            </SectionLabel>

            <h2 className="display-title">
              Primero, <br />
              <em>conocerte.</em>
            </h2>

            <p>
              Queremos conocer tus necesidades antes de orientarte
              sobre las alternativas de entrenamiento disponibles.
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
        id="modalidades"
      >
        <div className="container">
          <Reveal>
            <SectionLabel number="03 /">
              MODALIDADES
            </SectionLabel>

            <h2 className="display-title">
              Elegí cómo <br />
              <em>querés entrenar.</em>
            </h2>

            <p className="commercial-section-intro">
              FORMA Studio ofrece alternativas presenciales y
              online. La disponibilidad, la organización y las
              condiciones de cada modalidad se conversan al
              realizar la consulta.
            </p>
          </Reveal>

          <div className="coaching-features__list">
            {modalities.map(
              ({ title, text, icon: Icon, label }, index) => (
                <Reveal
                  key={title}
                  delay={index * 0.08}
                >
                  <article>
                    <span>{label}</span>

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
              ENTRENAMIENTO PRESENCIAL
            </SectionLabel>

            <h2 className="display-title">
              Conocé el <br />
              <em>espacio.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p>
              El espacio de Forma Studio está ubicado
              en {gym.address}. Podés conocer la ubicación,
              consultar los horarios publicados y revisar las
              propuestas de actividad física en la sección del
              gimnasio.
            </p>

            <Link
              className="underlined-link"
              to="/nuestro-gimnasio"
            >
              Ver nuestro gimnasio
              <ArrowUpRight size={19} aria-hidden="true" />
            </Link>

            <p className="coaching-stage__disclaimer">
              Los horarios y la disponibilidad de actividades
              pueden variar. Confirmalos antes de acercarte.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="coaching-contact section-spacing">
        <div className="container coaching-contact__inner">
          <Reveal>
            <SectionLabel number="05 /">
              TU PRÓXIMO PASO
            </SectionLabel>

            <h2 className="display-title">
              Hablemos de <em>tus objetivos.</em>
            </h2>

            <p>
              Completá el formulario y contanos qué tipo de
              entrenamiento estás buscando. Nos pondremos en
              contacto para conversar sobre las opciones
              disponibles.
            </p>

            <div className="coaching-contact__actions">
              <ArrowLink to="/empezar">
                Completar formulario
              </ArrowLink>

              <a href={gym.phoneHref}>
                Consultar por teléfono
                <Phone size={16} aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}