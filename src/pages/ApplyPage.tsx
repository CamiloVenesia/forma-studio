
import { IntakeWizard } from '../features/intake/IntakeWizard';
import { Reveal } from '../components/common/Reveal';
import { SectionLabel } from '../components/common/SectionLabel';

export function ApplyPage() {
  return (
    <section className="apply-page">
      <div className="container apply-page__layout">
        <Reveal className="apply-page__intro">
          <SectionLabel number="01 /">QUIERO ENTRENAR</SectionLabel>

          <h1 className="display-title">
            Todo gran
            <br />
            cambio tiene
            <br />
            <em>un comienzo.</em>
          </h1>

          <p>
            Contanos sobre tus objetivos, tu experiencia y tus preferencias. Con esa información
            podemos conocer mejor lo que necesitás y preparar una propuesta acorde a vos.
          </p>

          <div className="apply-page__sidebar-note">
            <span>UN RECORRIDO EN 5 ETAPAS</span>
            <p>
              Son 15 preguntas para conocer tu punto de partida. Podés revisar todas tus respuestas
              antes de preparar la solicitud.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="apply-page__form">
          <IntakeWizard />
        </Reveal>
      </div>
    </section>
  );
}
