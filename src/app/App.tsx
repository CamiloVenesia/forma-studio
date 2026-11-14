import { lazy, useLayoutEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { Layout } from '../components/layout/Layout';
import { site } from '../config/site';
import { HomePage } from '../pages/HomePage';

// Carga por rutas para evitar enviar
// la plataforma completa a la portada.

const ProgramsPage = lazy(() =>
  import('../pages/ProgramsPage').then((mod) => ({
    default: mod.ProgramsPage,
  })),
);

const ProgramPage = lazy(() =>
  import('../pages/ProgramPage').then((mod) => ({
    default: mod.ProgramPage,
  })),
);

const CoachingPage = lazy(() =>
  import('../pages/CoachingPage').then((mod) => ({
    default: mod.CoachingPage,
  })),
);

const ApplyPage = lazy(() =>
  import('../pages/ApplyPage').then((mod) => ({
    default: mod.ApplyPage,
  })),
);

const PortalPreviewPage = lazy(() =>
  import('../pages/PortalPreviewPage').then((mod) => ({
    default: mod.PortalPreviewPage,
  })),
);

const PrivacyPage = lazy(() =>
  import('../pages/PrivacyPage').then((mod) => ({
    default: mod.PrivacyPage,
  })),
);

const NotFoundPage = lazy(() =>
  import('../pages/NotFoundPage').then((mod) => ({
    default: mod.NotFoundPage,
  })),
);

type PageSeo = {
  title: string;
  description: string;
  robots: string;
};

const INDEXABLE = 'index,follow,max-image-preview:large';
const NOINDEX = 'noindex,follow';

function normalizePath(pathname: string): string {
  return pathname.replace(/\/+$/, '') || '/';
}

function getPageSeo(pathname: string): PageSeo {
  const path = normalizePath(pathname);

  const pages: Record<string, PageSeo> = {
    '/': {
      title: site.meta.title,
      description: site.meta.description,
      robots: INDEXABLE,
    },

    '/programas': {
      title: 'Programas de fuerza y pilates | FORMA Studio',
      description:
        'Explorá el catálogo conceptual de FORMA Studio: ejemplos de propuestas de fuerza y pilates organizadas por disciplina y nivel.',
      robots: INDEXABLE,
    },

    '/asesoramiento': {
      title: 'Asesoramiento y planificación | FORMA Studio',
      description:
        'Conocé una propuesta conceptual de asesoramiento y planificación del entrenamiento, con un recorrido centrado en cada persona.',
      robots: INDEXABLE,
    },

    '/empezar': {
      title: 'Empezar | FORMA Studio',
      description: 'Explorá el recorrido inicial de FORMA Studio y sus opciones de entrenamiento.',
      robots: NOINDEX,
    },

    '/espacio': {
      title: 'Espacio de alumnos | FORMA Studio',
      description: 'Vista interactiva de ejemplo del espacio de alumnos de FORMA Studio.',
      robots: NOINDEX,
    },

    '/privacidad': {
      title: 'Privacidad | FORMA Studio',
      description:
        'Información sobre privacidad y recursos utilizados en el sitio de FORMA Studio.',
      robots: NOINDEX,
    },
  };

  if (pages[path]) {
    return pages[path];
  }

  if (path.startsWith('/programas/')) {
    return {
      title: 'Detalle de programa | FORMA Studio',
      description: 'Ficha de ejemplo del catálogo de programas de FORMA Studio.',
      robots: NOINDEX,
    };
  }

  return {
    title: 'Página no encontrada | FORMA Studio',
    description: 'La página que buscás no está disponible en FORMA Studio.',
    robots: 'noindex,nofollow',
  };
}

function setMetaName(name: string, content: string) {
  let meta = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);

  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', name);
    document.head.appendChild(meta);
  }

  meta.setAttribute('content', content);
}

function setMetaProperty(property: string, content: string) {
  let meta = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);

  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }

  meta.setAttribute('content', content);
}

function setCanonical(url: string) {
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }

  canonical.href = url;
}

function RouteEffects() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    const path = normalizePath(pathname);
    const seo = getPageSeo(path);

    const canonicalUrl = `${site.meta.url}${path === '/' ? '/' : path}`;

    // Título y descripción.
    document.title = seo.title;

    setMetaName('description', seo.description);
    setMetaName('robots', seo.robots);

    // URL canónica.
    setCanonical(canonicalUrl);

    // Open Graph.
    setMetaProperty('og:type', 'website');
    setMetaProperty('og:site_name', 'FORMA Studio');
    setMetaProperty('og:locale', site.brand.locale.replace('-', '_'));
    setMetaProperty('og:title', seo.title);
    setMetaProperty('og:description', seo.description);
    setMetaProperty('og:url', canonicalUrl);
    setMetaProperty('og:image', site.meta.socialImage);
    setMetaProperty('og:image:alt', site.meta.socialImageAlt);
    setMetaProperty('og:image:width', '1200');
    setMetaProperty('og:image:height', '630');

    // Twitter / X.
    setMetaName('twitter:card', 'summary_large_image');
    setMetaName('twitter:title', seo.title);
    setMetaName('twitter:description', seo.description);
    setMetaName('twitter:image', site.meta.socialImage);
    setMetaName('twitter:image:alt', site.meta.socialImageAlt);

    // Restaurar posición de navegación.
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({
        behavior: 'auto',
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'auto',
      });
    }
  }, [pathname, hash]);

  return null;
}

export function App() {
  return (
    <>
      <RouteEffects />

      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />

          <Route path="programas" element={<ProgramsPage />} />

          <Route path="programas/:slug" element={<ProgramPage />} />

          <Route path="asesoramiento" element={<CoachingPage />} />

          <Route path="empezar" element={<ApplyPage />} />

          <Route path="espacio" element={<PortalPreviewPage />} />

          <Route path="privacidad" element={<PrivacyPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}
