import { Suspense } from 'react';
import { motion, useReducedMotion, useScroll } from 'motion/react';
import { useLocation, useOutlet } from 'react-router-dom';

import { Footer } from './Footer';
import { Header } from './Header';

/**
 * No bloqueamos el renderizado esperando
 * la salida de la ruta anterior.
 *
 * Las rutas lazy muestran un estado de carga
 * visible en lugar de una pantalla vacía.
 */
export function Layout() {
  const { pathname } = useLocation();
  const outlet = useOutlet();
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();

  return (
    <>
      <a className="skip-link" href="#main">
        Saltar al contenido
      </a>

      {!reducedMotion && (
        <motion.div
          className="scroll-progress"
          style={{
            scaleX: scrollYProgress,
          }}
          aria-hidden="true"
        />
      )}

      <Header />

      <main id="main">
        <motion.div
          key={pathname}
          className="route-stage"
          initial={reducedMotion ? false : { opacity: 0.95, y: 7 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: reducedMotion ? 0 : 0.26,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Suspense
            fallback={
              <div
                className="route-loading route-loading--branded"
                role="status"
                aria-live="polite"
              >
                <span className="route-loading__brand">forma.</span>

                <span className="route-loading__caption">Preparando tu experiencia</span>
              </div>
            }
          >
            {outlet}
          </Suspense>
        </motion.div>
      </main>

      <Footer />
    </>
  );
}
