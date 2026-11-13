import { Suspense } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { useLocation, useOutlet } from 'react-router-dom';

import { Footer } from './Footer';
import { Header } from './Header';

export function Layout() {
  const { pathname } = useLocation();
  const outlet = useOutlet();
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <a className="skip-link" href="#main">
        Saltar al contenido
      </a>

      <div id="top" />

      {!reducedMotion && (
        <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
      )}

      <Header />

      <main id="main">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={pathname}
            className="route-stage"
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={{
              duration: reducedMotion ? 0 : 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Suspense
              fallback={
                <div className="route-loading container" role="status">
                  Cargando sección…
                </div>
              }
            >
              {outlet}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </>
  );
}
