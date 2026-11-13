import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getProgram } from '../data/programs';
import { Reveal } from '../components/common/Reveal';
import { ArrowLink } from '../components/common/ArrowLink';
import { NotFoundPage } from './NotFoundPage';

export function ProgramPage() {
  const { slug } = useParams();
  const program = getProgram(slug);
  if (!program) return <NotFoundPage />;

  return (
    <>
      <section className="detail-hero container">
        <Reveal className="detail-hero__copy">
          <Link className="back-link" to="/programas">
            <ArrowLeft size={16} /> Volver a programas
          </Link>
          <span className="eyebrow">{program.eyebrow} — ONLINE Y PRESENCIAL</span>
          <h1 className="display-title">
            {program.name.split(' ')[0]}
            <br />
            <em>{program.name.split(' ').slice(1).join(' ')}</em>
          </h1>
          <p>{program.shortDescription}</p>
          <ArrowLink to={`/empezar?disciplina=${program.discipline}`}>Quiero conocer más</ArrowLink>
        </Reveal>
        <Reveal delay={0.12} className="detail-hero__photo">
          <img src={program.image} alt={program.imageAlt} loading="eager" />
        </Reveal>
      </section>
      <section className="detail-about section-spacing">
        <div className="container detail-about__grid">
          <Reveal>
            <span className="section-label">
              <span>01 /</span> LA PROPUESTA
            </span>
            <h2 className="display-title">
              Cada paso
              <br />
              <em>cuenta.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="detail-about__intro">{program.description}</p>
            <div className="detail-facts">
              <div>
                <span>NIVEL</span>
                <b>{program.intensity}</b>
              </div>
              <div>
                <span>DURACIÓN</span>
                <b>{program.duration}</b>
              </div>
              <div>
                <span>MODALIDAD</span>
                <b>Online / presencial</b>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="detail-benefits section-spacing">
        <div className="container">
          <Reveal>
            <span className="section-label">
              <span>02 /</span> QUÉ TRABAJAMOS
            </span>
            <h2 className="display-title">
              El valor está
              <br />
              <em>en el proceso.</em>
            </h2>
          </Reveal>
          <div className="benefits-grid">
            {program.benefits.map((benefit, i) => (
              <Reveal key={benefit} delay={i * 0.06}>
                <div className="benefit-line">
                  <span>0{i + 1}</span>
                  <h3>{benefit}</h3>
                  <Check size={20} aria-hidden="true" />
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
              <span>03 /</span> UNA SEMANA POSIBLE
            </span>
            <h2 className="display-title">
              Un vistazo
              <br />
              <em>al recorrido.</em>
            </h2>
            <p>
              Este ejemplo es ilustrativo; las sesiones reales deben ajustarse a la evaluación y al
              criterio del profesional.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="week-example">
              {program.sampleWeek.map((item, i) => (
                <div key={item}>
                  <span>0{i + 1}</span>
                  <strong>{item}</strong>
                  <ArrowUpRight size={17} aria-hidden="true" />
                </div>
              ))}
            </div>
            <p className="week-example__note">
              EJEMPLO ORIENTATIVO · NO ES UNA PRESCRIPCIÓN INDIVIDUAL
            </p>
          </Reveal>
        </div>
      </section>
      <section className="program-cta">
        <div className="container">
          <Reveal>
            <span className="eyebrow">TU CAMINO COMIENZA ACÁ</span>
            <h2 className="display-title">
              ¿Lo hacemos
              <br />
              <em>posible?</em>
            </h2>
            <p>{program.forYou}</p>
            <ArrowLink to={`/empezar?disciplina=${program.discipline}`}>
              Empezar mi consulta
            </ArrowLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
