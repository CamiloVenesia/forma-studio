import { Instagram } from 'lucide-react';

import { site } from '../../config/site';

function getInstagramProfile(url: string): string | null {
  if (!url.trim()) return null;

  try {
    const parsed = new URL(url.trim());
    const hostname = parsed.hostname.toLowerCase();
    const segments = parsed.pathname.split('/').filter(Boolean);

    const validHost = hostname === 'instagram.com' || hostname === 'www.instagram.com';

    if (parsed.protocol !== 'https:' || !validHost || segments.length !== 1) {
      return null;
    }

    return parsed.toString();
  } catch {
    return null;
  }
}

export function InstagramFab() {
  const instagramUrl = getInstagramProfile(site.brand.instagramUrl);

  if (!instagramUrl) return null;

  return (
    <a
      className="instagram-fab"
      href={instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Visitar Instagram de FORMA Studio (abre en una pestaña nueva)"
      title="Seguinos en Instagram"
    >
      <span className="instagram-fab__label" aria-hidden="true">
        SEGUINOS EN IG
      </span>

      <span className="instagram-fab__icon" aria-hidden="true">
        <Instagram size={27} strokeWidth={1.8} />
      </span>
    </a>
  );
}
