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
            Queremos conocer qué te mueve y cómo te gustaría entrenar. Este recorrido es una prueba
            funcional de cómo trabajaría el formulario con una marca real.
          </p>
          <div className="apply-page__sidebar-note">
            <span>NO SE ENVIARÁN TUS DATOS</span>
            <p>
              Esta demostración está preparada para mostrar el proceso sin almacenar información
              personal.
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
