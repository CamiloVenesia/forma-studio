import { describe, expect, it } from 'vitest';

import { media } from '../src/data/media';
import { programs } from '../src/data/programs';
import { site } from '../src/config/site';

describe('biblioteca fotográfica', () => {
  it('no reutiliza la misma fotografía en diferentes secciones', () => {
    const sources = Object.values(media);

    const ids = sources.map((source) => source.split('?')[0]);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it('tiene una imagen distinta por programa', () => {
    expect(new Set(programs.map((program) => program.image)).size).toBe(programs.length);
  });

  it('mantiene imágenes de portada y asesoramiento separadas', () => {
    expect(site.images.hero).not.toBe(site.images.detail);
    expect(site.images.hero).not.toBe(site.images.spotlightPilates);
  });
});
