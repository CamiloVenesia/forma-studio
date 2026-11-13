# FORMA Studio — Premium Fitness & Pilates Experience

**Web editorial premium, mobile-first y reutilizable para entrenadoras, gimnasios y estudios de pilates.**

> **Proyecto demostrativo para portafolio.** FORMA es una marca ficticia. No es el sitio oficial de ninguna profesional, no contiene su material personal y no ofrece servicios reales.

## Qué incluye

- Landing editorial de alto impacto, imágenes arqueadas, scroll reveal, parallax discreto y franja tipográfica en movimiento.
- Diseño adaptado primero a teléfonos y luego a pantallas grandes.
- Catálogo de programas con filtros interactivos por disciplina y modalidad.
- Página de detalle para cada programa, con semanas ficticias a modo de ejemplo.
- Sección de asesoramiento y roadmap hacia una plataforma de alumnos.
- **Formulario de inscripción de 4 pasos**, validación de campos, preguntas condicionales y revisión final; no se envía ni se guarda información privada en esta demostración.
- **Portal interactivo de muestra**: rutinas ficticias, biblioteca de ejercicios, progreso semanal y estados completados, todo en memoria.
- Accesibilidad de base: labels, botones semánticos, jerarquía de encabezados, estados ARIA y reducción de movimiento.
- TypeScript estricto, ESLint, Prettier, Vitest, componentes separados, configuración de marca y estructura para ampliar.
- Configuración de deploy SPA para Vercel y Netlify.

## Inicio rápido (VS Code)

### Requisitos

- Node.js **20.19+** o **22+** (recomendado 22 LTS).
- npm y conexión a internet para instalar dependencias.

```bash
npm install
npm run dev
```

Abrí `http://localhost:5173`. Para entrar desde otro dispositivo en la misma red, usá la IP local que muestra Vite (verificar firewall).

### Comprobaciones

```bash
npm run format
npm run lint
npm run typecheck
npm run test
npm run build
```

O corré `npm run check` para ejecutar todo en orden.

## Páginas

| Ruta                         | Propósito                              |
| ---------------------------- | -------------------------------------- |
| `/`                          | Portada premium y propuesta editorial  |
| `/programas`                 | Catálogo filtrable                     |
| `/programas/fuerza-esencial` | Ejemplo de programa individual         |
| `/asesoramiento`             | Propuesta de seguimiento               |
| `/empezar`                   | Inscripción demostrativa, cuatro pasos |
| `/espacio`                   | Portal de alumnos de ejemplo           |
| `/privacidad`                | Alcance y manejo de datos de la demo   |

## Estructura

```text
forma-studio-pro/
├─ .github/workflows/quality.yml
├─ docs/
│  ├─ ARQUITECTURA.md
│  └─ CUSTOMIZAR.md
├─ public/
│  ├─ favicon.svg
│  ├─ robots.txt
│  └─ _redirects
├─ src/
│  ├─ app/
│  ├─ components/{common,layout,sections}/
│  ├─ config/site.ts
│  ├─ data/
│  ├─ features/intake/
│  ├─ pages/
│  ├─ styles/
│  ├─ types/
│  └─ utils/
├─ tests/
├─ index.html
├─ package.json
├─ tsconfig*.json
├─ vite.config.ts
└─ vercel.json
```

## Stack

React 19 · TypeScript · Vite 7 · React Router 7 · Motion · Lucide · ESLint · Prettier · Vitest

## Personalización rápida

1. `src/config/site.ts`: nombre, lema, imágenes principales, metadatos.
2. `src/data/programs.ts`: catálogo y fotografías.
3. `src/data/faqs.ts`: preguntas frecuentes.
4. `src/styles/tokens.css`: colores y escalas globales.
5. `src/features/intake`: flujo de captación ajustable.

Guía extendida: [`docs/CUSTOMIZAR.md`](docs/CUSTOMIZAR.md).

## Estado real de las funcionalidades

| Elemento                               | Estado                              |
| -------------------------------------- | ----------------------------------- |
| Navegación responsive                  | Implementado                        |
| Filtros catálogo                       | Implementado                        |
| Detalle de programas                   | Implementado                        |
| Wizard con reglas y validación         | Implementado, sin envío             |
| Copiar resumen                         | Implementado mediante Clipboard API |
| Portal de rutinas                      | Simulación interactiva local        |
| Login / roles / base de datos          | No implementado                     |
| Formulario conectado a una profesional | No implementado                     |
| Pagos / turnos / reservas              | No implementado                     |

## Licencias, privacidad y límites

- Las fotografías cargan desde `images.unsplash.com` mediante URLs externas. Su selección es ilustrativa; antes de distribuir el producto a clientes, revisar licencias y sustituir por imágenes propias/autorizadas. No se incluyen fotos personales de Pilar Prado.
- Se utilizan Google Fonts, que implica solicitudes a terceros. Para una versión final puede convenir alojarlas localmente conforme a sus licencias.
- El formulario sólo usa estado en memoria: **no** transfiere, persiste ni procesa datos en un servidor de esta aplicación. El resumen se copia al portapapeles sólo por acción de la persona usuaria; excluye detalles de salud.
- No constituye prescripción de actividad física para una persona determinada. Las rutinas del portal son ejemplos de diseño de interfaz.
- Antes de comercializar la solución, integrar correctamente privacidad, autenticación, almacenamiento y revisión legal del cliente.
- Esta versión no trae `package-lock.json` porque no se pudo acceder al registro de npm durante el empaquetado. `npm install` lo generará en tu computadora. Luego deberías versionarlo en Git y cambiar CI a `npm ci`.

## Créditos de dirección de diseño

Inspiración conceptual (sin copiar código, imágenes ni contenido de esas webs):

- [Studio Bon](https://studiobon.ca/) — composición minimalista/editorial.
- [BLOOM Reformer Pilates](https://www.purepixels.nl/project/46/bloom-reformer-pilates) — recortes orgánicos de fotografías.
- [Alo Moves](https://www.alomoves.com/) — jerarquía comercial, exploración de programas y evolución hacia portal.

---

**Desarrollo conceptual escalable para portfolio y futuros clientes del rubro fitness.**
