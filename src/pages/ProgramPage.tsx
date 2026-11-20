
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import { ArrowLink } from '../components/common/ArrowLink';
import { Reveal } from '../components/common/Reveal';
import { getProgram } from '../data/programs';
import { NotFoundPage } from './NotFoundPage';

export function ProgramPage() {
  const { slug } = useParams();
  const program = getProgram(slug);

  if (!program) return <NotFoundPage />;

  const [firstWord, ...rest] = program.name.split(' ');
  const disciplineQuery = `disciplina=${encodeURIComponent(program.discipline)}`;

  return (
    <>
      <section className="detail-hero container">
        <Reveal className="detail-hero__copy">
          <Link className="back-link" to="/programas">
            <ArrowLeft size={17} aria-hidden="true" />
            Volver al catálogo
          </Link>

          <span className="eyebrow">{program.eyebrow}</span>

          <h1 className="display-title">
            {firstWord}
            <br />
            <em>{rest.join(' ')}</em>
          </h1>

          <p>{program.shortDescription}</p>
          <p className="commercial-program-target">{program.forYou}</p>

          <ArrowLink to={`/empezar?${disciplineQuery}`}>
            Quiero conocer esta propuesta
          </ArrowLink>
        </Reveal>

        <Reveal delay={0.1} className="detail-hero__photo">
          <img src={program.detailImage} alt={program.detailImageAlt} loading="eager" />
        </Reveal>
      </section>

      <section className="detail-about section-spacing">
        <div className="container detail-about__grid">
          <Reveal>
            <span className="section-label">
              <span>01 /</span> PARA QUIÉN ES
            </span>

            <h2 className="display-title">
              Un punto de <br />
              <em>partida claro.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="detail-about__intro">{program.description}</p>

            <div className="detail-facts">
              <div>
                <span>NIVEL DE REFERENCIA</span>
                <b>{program.intensity}</b>
              </div>

              <div>
                <span>PLANIFICACIÓN</span>
                <b>{program.duration}</b>
              </div>

              <div>
                <span>MODALIDADES CONTEMPLADAS</span>
                <b>Online y presencial</b>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="detail-benefits section-spacing">
        <div className="container">
          <Reveal>
            <span className="section-label">
              <span>02 /</span> OBJETIVOS
            </span>

            <h2 className="display-title">
              Qué podés <br />
              <em>trabajar.</em>
            </h2>
          </Reveal>

          <div className="benefits-grid">
            {program.benefits.map((benefit, index) => (
              <Reveal key={benefit} delay={(index % 2) * 0.06}>
                <div className="benefit-line">
                  <span>0{index + 1}</span>
                  <h3>{benefit}</h3>
                  <Check size={20} aria-hidden="true" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="commercial-approach section-spacing">
        <div className="container commercial-approach__layout">
          <Reveal>
            <span className="section-label">
              <span>03 /</span> METODOLOGÍA
            </span>

            <h2 className="display-title">
              Con intención, <br />
              <em>paso a paso.</em>
            </h2>

            <p>
              Cada propuesta parte de conocer tus objetivos, experiencia y disponibilidad.
              Los ejercicios y progresiones se organizan según tus necesidades.
            </p>
          </Reveal>

          <div className="commercial-approach__steps">
            {program.approach.map((item, index) => (
              <Reveal key={item} delay={index * 0.07}>
                <div className="commercial-approach__step">
                  <span>0{index + 1}</span>
                  <p>{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="detail-week section-spacing">
        <div className="container detail-week__grid">
          <Reveal>
            <span className="section-label">
              <span>04 /</span> EJEMPLO DE ORGANIZACIÓN
            </span>

            <h2 className="display-title">
              Una semana, <br />
              <em>muchas formas.</em>
            </h2>

            <p>
              Estas sesiones muestran una posible organización semanal. Son orientativas y
              no reemplazan una planificación adaptada a cada persona.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="week-example">
              {program.sampleWeek.map((item, index) => (
                <div key={item}>
                  <span>0{index + 1}</span>
                  <strong>{item}</strong>
                  <ArrowUpRight size={17} aria-hidden="true" />
                </div>
              ))}
            </div>

            <p className="week-example__note">
              EJEMPLO ORIENTATIVO · NO ES UNA RUTINA PERSONALIZADA
            </p>
          </Reveal>
        </div>
      </section>

      <section className="commercial-modality section-spacing">
        <div className="container">
          <Reveal>
            <span className="section-label">
              <span>05 /</span> ELEGÍ CÓMO EMPEZAR
            </span>

            <h2 className="display-title">
              Tu tiempo. <br />
              <em>Tu modalidad.</em>
            </h2>

            <p className="commercial-modality__intro">
              Podés consultarnos por entrenamiento online o presencial. Los horarios, lugares
              y condiciones se confirman al conversar con FORMA Studio.
            </p>
          </Reveal>

          <div className="commercial-modality__options">
            <Reveal>
              <div className="commercial-modality__option">
                <span>01 / DESDE DONDE ESTÉS</span>

                <h3>Online</h3>

                <p>
                  Consultá por propuestas para entrenar desde casa o desde un gimnasio,
                  de acuerdo con tu espacio, equipamiento y disponibilidad.
                </p>

                <ArrowLink
                  to={`/empezar?${disciplineQuery}&modalidad=online`}
                  variant="text"
                >
                  Elegir online
                </ArrowLink>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="commercial-modality__option">
                <span>02 / EN UN ESPACIO FÍSICO</span>

                <h3>Presencial</h3>

                <p>
                  Consultá por las opciones presenciales, su ubicación, horarios
                  y disponibilidad.
                </p>

                <ArrowLink
                  to={`/empezar?${disciplineQuery}&modalidad=presencial`}
                  variant="text"
                >
                  Elegir presencial
                </ArrowLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="program-cta">
        <div className="container">
          <Reveal>
            <span className="eyebrow">PRIMER PASO · CONOCERNOS</span>

            <h2 className="display-title">
              ¿Lo vemos <br />
              <em>juntos?</em>
            </h2>

            <p>
              Completá la solicitud con tus objetivos y preferencias. Recibiremos tus respuestas
              y podremos ponernos en contacto por WhatsApp o teléfono para orientarte.
            </p>

            <ArrowLink to={`/empezar?${disciplineQuery}`}>
              Quiero entrenar
            </ArrowLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
