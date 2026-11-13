import { useRef, useSyncExternalStore } from 'react';
import { ArrowDownRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';

import { ArrowLink } from '../common/ArrowLink';
import { media } from '../../data/media';
import { unsplashWidth } from '../../utils/unsplash';

const desktopQuery = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)';

function subscribeDesktop(onChange: () => void) {
  const mediaQuery = window.matchMedia(desktopQuery);

  mediaQuery.addEventListener('change', onChange);

  return () => mediaQuery.removeEventListener('change', onChange);
}

function getDesktopSnapshot() {
  return window.matchMedia(desktopQuery).matches;
}

function useDesktopScene() {
  return useSyncExternalStore(subscribeDesktop, getDesktopSnapshot, () => false);
}

function ScenePhoto() {
  return (
    <img
      className="signature__image"
      src={unsplashWidth(media.coaching, 1200)}
      srcSet={`${unsplashWidth(media.coaching, 720)} 720w, ${unsplashWidth(
        media.coaching,
        1200,
      )} 1200w, ${unsplashWidth(media.coaching, 1800)} 1800w`}
      sizes="100vw"
      alt=""
      loading="lazy"
      decoding="async"
    />
  );
}

function DesktopSignature() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const left = useTransform(scrollYProgress, [0, 0.25, 0.57, 1], ['0%', '0%', '-105%', '-105%']);

  const right = useTransform(scrollYProgress, [0, 0.25, 0.57, 1], ['0%', '0%', '105%', '105%']);

  const zoom = useTransform(scrollYProgress, [0, 1], [1.12, 1]);

  const headlineY = useTransform(scrollYProgress, [0.36, 0.64], [60, 0]);

  const headlineOpacity = useTransform(scrollYProgress, [0.37, 0.61], [0, 1]);

  return (
    <div ref={ref} className="signature__scroll">
      <div className="signature__sticky">
        <motion.div className="signature__photo" style={{ scale: zoom }}>
          <ScenePhoto />
        </motion.div>

        <div className="signature__scrim" aria-hidden="true" />

        <motion.div
          className="signature__panel signature__panel--left"
          style={{ x: left }}
          aria-hidden="true"
        >
          <span>NO ES</span>
          <strong>SOLO</strong>
        </motion.div>

        <motion.div
          className="signature__panel signature__panel--right"
          style={{ x: right }}
          aria-hidden="true"
        >
          <span>HACER</span>
          <strong>MÁS.</strong>
        </motion.div>

        <motion.div
          className="signature__message"
          style={{
            y: headlineY,
            opacity: headlineOpacity,
          }}
        >
          <span>UNA IDEA. INFINITAS FORMAS DE VIVIRLA.</span>

          <h2>
            ES ENCONTRAR
            <br />
            <em>TU FORMA.</em>
          </h2>

          <p>Tu movimiento no tiene que parecerse al de nadie más.</p>
        </motion.div>

        <div className="signature__progress" aria-hidden="true">
          <motion.div
            style={{
              scaleX: scrollYProgress,
            }}
          />
        </div>
      </div>
    </div>
  );
}

function MobileSignature() {
  return (
    <div className="signature__mobile">
      <div className="signature__photo">
        <ScenePhoto />
      </div>

      <div className="signature__scrim" aria-hidden="true" />

      <div className="signature__message">
        <span>UNA IDEA. INFINITAS FORMAS DE VIVIRLA.</span>

        <h2>
          ES ENCONTRAR
          <br />
          <em>TU FORMA.</em>
        </h2>

        <p>Tu movimiento no tiene que parecerse al de nadie más.</p>
      </div>
    </div>
  );
}

export function SignatureMoment() {
  const desktop = useDesktopScene();

  return (
    <section className="signature" aria-label="Encontrá tu forma de moverte">
      {desktop ? <DesktopSignature /> : <MobileSignature />}

      <div className="signature__outro container">
        <div>
          <span>FORMA / MOVIMIENTO A TU MANERA</span>

          <p>
            Todo empieza con <em>un primer paso.</em>
          </p>
        </div>

        <div className="signature__action">
          <ArrowLink to="/empezar">Descubrí tu punto de partida</ArrowLink>

          <ArrowDownRight size={26} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
