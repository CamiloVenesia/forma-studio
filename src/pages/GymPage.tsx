import {
  ArrowUpRight,
  Clock3,
  ExternalLink,
  MapPin,
  Phone,
  Star,
} from 'lucide-react';

import { ArrowLink } from '../components/common/ArrowLink';
import { Reveal } from '../components/common/Reveal';
import { SectionLabel } from '../components/common/SectionLabel';
import { gym } from '../data/gym';

export function GymPage() {
  return (
    <div className="gym-page">
      {/* HERO */}

      <section className="gym-hero">
        <div className="container gym-hero__grid">
          <Reveal className="gym-hero__copy">
            <SectionLabel number="01 /">
              Forma Studio · CRUZ ALTA
            </SectionLabel>

            <h1 className="display-title">
              Conocé nuestras
              <br />
              <em>instalaciones.</em>
            </h1>

            <p>
              Un espacio para entrenar, moverte y trabajar sobre tus
              objetivos. Conocé la propuesta de entrenamiento funcional
              y Pilates Reformer en Cruz Alta.
            </p>

            <div className="gym-hero__actions">
              <ArrowLink to="/empezar">
                Quiero entrenar
              </ArrowLink>

              <a
                className="gym-text-link"
                href={gym.directionsUrl}
                target="_blank"
                rel="noreferrer"
              >
                Cómo llegar
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>

            <div className="gym-hero__address">
              <MapPin size={17} aria-hidden="true" />
              <span>{gym.address}</span>
            </div>
          </Reveal>

          <Reveal className="gym-hero__visual" delay={0.12}>
            <img
              src={gym.equipmentImages[0].image}
              alt={gym.equipmentImages[0].alt}
              fetchPriority="high"
            />

            <div className="gym-hero__visual-caption">
              <span>UN ESPACIO PARA MOVERTE</span>
              <strong>Fuerza · Pilates · Movimiento</strong>
            </div>

            <span
              className="gym-hero__visual-index"
              aria-hidden="true"
            >
              01 <i>/ 03</i>
            </span>
          </Reveal>
        </div>
      </section>

      {/* INFORMACIÓN DESTACADA */}

      <section
        className="gym-facts"
        aria-label="Información destacada"
      >
        <div className="container gym-facts__grid">
          <div className="gym-fact">
            <span className="gym-fact__label">
              VALORACIÓN EN GOOGLE
            </span>

            <strong>
              {gym.rating}<small>/5</small>
            </strong>

            <span className="gym-fact__detail">
              <Star
                size={14}
                fill="currentColor"
                aria-hidden="true"
              />
              {gym.reviewCount} reseñas
            </span>
          </div>

          <div className="gym-fact">
            <span className="gym-fact__label">
              UBICACIÓN
            </span>

            <strong>Cruz Alta</strong>

            <span className="gym-fact__detail">
              Córdoba, Argentina
            </span>
          </div>

          <div className="gym-fact">
            <span className="gym-fact__label">
              HORARIO PUBLICADO
            </span>

            <strong>08:00–21:00</strong>

            <span className="gym-fact__detail">
              Lunes a jueves
            </span>
          </div>

          <div className="gym-fact">
            <span className="gym-fact__label">
              CONTACTO
            </span>

            <strong>Hablemos</strong>

            <a
              className="gym-fact__detail"
              href={gym.phoneHref}
            >
              {gym.phone}
            </a>
          </div>
        </div>
      </section>

      {/* PRESENTACIÓN */}

      <section className="gym-intro section-spacing">
        <div className="container gym-intro__grid">
          <Reveal>
            <SectionLabel number="02 /">
              EL ESPACIO
            </SectionLabel>

            <h2 className="display-title">
              Un lugar para
              <br />
              <em>entrenar mejor.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="gym-intro__copy">
            <p>
              Forma Studio es un centro de entrenamiento
              ubicado en Av. San Martín 748, en Cruz Alta. La
              información pública del establecimiento lo identifica
              como un espacio de actividad física con propuestas de
              entrenamiento funcional y Pilates Reformer.
            </p>

            <p>
              La modalidad, los horarios disponibles y las
              características de cada actividad se coordinan
              directamente con el equipo del establecimiento.
            </p>

            <a
              href={gym.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="gym-inline-link"
            >
              Ver ficha en Google Maps
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* DISCIPLINAS */}

      <section className="gym-disciplines section-spacing">
        <div className="container">
          <Reveal className="gym-section-heading">
            <SectionLabel number="03 /">
              PROPUESTAS DE ENTRENAMIENTO
            </SectionLabel>

            <h2 className="display-title">
              Distintas formas
              <br />
              <em>de moverte.</em>
            </h2>

            <p>
              Conocé algunas referencias visuales de las disciplinas
              y tipos de trabajo vinculados a la propuesta del
              establecimiento.
            </p>
          </Reveal>

          <div className="gym-disciplines__grid">
            {gym.disciplines.map((discipline, index) => (
              <Reveal
                key={discipline.number}
                delay={index * 0.07}
                className={`gym-discipline-card ${discipline.className}`}
              >
                <div className="gym-discipline-card__image">
                  <img
                    src={discipline.image}
                    alt={discipline.imageAlt}
                    loading="lazy"
                  />

                  <span>{discipline.number}</span>
                </div>

                <div className="gym-discipline-card__content">
                  <span>{discipline.eyebrow}</span>

                  <h3>{discipline.title}</h3>

                  <p>{discipline.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="gym-image-disclaimer">
            Las fotografías son ilustrativas y provienen de bancos
            de imágenes. No representan necesariamente las
            instalaciones, las máquinas ni los elementos reales
            del gimnasio.
          </p>
        </div>
      </section>

      {/* MÁQUINAS Y ELEMENTOS */}

      <section className="gym-equipment section-spacing">
        <div className="container gym-equipment__grid">
          <Reveal className="gym-equipment__visual">
            <div className="gym-equipment__main-image">
              <img
                src={gym.equipmentImages[1].image}
                alt={gym.equipmentImages[1].alt}
                loading="lazy"
              />
            </div>

            <div className="gym-equipment__secondary-image">
              <img
                src={gym.equipmentImages[2].image}
                alt={gym.equipmentImages[2].alt}
                loading="lazy"
              />
            </div>

            <span className="gym-equipment__stamp">
              FORMA / MOVIMIENTO
            </span>
          </Reveal>

          <Reveal
            className="gym-equipment__copy"
            delay={0.1}
          >
            <SectionLabel number="04 /">
              MÁQUINAS Y ELEMENTOS
            </SectionLabel>

            <h2 className="display-title">
              Herramientas para
              <br />
              <em>cada movimiento.</em>
            </h2>

            <p>
              La propuesta pública menciona Pilates Reformer y
              entrenamiento funcional. El equipamiento específico
              disponible —máquinas, pesas y accesorios— puede variar
              según la actividad y debe confirmarse directamente
              con el establecimiento.
            </p>

            <p>
              Si estás por comenzar, podés consultar qué elementos
              se utilizan, qué necesitás llevar y qué opciones se
              adaptan a tu experiencia.
            </p>

            <a
              className="gym-inline-link"
              href={gym.phoneHref}
            >
              Consultar equipamiento
              <Phone size={16} aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ACOMPAÑAMIENTO PROFESIONAL */}

      <section className="gym-coaching section-spacing">
        <div className="container gym-coaching__grid">
          <Reveal>
            <SectionLabel number="05 /">
              ACOMPAÑAMIENTO
            </SectionLabel>

            <h2 className="display-title">
              Entrenar con
              <br />
              <em>orientación.</em>
            </h2>
          </Reveal>

          <Reveal
            className="gym-coaching__copy"
            delay={0.1}
          >
            <p>
              La información pública presenta al establecimiento
              como un espacio de entrenamiento guiado. Antes de
              comenzar, es importante conversar sobre tus objetivos,
              tu experiencia y la modalidad que estás buscando.
            </p>

            <p>
              Para conocer quiénes están a cargo de cada actividad,
              su formación y la disponibilidad de clases, podés
              comunicarte directamente con el gimnasio.
            </p>

            <ArrowLink to="/empezar">
              Contarles qué estoy buscando
            </ArrowLink>
          </Reveal>
        </div>
      </section>

      {/* INFORMACIÓN PRÁCTICA */}

      <section className="gym-information section-spacing">
        <div className="container">
          <Reveal className="gym-section-heading">
            <SectionLabel number="06 /">
              INFORMACIÓN PRÁCTICA
            </SectionLabel>

            <h2 className="display-title">
              Antes de
              <br />
              <em>venir.</em>
            </h2>
          </Reveal>

          <div className="gym-information__grid">
            <Reveal className="gym-information-card">
              <Clock3
                size={25}
                strokeWidth={1.4}
                aria-hidden="true"
              />

              <span>HORARIOS PUBLICADOS</span>

              <h3>Cuándo acercarte</h3>

              {gym.hours.map((item) => (
                <div
                  className="gym-hours-row"
                  key={item.days}
                >
                  <strong>{item.days}</strong>
                  <span>{item.time}</span>
                </div>
              ))}

              <p>
                Para otros días y horarios especiales,
                consultá disponibilidad.
              </p>
            </Reveal>

            <Reveal
              className="gym-information-card"
              delay={0.07}
            >
              <MapPin
                size={25}
                strokeWidth={1.4}
                aria-hidden="true"
              />

              <span>UBICACIÓN</span>

              <h3>Cómo llegar</h3>

              <p>{gym.address}</p>

              <a
                href={gym.directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="gym-inline-link"
              >
                Abrir indicaciones
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </Reveal>

            <Reveal
              className="gym-information-card"
              delay={0.14}
            >
              <Phone
                size={25}
                strokeWidth={1.4}
                aria-hidden="true"
              />

              <span>CONTACTO</span>

              <h3>Hacé tu consulta</h3>

              <p>
                Comunicate para consultar actividades, cupos,
                horarios y disponibilidad.
              </p>

              <a
                href={gym.phoneHref}
                className="gym-inline-link"
              >
                {gym.phone}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* RESEÑAS DE GOOGLE */}

      <section className="gym-reviews section-spacing">
        <div className="container gym-reviews__grid">
          <Reveal>
            <SectionLabel number="07 /">
              OPINIONES EN GOOGLE
            </SectionLabel>

            <h2 className="display-title">
              La experiencia
              <br />
              <em>de quienes ya fueron.</em>
            </h2>

            <p>
              La ficha pública del establecimiento cuenta con
              una valoración de {gym.rating} sobre 5, basada en{' '}
              {gym.reviewCount} reseñas.
            </p>
          </Reveal>

          <Reveal
            className="gym-reviews__score"
            delay={0.1}
          >
            <span className="gym-reviews__score-label">
              VALORACIÓN EN GOOGLE
            </span>

            <strong>{gym.rating}</strong>

            <div
              className="gym-reviews__stars"
              aria-label="Valoración de 5 estrellas"
            >
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  size={19}
                  fill="currentColor"
                  aria-hidden="true"
                />
              ))}
            </div>

            <span>
              {gym.reviewCount} reseñas públicas
            </span>

            <div className="gym-reviews__actions">
              <a
                href={gym.reviewsUrl}
                target="_blank"
                rel="noreferrer"
              >
                Dejar una reseña
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>

              <a
                href={gym.mapsUrl}
                target="_blank"
                rel="noreferrer"
              >
                Ver en Google Maps
                <ExternalLink size={15} aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* UBICACIÓN Y MAPA */}

      <section
        className="gym-location section-spacing"
        id="ubicacion"
      >
        <div className="container gym-location__heading">
          <Reveal>
            <SectionLabel number="08 /">
              DÓNDE ESTAMOS
            </SectionLabel>

            <h2 className="display-title">
              Encontranos en
              <br />
              <em>Cruz Alta.</em>
            </h2>

            <p>{gym.address}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <a
              className="gym-location__directions"
              href={gym.directionsUrl}
              target="_blank"
              rel="noreferrer"
            >
              Cómo llegar
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        <div className="container gym-location__map-wrap">
          <iframe
            className="gym-location__map"
            src={gym.mapEmbedUrl}
            title={`Ubicación de ${gym.name} en Google Maps`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>

      {/* CTA FINAL */}

      <section className="gym-final-cta">
        <div className="container gym-final-cta__inner">
          <Reveal>
            <SectionLabel number="09 /">
              TU PRÓXIMO PASO
            </SectionLabel>

            <h2 className="display-title">
              ¿Querés empezar
              <br />
              <em>a entrenar?</em>
            </h2>

            <p>
              Contanos qué estás buscando y coordiná una consulta
              para conocer las opciones disponibles.
            </p>

            <div className="gym-final-cta__actions">
              <ArrowLink to="/empezar">
                Quiero entrenar
              </ArrowLink>

              <a href={gym.phoneHref}>
                Llamar al gimnasio
                <Phone size={16} aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}