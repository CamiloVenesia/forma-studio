import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/**
 * Revelado progresivo sin ocultar contenido crítico.
 * El componente permanece visible incluso si el usuario hace scroll rápido
 * o IntersectionObserver no llega a activar una animación.
 */
export function Reveal({ children, className, delay = 0, y = 16 }: RevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={reducedMotion ? undefined : { opacity: [0.88, 1], y: [y, 0] }}
      viewport={{
        once: true,
        amount: 0.06,
        margin: '0px 0px 80px 0px',
      }}
      transition={{
        duration: reducedMotion ? 0 : 0.65,
        delay: reducedMotion ? 0 : Math.min(delay, 0.2),
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
