/**
 * Banco fotográfico temporal de la demo.
 * Una URL por contexto visual: evita repetir fotografías entre secciones.
 * Antes de comercializar, revisar derechos y alojar versiones optimizadas.
 */
const photo = (id: string, width = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;

export const media = {
  hero: photo('photo-1518611012118-696072aa579a', 1500),

  spotlightStrength: photo('photo-1761839258420-5c3e2f2e2a74'),
  spotlightPilates: photo('photo-1747239069226-55382c570116'),

  storyStrength: photo('photo-1758875568722-72961c05d5dd', 1800),
  storyControl: photo('photo-1754258167498-657ddff65fc5', 1800),
  storyContinuity: photo('photo-1767611094260-1f5565e6d815', 1800),

  catalogStrengthStart: photo('photo-1534438327276-14e5300c3a48'),
  catalogStrengthProgress: photo('photo-1772450014666-083b1a23f6a1'),
  catalogPilatesFlow: photo('photo-1747240549807-fc3962949818'),
  catalogPilatesStart: photo('photo-1767611124095-0180597f3a2b'),

  coaching: photo('photo-1717500251741-cdbc93342d5a'),

  detailStrengthStart: photo('photo-1770026136797-18659700b5b9'),
  detailStrengthProgress: photo('photo-1772450014557-6830b289e354'),
  detailPilatesFlow: photo('photo-1754258167521-233d03caa23a'),
  detailPilatesStart: photo('photo-1754257320386-2aa79623257c'),
} as const;
