import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { faqs } from '../../data/faqs';

export function Accordion() {
  const [active, setActive] = useState<number | null>(0);
  return (
    <div className="accordion">
      {faqs.map((faq, index) => (
        <div
          className={`accordion__item ${active === index ? 'is-active' : ''}`}
          key={faq.question}
        >
          <h3>
            <button
              type="button"
              aria-expanded={active === index}
              aria-controls={`faq-${index}`}
              onClick={() => setActive(active === index ? null : index)}
            >
              <span>{faq.question}</span>
              {active === index ? (
                <Minus size={20} aria-hidden="true" />
              ) : (
                <Plus size={20} aria-hidden="true" />
              )}
            </button>
          </h3>
          <div id={`faq-${index}`} hidden={active !== index} className="accordion__answer">
            <p>{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
