import { Minus, Plus } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';

import { faqs } from '../../data/faqs';

export function Accordion() {
  const [active, setActive] = useState<number | null>(0);
  const reducedMotion = useReducedMotion();

  return (
    <div className="accordion">
      {faqs.map((faq, index) => {
        const expanded = active === index;
        const triggerId = `faq-trigger-${index}`;
        const panelId = `faq-panel-${index}`;

        return (
          <div className={`accordion__item${expanded ? ' is-active' : ''}`} key={faq.question}>
            <h3>
              <button
                type="button"
                id={triggerId}
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setActive(expanded ? null : index)}
              >
                <span>{faq.question}</span>

                {expanded ? (
                  <Minus size={20} aria-hidden="true" />
                ) : (
                  <Plus size={20} aria-hidden="true" />
                )}
              </button>
            </h3>

            <div id={panelId} role="region" aria-labelledby={triggerId} aria-hidden={!expanded}>
              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    key="answer"
                    initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                    animate={{
                      height: 'auto',
                      opacity: 1,
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                    }}
                    transition={{
                      height: {
                        duration: reducedMotion ? 0 : 0.34,
                        ease: [0.22, 1, 0.36, 1],
                      },
                      opacity: {
                        duration: reducedMotion ? 0 : 0.2,
                      },
                    }}
                    style={{
                      overflow: 'hidden',
                    }}
                  >
                    <div className="accordion__answer">
                      <p>{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        );
      })}
    </div>
  );
}
