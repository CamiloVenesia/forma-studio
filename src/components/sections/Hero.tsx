import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowDownRight, Asterisk } from 'lucide-react';
import { useRef } from 'react';
import { ArrowLink } from '../common/ArrowLink';
import { site } from '../../config/site';

export function Hero() {
  const photo = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: photo, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-20, 55]);
  const reducedMotion = useReducedMotion();
  return (
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero__text">
        <motion.span
          className="eyebrow hero__eyebrow"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reducedMotion ? 0 : 0.15, duration: reducedMotion ? 0 : 0.7 }}
        >
          <span className="eyebrow-line" />
          {site.hero.eyebrow}
        </motion.span>
        <h1 id="hero-title">
          <motion.span
            className="hero__line"
            initial={reducedMotion ? false : { opacity: 0, y: 38 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reducedMotion ? 0 : 0.9,
              delay: reducedMotion ? 0 : 0.1,
              ease: [0.2, 0.8, 0.2, 1],
            }}
          >
            Moverse
          </motion.span>
          <motion.span
            className="hero__line"
            initial={reducedMotion ? false : { opacity: 0, y: 38 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reducedMotion ? 0 : 0.9,
              delay: reducedMotion ? 0 : 0.22,
              ease: [0.2, 0.8, 0.2, 1],
            }}
          >
            <em>también es</em>
          </motion.span>
          <motion.span
            className="hero__line hero__line--last"
            initial={reducedMotion ? false : { opacity: 0, y: 38 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reducedMotion ? 0 : 0.9,
              delay: reducedMotion ? 0 : 0.34,
              ease: [0.2, 0.8, 0.2, 1],
            }}
          >
            elegirte<span>.</span>
          </motion.span>
        </h1>
        <motion.p
          className="hero__intro"
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reducedMotion ? 0 : 0.55, duration: reducedMotion ? 0 : 0.7 }}
        >
          {site.hero.intro}
        </motion.p>
        <motion.div
          className="hero__buttons"
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reducedMotion ? 0 : 0.68, duration: reducedMotion ? 0 : 0.7 }}
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
      <div ref={photo} className="hero__art" aria-label="Imagen editorial de movimiento">
        <motion.div
          className="hero__image-wrap"
          initial={reducedMotion ? false : { opacity: 0, scale: 1.055 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reducedMotion ? 0 : 1.2, delay: reducedMotion ? 0 : 0.2 }}
        >
          <motion.img
            style={reducedMotion ? undefined : { y }}
            src={site.images.hero}
            alt="Persona en una práctica de movimiento y entrenamiento"
            fetchPriority="high"
            loading="eager"
          />
        </motion.div>
        <div className="hero__seal" aria-hidden="true">
          <Asterisk size={28} strokeWidth={1.4} />
          <span>
            MOVE
            <br />
            WITH
            <br />
            INTENTION
          </span>
        </div>
        <span className="hero__photo-index">F/01 — EVERY BODY IS DIFFERENT</span>
      </div>
    </section>
  );
}
