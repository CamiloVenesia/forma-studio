import { ArrowDownRight, Asterisk } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

import { ArrowLink } from '../common/ArrowLink';
import { site } from '../../config/site';

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Hero() {
  const photoRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: photoRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-14, 34]);

  const lines = [
    { key: 'moverse', content: 'Moverse' },
    { key: 'tambien', content: <em>también es</em> },
    {
      key: 'elegirte',
      content: (
        <>
          elegirte<span>.</span>
        </>
      ),
    },
  ];

  return (
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero__text">
        <motion.span
          className="eyebrow hero__eyebrow"
          initial={reducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reducedMotion ? 0 : 0.6,
            ease,
          }}
        >
          <span className="eyebrow-line" />
          {site.hero.eyebrow}
        </motion.span>

        <h1 id="hero-title">
          {lines.map(({ key, content }, index) => (
            <span className="hero__line-mask" key={key}>
              <motion.span
                className={`hero__line${index === 2 ? ' hero__line--last' : ''}`}
                initial={reducedMotion ? false : { y: '115%' }}
                animate={{ y: '0%' }}
                transition={{
                  duration: reducedMotion ? 0 : 0.94,
                  delay: reducedMotion ? 0 : 0.12 + index * 0.13,
                  ease,
                }}
              >
                {content}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="hero__intro"
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reducedMotion ? 0 : 0.75,
            delay: reducedMotion ? 0 : 0.5,
            ease,
          }}
        >
          {site.hero.intro}
        </motion.p>

        <motion.div
          className="hero__buttons"
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reducedMotion ? 0 : 0.7,
            delay: reducedMotion ? 0 : 0.62,
            ease,
          }}
        >
          <ArrowLink to="/programas">Explorar programas</ArrowLink>
          <ArrowLink to="/empezar" variant="text">
            Quiero empezar
          </ArrowLink>
        </motion.div>

        <div className="hero__foot">
          <span>FÍSICO Y MENTAL, EN EQUILIBRIO</span>
          <ArrowDownRight size={22} aria-hidden="true" />
        </div>
      </div>

      <div ref={photoRef} className="hero__art">
        <motion.div
          className="hero__image-wrap"
          initial={reducedMotion ? false : { opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: reducedMotion ? 0 : 1.05,
            delay: reducedMotion ? 0 : 0.2,
            ease,
          }}
        >
          <motion.img
            src={site.images.hero}
            alt="Persona en una práctica de movimiento y entrenamiento"
            fetchPriority="high"
            loading="eager"
            decoding="async"
            style={reducedMotion ? undefined : { y: imageY }}
          />

          {!reducedMotion && (
            <motion.div
              className="hero__photo-curtain"
              aria-hidden="true"
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              transition={{
                duration: 1.05,
                delay: 0.38,
                ease,
              }}
            />
          )}
        </motion.div>

        <motion.div
          className="hero__seal"
          aria-hidden="true"
          initial={reducedMotion ? false : { opacity: 0, scale: 0.8, rotate: 22 }}
          animate={{ opacity: 1, scale: 1, rotate: 11 }}
          whileHover={reducedMotion ? undefined : { scale: 1.06, rotate: 0 }}
          transition={{
            duration: reducedMotion ? 0 : 0.7,
            delay: reducedMotion ? 0 : 0.8,
            ease,
          }}
        >
          <Asterisk size={28} strokeWidth={1.4} />
          <span>
            MOVE
            <br />
            WITH
            <br />
            INTENTION
          </span>
        </motion.div>

        <span className="hero__photo-index">F/01 — EVERY BODY IS DIFFERENT</span>
      </div>
    </section>
  );
}
