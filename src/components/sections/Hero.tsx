import { useRef } from 'react';
import { ArrowDownRight, Asterisk } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';

import { ArrowLink } from '../common/ArrowLink';
import { site } from '../../config/site';

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const headline = [
  { id: 'uno', content: <>Moverse</> },
  { id: 'dos', content: <em>también es</em> },
  {
    id: 'tres',
    content: (
      <>
        elegirte<span>.</span>
      </>
    ),
  },
];

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    restDelta: 0.001,
  });

  const photoY = useTransform(smooth, [0, 1], [0, 64]);
  const displayY = useTransform(smooth, [0, 1], [0, -35]);
  const outlineX = useTransform(smooth, [0, 1], [0, -85]);

  return (
    <section ref={heroRef} className="hero container hero--cinematic" aria-labelledby="hero-title">
      <div className="hero__text">
        <motion.span
          className="eyebrow hero__eyebrow"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.8, ease }}
        >
          <span className="eyebrow-line" />
          {site.hero.eyebrow}
        </motion.span>

        <motion.h1 id="hero-title" style={reduced ? undefined : { y: displayY }}>
          {headline.map((line, index) => (
            <span className="hero__line-mask" key={line.id}>
              <motion.span
                className={`hero__line ${index === 2 ? 'hero__line--last' : ''}`}
                initial={reduced ? false : { y: '112%', rotate: 2 }}
                animate={{ y: '0%', rotate: 0 }}
                transition={{
                  duration: reduced ? 0 : 1.15,
                  delay: reduced ? 0 : 0.1 + index * 0.14,
                  ease,
                }}
              >
                {line.content}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          className="hero__intro"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduced ? 0 : 0.85,
            delay: reduced ? 0 : 0.6,
            ease,
          }}
        >
          {site.hero.intro}
        </motion.p>

        <motion.div
          className="hero__buttons"
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduced ? 0 : 0.75,
            delay: reduced ? 0 : 0.72,
            ease,
          }}
        >
          <ArrowLink to="/programas">Explorar programas</ArrowLink>
          <ArrowLink to="/empezar" variant="text">
            Quiero empezar
          </ArrowLink>
        </motion.div>

        <div className="hero__foot">
          <span>UNA EXPERIENCIA EN MOVIMIENTO</span>
          <ArrowDownRight size={22} aria-hidden="true" />
        </div>
      </div>

      <div className="hero__art">
        <motion.span
          className="hero__oversized-word"
          aria-hidden="true"
          style={reduced ? undefined : { x: outlineX }}
        >
          FORMA
        </motion.span>

        <motion.div
          className="hero__image-wrap"
          initial={reduced ? false : { clipPath: 'inset(0 100% 0 0)' }}
          animate={{ clipPath: 'inset(0 0% 0 0)' }}
          transition={{
            duration: reduced ? 0 : 1.45,
            delay: reduced ? 0 : 0.26,
            ease,
          }}
        >
          <motion.img
            src={site.images.hero}
            alt="Persona realizando actividad física sobre una colchoneta"
            fetchPriority="high"
            decoding="async"
            loading="eager"
            initial={reduced ? false : { scale: 1.23 }}
            animate={{ scale: 1 }}
            transition={{ duration: reduced ? 0 : 1.9, ease }}
            style={reduced ? undefined : { y: photoY }}
          />
        </motion.div>

        <motion.div
          className="hero__seal"
          aria-hidden="true"
          initial={reduced ? false : { opacity: 0, scale: 0.4, rotate: -45 }}
          animate={{ opacity: 1, scale: 1, rotate: 11 }}
          transition={{
            type: 'spring',
            stiffness: 150,
            damping: 16,
            delay: reduced ? 0 : 0.95,
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
