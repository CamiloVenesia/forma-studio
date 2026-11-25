
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

export function Marquee() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const forward = useTransform(scrollYProgress, [0, 1], ['-12%', '3%']);

  const backward = useTransform(scrollYProgress, [0, 1], ['3%', '-12%']);

  const decorativeStar = (
    <i aria-hidden="true">
      <svg viewBox="0 0 100 100" width="18" height="18" focusable="false">
        <path
          fill="currentColor"
          d="M46 0h8v34l24-24 6 6-24 24h34v8H60l24 24-6 6-24-24v34h-8V60L22 84l-6-6 24-24H6v-8h34L16 22l6-6 24 24z"
        />
      </svg>
    </i>
  );

  return (
    <section
      ref={ref}
      className="kinetic-type"
      aria-label="Fuerza, movimiento, libertad y control"
    >
      <div className="kinetic-type__rail" aria-hidden="true">
        <motion.div
          className="kinetic-type__row"
          style={reduced ? undefined : { x: forward }}
        >
          <span>FUERZA</span>
          {decorativeStar}
          <span>MOVIMIENTO</span>
          {decorativeStar}
          <span>FUERZA</span>
          {decorativeStar}
        </motion.div>

        <motion.div
          className="kinetic-type__row kinetic-type__row--outline"
          style={reduced ? undefined : { x: backward }}
        >
          <span>A TU RITMO</span>
          {decorativeStar}
          <span>SIN LÍMITES</span>
          {decorativeStar}
          <span>A TU RITMO</span>
        </motion.div>
      </div>
    </section>
  );
}
