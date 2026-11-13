import { Reveal } from '../common/Reveal';
import { SectionLabel } from '../common/SectionLabel';
import { Accordion } from '../common/Accordion';

export function FaqSection() {
  return (
    <section className="faq section-spacing">
      <div className="container faq__layout">
        <Reveal>
          <SectionLabel number="05 /">BUENO SABERLO</SectionLabel>
          <h2 className="display-title">
            Preguntas
            <br />
            <em>frecuentes.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <Accordion />
        </Reveal>
      </div>
    </section>
  );
}
