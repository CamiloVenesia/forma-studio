import { IntakeWizard } from '../features/intake/IntakeWizard';
import { Reveal } from '../components/common/Reveal';
import { SectionLabel } from '../components/common/SectionLabel';

export function ApplyPage() {
  return (
    <section className="apply-page">
      <div className="container apply-page__layout">
        <Reveal className="apply-page__intro">
          <SectionLabel number="01 /">EMPEZAR CON INTENCIÓN</SectionLabel>

          <h1 className="display-title">
            Todo gran
            <br />
            cambio tiene
            <br />
            <em>un comienzo.</em>
          </h1>

          <p>
            Cada persona tiene objetivos, tiempos y experiencias diferentes. Descubrí qué modalidad
            se adapta mejor a vos y organizá tus preferencias de entrenamiento.
          </p>

          <div className="apply-page__sidebar-note">
            <span>TU PUNTO DE PARTIDA</span>

            <p>
              Elegí tus preferencias y revisá un resumen de tus objetivos para compartirlo cuando lo
              desees.
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
