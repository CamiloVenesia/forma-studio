# FORMA Studio

### Premium Fitness & Pilates Experience

Plataforma web comercial, editorial y mobile-first para profesionales del entrenamiento físico, gimnasios y estudios de pilates.

FORMA Studio combina una experiencia visual de alta calidad con herramientas interactivas de exploración de programas, inscripción y demostración de seguimiento de entrenamientos.

> FORMA es una marca ficticia desarrollada como proyecto demostrativo de portfolio. No representa oficialmente a ningún profesional ni ofrece servicios reales.

## Objetivo del proyecto

Desarrollar una solución digital moderna, escalable y reutilizable para el sector fitness.

El proyecto está pensado para adaptarse a distintas identidades comerciales y evolucionar desde una web profesional hacia una plataforma integral de entrenamiento personalizado.

## Características

### Diseño y experiencia

- Enfoque mobile-first.
- Identidad visual editorial.
- Diseño responsive.
- Fotografías con recortes orgánicos.
- Animaciones de entrada y microinteracciones.
- Navegación adaptada a pantallas táctiles.
- Accesibilidad y soporte para movimiento reducido.

### Sitio comercial

- Página de inicio.
- Catálogo de entrenamientos.
- Filtros por disciplina y modalidad.
- Páginas individuales de programas.
- Asesoramiento personalizado.
- Preguntas frecuentes.
- Formulario de inscripción.

### Formulario interactivo

- Inscripción en cuatro pasos.
- Selección de disciplina.
- Selección de modalidad.
- Datos personales básicos.
- Objetivos y experiencia.
- Validaciones de campos.
- Preguntas condicionales.
- Revisión final.

El formulario funciona en modo demostración. No envía ni almacena información en un servidor.

### Espacio del alumno

Actualmente incluye una demostración interactiva con:

- Rutinas de ejemplo.
- Selección de entrenamientos.
- Biblioteca de ejercicios.
- Registro temporal de sesiones completadas.
- Indicadores visuales de progreso.

No dispone todavía de autenticación, cuentas reales ni almacenamiento persistente.

## Tecnologías

| Tecnología   | Utilización              |
| ------------ | ------------------------ |
| React 19     | Interfaz de usuario      |
| TypeScript   | Tipado estático          |
| Vite 7       | Desarrollo y compilación |
| React Router | Navegación               |
| Motion       | Animaciones              |
| Lucide React | Iconografía              |
| CSS          | Diseño y responsive      |
| ESLint       | Análisis estático        |
| Prettier     | Formato                  |
| Vitest       | Pruebas                  |

## Instalación

Requisitos:

- Node.js 20.19 o superior.
- npm.

Clonar el repositorio:

```bash
git clone https://github.com/CamiloVenesia/forma-studio.git
cd forma-studio
```

Instalar dependencias:

```bash
npm install
```

Ejecutar el entorno local:

```bash
npm run dev
```

La dirección predeterminada de Vite es:

http://localhost:5173

## Validación

Aplicar formato:

```bash
npm run format
```

Verificar el formato:

```bash
npm run format:check
```

Ejecutar las comprobaciones:

```bash
npm run check
```

Este último comando ejecuta ESLint, TypeScript, las pruebas automatizadas y la compilación.

## Estructura del proyecto

```text
forma-studio/
├── .github/
│   └── workflows/
├── docs/
│   ├── ARQUITECTURA.md
│   ├── CUSTOMIZAR.md
│   └── MOBILE_AUDIT.md
├── public/
├── src/
│   ├── app/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   └── sections/
│   ├── config/
│   ├── data/
│   ├── features/
│   │   └── intake/
│   ├── pages/
│   ├── styles/
│   ├── types/
│   └── utils/
├── tests/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── vercel.json
```

## Rutas principales

| Ruta               | Descripción                          |
| ------------------ | ------------------------------------ |
| `/`                | Inicio                               |
| `/programas`       | Catálogo                             |
| `/programas/:slug` | Detalle de programa                  |
| `/asesoramiento`   | Asesoramiento                        |
| `/empezar`         | Inscripción                          |
| `/espacio`         | Espacio del alumno                   |
| `/privacidad`      | Información de privacidad de la demo |

## Personalización

La arquitectura separa los componentes visuales de los datos comerciales.

Archivos principales:

- `src/config/site.ts`: marca y configuración general.
- `src/data/programs.ts`: programas y fotografías.
- `src/data/faqs.ts`: preguntas frecuentes.
- `src/styles/tokens.css`: identidad visual.
- `src/features/intake/`: inscripción.

Esto permite adaptar la web a diferentes profesionales sin reconstruir toda su arquitectura.

Consultar `docs/CUSTOMIZAR.md` para más información.

## Estado de desarrollo

### Implementado

- Sitio multipágina.
- Diseño responsive.
- Navegación móvil.
- Catálogo filtrable.
- Detalles de programas.
- Formulario demostrativo.
- Portal demostrativo.
- Animaciones y transiciones.

### Pendiente

- Autenticación.
- Base de datos.
- Panel administrativo.
- Inscripciones reales.
- Biblioteca de videos.
- Gestión de alumnos.
- Rutinas persistentes.
- Seguimiento individual.
- Integraciones comerciales.

## Calidad y accesibilidad

El proyecto incorpora:

- TypeScript estricto.
- Componentes reutilizables.
- Estructura modular.
- Reglas de formato.
- Comprobaciones de código.
- HTML semántico.
- Estados de interacción.
- Diseño responsive.
- Preferencias de movimiento reducido.

La compatibilidad completa con WCAG y los resultados de rendimiento todavía requieren auditorías adicionales.

## Referencias de diseño

Inspiración visual y funcional:

- Studio Bon: identidad editorial.
- BLOOM Reformer Pilates: composición fotográfica.
- Alo Moves: presentación de programas y experiencia de plataforma.

Las referencias se utilizan como inspiración conceptual. No se reproduce su código ni su contenido.

## Fotografías

Las fotografías actuales son ilustrativas y se cargan desde Unsplash.

Antes de comercializar o publicar una versión definitiva para un cliente, será necesario revisar los permisos de utilización y sustituir el material cuando corresponda.

## Privacidad

El formulario de demostración no almacena ni transmite respuestas a un backend.

El portal utiliza datos ficticios y estados temporales.

Para una versión comercial con información real se deberán implementar autenticación, protección de datos y mecanismos de almacenamiento adecuados.

## Roadmap

1. Refinamiento visual y experiencia móvil.
2. Mejoras comerciales y de navegación.
3. Animaciones avanzadas.
4. Formulario y experiencia del alumno.
5. Configuración reutilizable para clientes.
6. Integraciones, backend y producción.

## Repositorio

https://github.com/CamiloVenesia/forma-studio

---

FORMA Studio es un proyecto de desarrollo web orientado a combinar identidad visual, experiencia de usuario, ingeniería de software y escalabilidad comercial.
