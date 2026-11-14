import { useRef, useSyncExternalStore } from 'react';
import { ArrowDownRight } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';

import { media } from '../../data/media';
import { unsplashWidth } from '../../utils/unsplash';

interface Scene {
  number: string;
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  image: string;
}

const scenes: Scene[] = [
  {
    number: '01',
    eyebrow: 'LA FUERZA',
    title: 'DESCUBRÍ',
    accent: 'TU POTENCIAL.',
    description: 'No se trata de hacer más. Se trata de entrenar con una dirección.',
    image: media.storyStrength,
  },
  {
    number: '02',
    eyebrow: 'EL CONTROL',
    title: 'HABITÁ',
    accent: 'EL MOVIMIENTO.',
    description: 'Fuerza, precisión y atención en cada movimiento.',
    image: media.storyControl,
  },
  {
    number: '03',
    eyebrow: 'LA CONSTANCIA',
    title: 'HACELO',
    accent: 'A TU RITMO.',
    description: 'Una práctica que encuentra lugar en tu vida, no al revés.',
    image: media.storyContinuity,
  },
];

const desktopQuery = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)';

/*
 * Imágenes optimizadas para el storytelling móvil.
 *
 * Conservamos:
 * - La fotografía original.
 * - El encuadre y object-fit del CSS.
 * - Las animaciones.
 *
 * Reducimos:
 * - Resoluciones innecesarias.
 * - Calidad de compresión de 82 a 74.
 */

function mobileStoryImage(source: string, width: number): string {
  const resized = unsplashWidth(source, width);

  if (!resized.startsWith('https://images.unsplash.com/')) {
    return resized;
  }

  const url = new URL(resized);
  url.searchParams.set('q', '74');

  return url.toString();
}

function subscribeDesktop(onChange: () => void) {
  const match = window.matchMedia(desktopQuery);

  match.addEventListener('change', onChange);

  return () => match.removeEventListener('change', onChange);
}

function desktopSnapshot() {
  return window.matchMedia(desktopQuery).matches;
}

function useDesktopMotion() {
  return useSyncExternalStore(subscribeDesktop, desktopSnapshot, () => false);
}

function DesktopScene({
  scene,
  index,
  progress,
}: {
  scene: Scene;
  index: number;
  progress: MotionValue<number>;
}) {
  const entrance = index === 0 ? 0 : index === 1 ? 0.27 : 0.61;

  const arrival = index === 0 ? 0.02 : index === 1 ? 0.43 : 0.77;

  const panelY = useTransform(
    progress,
    index === 0 ? [0, 1] : [0, entrance, arrival, 1],
    index === 0 ? ['0%', '0%'] : ['102%', '102%', '0%', '0%'],
  );

  const photoScale = useTransform(progress, [entrance, 1], [1.08, 1]);

  const textY = useTransform(progress, [entrance, arrival], [38, 0]);

  const textOpacity = useTransform(
    progress,
    index === 0 ? [0, 0.01] : [entrance, arrival],
    index === 0 ? [1, 1] : [0.15, 1],
  );

  return (
    <motion.article
      className="story-scene story-scene--wipe"
      style={{
        y: panelY,
        zIndex: index + 1,
      }}
    >
      <motion.img
        className="story-scene__image"
        src={unsplashWidth(scene.image, 1800)}
        srcSet={`${unsplashWidth(scene.image, 1200)} 1200w, ${unsplashWidth(
          scene.image,
          1800,
        )} 1800w`}
        sizes="100vw"
        alt=""
        loading="lazy"
        decoding="async"
        style={{ scale: photoScale }}
      />

      <div className="story-scene__shade" aria-hidden="true" />

      <motion.div
        className="story-scene__content"
        style={{
          y: textY,
          opacity: textOpacity,
        }}
      >
        <span className="story-scene__eyebrow">
          {scene.number} / {scene.eyebrow}
        </span>

        <h2>
          {scene.title}
          <br />
          <em>{scene.accent}</em>
        </h2>

        <p>{scene.description}</p>
      </motion.div>

      <span className="story-scene__watermark" aria-hidden="true">
        {scene.number}
      </span>
    </motion.article>
  );
}

function DesktopStory() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={ref} className="story-desktop">
      <div className="story-desktop__sticky">
        {scenes.map((scene, index) => (
          <DesktopScene key={scene.number} scene={scene} index={index} progress={scrollYProgress} />
        ))}

        <div className="story-desktop__hud" aria-hidden="true">
          <span>FORMA / EXPERIENCIAS</span>

          <div className="story-desktop__track">
            <motion.div
              style={{
                scaleY: scrollYProgress,
              }}
            />
          </div>

          <span>03 / 03</span>
        </div>
      </div>
    </div>
  );
}

function MobileScene({ scene, index }: { scene: Scene; index: number }) {
  const reduced = useReducedMotion();

  return (
    <article className="story-mobile__scene">
      <div className="story-mobile__visual">
        <motion.img
          src={mobileStoryImage(scene.image, 720)}
          srcSet={[
            `${mobileStoryImage(scene.image, 480)} 480w`,
            `${mobileStoryImage(scene.image, 640)} 640w`,
            `${mobileStoryImage(scene.image, 800)} 800w`,
            `${mobileStoryImage(scene.image, 960)} 960w`,
          ].join(', ')}
          sizes="(min-width: 768px) 33vw, 100vw"
          alt=""
          loading="lazy"
          decoding="async"
          initial={false}
          whileInView={reduced ? undefined : { scale: [1.045, 1] }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        <div className="story-mobile__shade" aria-hidden="true" />
      </div>

      <div className="story-mobile__content">
        <span>
          {scene.number} / {scene.eyebrow}
        </span>

        <h2>
          {scene.title}
          <br />
          <em>{scene.accent}</em>
        </h2>

        <p>{scene.description}</p>
      </div>

      <span className="story-mobile__number" aria-hidden="true">
        0{index + 1}
      </span>
    </article>
  );
}

export function ImmersiveStory() {
  const desktop = useDesktopMotion();

  return (
    <section className="story" aria-label="Tres dimensiones del movimiento">
      <div className="story__intro container">
        <span className="section-label">
          <span>02 /</span>
          MÁS QUE ENTRENAR
        </span>

        <h2>
          EL MOVIMIENTO
          <br />
          <em>SE SIENTE.</em>
        </h2>

        <span className="story__intro-hint">
          DESCUBRÍ LAS TRES MIRADAS
          <ArrowDownRight size={19} aria-hidden="true" />
        </span>
      </div>

      {desktop ? (
        <DesktopStory />
      ) : (
        <div className="story-mobile">
          {scenes.map((scene, index) => (
            <MobileScene key={scene.number} scene={scene} index={index} />
          ))}
        </div>
      )}
    </section>
  );
}
