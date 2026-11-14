/* global process, console, fetch, AbortSignal, Buffer, setTimeout */
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const IMAGE_DIR = join(ROOT, 'public', 'images');
const DOMAIN = 'https://forma-studiofit.vercel.app';
const DRY_RUN = process.argv.includes('--dry-run');

const paths = {
  media: 'src/data/media.ts',
  hero: 'src/components/sections/Hero.tsx',
  imageHelper: 'src/utils/unsplash.ts',
  story: 'src/components/sections/ImmersiveStory.tsx',
  html: 'index.html',
  site: 'src/config/site.ts',
};

const original = {};

for (const [key, relativePath] of Object.entries(paths)) {
  original[key] = await readFile(join(ROOT, relativePath), 'utf8');
}

function ensureChange(before, after, label) {
  if (before === after) {
    throw new Error(
      `No encontré la estructura esperada de ${label}. No se modificó ningún archivo.`,
    );
  }

  return after;
}

// Obtener las fotografías directamente del código actual.
const mediaEntries = [
  ...original.media.matchAll(
    /^\s*(\w+):\s*photo\(\s*['"](photo-\d+-[a-zA-Z0-9]+)['"]\s*(?:,\s*(\d+))?\s*\)/gm,
  ),
].map((match) => ({
  name: match[1],
  id: match[2],
  width: Number(match[3] || 1200),
}));

const heroIds = [...original.hero.matchAll(/^\s*id:\s*['"](photo-\d+-[a-zA-Z0-9]+)['"]/gm)].map(
  (match) => match[1],
);

if (mediaEntries.length < 15 || heroIds.length !== 2) {
  throw new Error(
    `Inventario inesperado: ${mediaEntries.length} fotos en media.ts y ${heroIds.length} en Hero.tsx. No se modificó nada.`,
  );
}

// Generar únicamente los tamaños que usa cada sección.
const widthsById = new Map();

function addWidths(id, widths) {
  const current = widthsById.get(id) ?? new Set();

  for (const width of widths) {
    current.add(width);
  }

  widthsById.set(id, current);
}

for (const { name, id, width } of mediaEntries) {
  addWidths(id, [width]);

  if (name.startsWith('story')) {
    addWidths(id, [480, 640, 720, 800, 960, 1200, 1800]);
  }

  if (name.startsWith('spotlight')) {
    addWidths(id, [720, 1200]);
  }

  if (name === 'coaching') {
    addWidths(id, [720, 1200, 1800]);
  }
}

for (const id of heroIds) {
  addWidths(id, [720, 1200, 1600, 2200]);
}

const ogPhotoId = mediaEntries.find((entry) => entry.name === 'hero')?.id;

if (!ogPhotoId) {
  throw new Error('No se encontró la imagen para Open Graph.');
}

const ogUrl = `${DOMAIN}/images/forma-og.jpg`;

const changes = { ...original };

// 1. Banco de fotografías.
changes.media = ensureChange(
  original.media,
  original.media.replace(
    /const photo\s*=\s*\(id: string, width = 1200\)\s*=>\s*`https:\/\/images\.unsplash\.com\/\$\{id\}[^`]*`;/,
    'const photo = (id: string, width = 1200) => `/images/${id}-${width}.webp`;',
  ),
  paths.media,
);

changes.media = changes.media.replace(
  /\/\*\*[\s\S]*?\*\//,
  '/** Banco fotográfico servido localmente desde public/images. */',
);

// 2. Fotografías interactivas del Hero.
changes.hero = ensureChange(
  original.hero,
  original.hero.replace(
    /function photoUrl\(id: string, width: number\)\s*\{\s*return `https:\/\/images\.unsplash\.com\/\$\{id\}[^`]*`;\s*\}/,
    'function photoUrl(id: string, width: number) {\n  return `/images/${id}-${width}.webp`;\n}',
  ),
  paths.hero,
);

// 3. Resolver variantes de imágenes locales.
changes.imageHelper = `/**
 * Conserva el nombre de la función para no modificar sus importaciones.
 * Ahora obtiene la variante local en lugar de consultar Unsplash.
 */
export function unsplashWidth(source: string, width: number): string {
  const match = /^\\/images\\/(photo-[a-zA-Z0-9-]+)-\\d+\\.webp$/.exec(source);
  return match ? \`/images/\${match[1]}-\${width}.webp\` : source;
}
`;

// 4. Simplificar la resolución de imágenes móviles.
const storyPattern = /function mobileStoryImage\([\s\S]*?\n\}\s*\nfunction subscribeDesktop/;

if (storyPattern.test(original.story)) {
  changes.story = original.story.replace(
    storyPattern,
    'function mobileStoryImage(source: string, width: number): string {\n  return unsplashWidth(source, width);\n}\n\nfunction subscribeDesktop',
  );
}

// 5. Convertir URLs del HTML a imágenes locales.
function replaceUrl(match, id, query) {
  const isSocial = /(?:&|&amp;)h=630(?:&|&amp;|$)/.test(query);

  if (isSocial) {
    return ogUrl;
  }

  const width = /(?:^|&|&amp;)w=(\d+)/.exec(query)?.[1];

  if (!width) {
    throw new Error(`No pude identificar el ancho de ${id}: ${match}`);
  }

  if (!widthsById.get(id)?.has(Number(width))) {
    throw new Error(`Falta preparar la variante ${id} de ${width}px.`);
  }

  return `/images/${id}-${width}.webp`;
}

changes.html = original.html.replace(
  /https:\/\/images\.unsplash\.com\/(photo-\d+-[a-zA-Z0-9]+)\?([^\s"'<>]+)/g,
  replaceUrl,
);

// Ya no necesitamos preconnect a Unsplash.
changes.html = changes.html.replace(
  /\s*<link\b(?=[^>]*\brel="preconnect")(?=[^>]*\bhref="https:\/\/images\.unsplash\.com")[^>]*\/?>/g,
  '',
);

changes.html = ensureChange(original.html, changes.html, paths.html);

// 6. Imagen Open Graph local.
changes.site = original.site.replace(
  /(socialImage:\s*)['"]https:\/\/images\.unsplash\.com\/[^'"]+['"]/,
  (_, prefix) => `${prefix}'${ogUrl}'`,
);

// Verificar que las fuentes principales ya no usen imágenes remotas.
const remoteImagesStillUsed = [changes.media, changes.hero, changes.html, changes.site].some(
  (value) => value.includes('images.unsplash.com'),
);

if (remoteImagesStillUsed) {
  throw new Error('Quedan imágenes remotas en los archivos principales. No se modificó nada.');
}

// Preparar las descargas WebP.
const tasks = [...widthsById.entries()].flatMap(([id, widths]) =>
  [...widths]
    .sort((a, b) => a - b)
    .map((width) => ({
      path: join(IMAGE_DIR, `${id}-${width}.webp`),
      url: `https://images.unsplash.com/${id}?fit=crop&w=${width}&q=${heroIds.includes(id) ? 84 : 77}&fm=webp`,
      type: 'webp',
    })),
);

// Imagen social 1200 x 630.
tasks.push({
  path: join(IMAGE_DIR, 'forma-og.jpg'),
  url: `https://images.unsplash.com/${ogPhotoId}?fit=crop&w=1200&h=630&q=82&fm=jpg`,
  type: 'jpeg',
});

console.log(`Fotografías diferentes: ${widthsById.size}`);
console.log(`Archivos optimizados necesarios: ${tasks.length}`);

if (DRY_RUN) {
  console.log('Simulación correcta: no se descargó ni modificó ningún archivo.');
  process.exit(0);
}

await mkdir(IMAGE_DIR, { recursive: true });

function validImage(bytes, type) {
  if (type === 'jpeg') {
    return bytes.length > 1000 && bytes[0] === 0xff && bytes[1] === 0xd8;
  }

  return (
    bytes.length > 1000 &&
    bytes.toString('ascii', 0, 4) === 'RIFF' &&
    bytes.toString('ascii', 8, 12) === 'WEBP'
  );
}

async function fetchWithRetry(url) {
  let lastError;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch(url, {
        signal: AbortSignal.timeout(30000),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return Buffer.from(await response.arrayBuffer());
    } catch (error) {
      lastError = error;

      if (attempt < 3) {
        await new Promise((r) => setTimeout(r, attempt * 1200));
      }
    }
  }

  throw new Error(`Error al descargar ${url}: ${String(lastError)}`);
}

let completed = 0;
let next = 0;

async function worker() {
  while (next < tasks.length) {
    const task = tasks[next++];
    let bytes;

    try {
      const currentSize = (await stat(task.path)).size;

      if (currentSize > 1000) {
        const existing = await readFile(task.path);

        if (validImage(existing, task.type)) {
          console.log(
            `[${++completed}/${tasks.length}] Ya existe: ${task.path.split(/[\\/]/).at(-1)}`,
          );
          continue;
        }
      }
    } catch {
      // No existe todavía.
    }

    bytes = await fetchWithRetry(task.url);

    if (!validImage(bytes, task.type)) {
      throw new Error(`El servidor no devolvió una imagen ${task.type} válida: ${task.url}`);
    }

    await writeFile(task.path, bytes);

    console.log(
      `[${++completed}/${tasks.length}] OK ${task.path.split(/[\\/]/).at(-1)} (${Math.round(bytes.length / 1024)} KiB)`,
    );
  }
}

await Promise.all(Array.from({ length: 3 }, () => worker()));

// Los archivos de código se actualizan solo al finalizar las descargas.
for (const [key, content] of Object.entries(changes)) {
  if (content !== original[key]) {
    await writeFile(join(ROOT, paths[key]), content, 'utf8');
    console.log(`Actualizado: ${paths[key]}`);
  }
}

console.log('Migración completa. Todas las imágenes se sirven desde public/images.');
