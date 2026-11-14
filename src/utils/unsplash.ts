/**
 * Conserva el nombre de la función para no modificar sus importaciones.
 * Ahora obtiene la variante local en lugar de consultar Unsplash.
 */
export function unsplashWidth(source: string, width: number): string {
  const match = /^\/images\/(photo-[a-zA-Z0-9-]+)-\d+\.webp$/.exec(source);
  return match ? `/images/${match[1]}-${width}.webp` : source;
}
