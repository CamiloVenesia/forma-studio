export function unsplashWidth(source: string, width: number): string {
  const url = new URL(source);

  if (url.hostname !== 'images.unsplash.com') {
    return source;
  }

  url.searchParams.set('w', String(width));

  return url.toString();
}
