import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

export function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const forward = useTransform(scrollYProgress, [0, 1], ['-12%', '3%']);

  const backward = useTransform(scrollYProgress, [0, 1], ['3%', '-12%']);

  return (
    <div ref={ref} className="kinetic-type" aria-label="Fuerza, movimiento, libertad y control">
      <div className="kinetic-type__rail" aria-hidden="true">
        <motion.div className="kinetic-type__row" style={reduced ? undefined : { x: forward }}>
          <span>FUERZA</span>
          <i>✳</i>
          <span>MOVIMIENTO</span>
          <i>✳</i>
          <span>FUERZA</span>
          <i>✳</i>
        </motion.div>

        <motion.div
          className="kinetic-type__row kinetic-type__row--outline"
          style={reduced ? undefined : { x: backward }}
        >
          <span>A TU RITMO</span>
          <i>✳</i>
          <span>SIN LÍMITES</span>
          <i>✳</i>
          <span>A TU RITMO</span>
        </motion.div>
      </div>
    </div>
  );
}
