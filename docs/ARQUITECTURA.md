# Arquitectura técnica — FORMA Studio

## Principios

1. **Mobile-first**: estilos base para teléfono. Se añaden mejoras progresivas a 768 px, 1024 px y 1200 px.
2. **Marketing desacoplado del contenido**: `src/config/site.ts` y `src/data/*.ts` reúnen información editable para cada cliente.
3. **Diseño editorial reutilizable**: los componentes de `src/components` reciben datos, no contienen información personal de profesionales.
4. **Privacidad de demostración**: no se guarda ni envía información; el portal mantiene su estado en memoria.
5. **Accesibilidad**: semántica HTML, labels, estados de selección, tamaños táctiles, navegación de teclado y `prefers-reduced-motion`.
6. **Animación progresiva**: Motion para transiciones controladas, CSS para tipografía deslizante y microinteracciones. Sin animaciones indispensables para comprender o usar el sitio.
7. **Escalabilidad**: las rutas y la estructura admiten integración posterior con auth, almacenamiento privado, CMS y panel de la profesional.

## Árbol funcional

```text
src/
  app/                 Rutas y efectos de navegación
  components/common/   Componentes UI genéricos
  components/layout/   Header, Footer y layout global
  components/sections/ Secciones de la portada
  config/              Marca, textos generales, canales y recursos
  data/                Programas, preguntas frecuentes y rutinas ficticias
  features/intake/     Formulario, modelo y reglas de validación
  pages/               Vistas que corresponden a rutas
  styles/              Variables, elementos, portada, páginas, wizard y portal
  types/               Modelos del dominio
  utils/               Helpers puros
```

## Rutas

- `/` — landing editorial.
- `/programas` — catálogo con filtros.
- `/programas/:slug` — programa individual.
- `/asesoramiento` — roadmap del seguimiento.
- `/empezar` — formulario paso a paso.
- `/espacio` — demo de rutinas con progreso efímero.
- `/privacidad` — explicación honesta sobre los datos en la demo.

## Próxima evolución técnica

**Fase 2**: definir proveedor de autenticación; cuentas y permisos; base de datos con aislamiento por alumno; videoteca propia o sistema autorizado; gestión de entrenamientos por profesional. **No guardar datos de salud sin base legal, minimización y controles apropiados.**

**Fase 3**: panel de administración con autorización por rol, rutinas asignables, seguimiento, avisos, logs y pruebas integrales del backend.

## Notas de publicación

- Las fotografías remotas deben sustituirse por recursos propios o con licencia verificada. Optimizar y servir localmente cuando corresponda.
- Sustituir los textos legales de la demo por una política redactada para el negocio real.
- Conectar formulario sólo a un proveedor seguro con protección anti-spam, autorización y manejo de errores.
- Definir teléfono, localización, servicios, tarifas y horarios reales sólo cuando el cliente los confirme.
- Completar SEO específico, sitemap y habilitar robots de indexación al iniciar un sitio oficial.
- El `vercel.json` aporta reescritura SPA y algunos encabezados; ajustar CSP en producción según assets, fuentes y proveedores externos.
