import { lazy, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { site } from '../config/site';
import { HomePage } from '../pages/HomePage';

// División de código por rutas: no enviamos el portal y el formulario al cargar la portada.
const ProgramsPage = lazy(() =>
  import('../pages/ProgramsPage').then((mod) => ({ default: mod.ProgramsPage })),
);
const ProgramPage = lazy(() =>
  import('../pages/ProgramPage').then((mod) => ({ default: mod.ProgramPage })),
);
const CoachingPage = lazy(() =>
  import('../pages/CoachingPage').then((mod) => ({ default: mod.CoachingPage })),
);
const ApplyPage = lazy(() =>
  import('../pages/ApplyPage').then((mod) => ({ default: mod.ApplyPage })),
);
const PortalPreviewPage = lazy(() =>
  import('../pages/PortalPreviewPage').then((mod) => ({ default: mod.PortalPreviewPage })),
);
const PrivacyPage = lazy(() =>
  import('../pages/PrivacyPage').then((mod) => ({ default: mod.PrivacyPage })),
);
const NotFoundPage = lazy(() =>
  import('../pages/NotFoundPage').then((mod) => ({ default: mod.NotFoundPage })),
);

function titleForRoute(path: string): string {
  if (path.startsWith('/programas/')) return 'Detalle de programa';
  const titles: Record<string, string> = {
    '/programas': 'Programas',
    '/asesoramiento': 'Asesoramiento',
    '/empezar': 'Empezar',
    '/espacio': 'Área de alumnos — Demo',
    '/privacidad': 'Privacidad',
  };
  return titles[path] ?? 'Página no encontrada';
}

function RouteEffects() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    document.title =
      pathname === '/' ? site.meta.title : `${titleForRoute(pathname)} | ${site.brand.name}`;
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'auto' });
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
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
