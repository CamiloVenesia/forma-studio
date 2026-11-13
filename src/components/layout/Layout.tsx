import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Header } from './Header';
import { Footer } from './Footer';

export function Layout() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <>
      <a className="skip-link" href="#main">
        Saltar al contenido
      </a>
      <div id="top" />
      <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
      <Header />
      <main id="main">
        <Suspense
          fallback={
            <div className="route-loading container" role="status">
              Cargando sección…
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
