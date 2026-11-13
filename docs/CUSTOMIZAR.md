# Adaptar FORMA Studio a otro gimnasio, entrenadora o estudio de pilates

## 1. Identidad

Modificar `src/config/site.ts`: marca, subtítulo, lema y textos. También reemplazar `favicon.svg` y metadatos de `index.html`.

## 2. Programas

Modificar el arreglo de `src/data/programs.ts`. Cada ítem define `slug`, disciplina, textos, imagen, modalidad, beneficios y ejemplo. No publicar promesas terapéuticas o resultados garantizados.

## 3. Imágenes

Sustituir las URLs de `src/config/site.ts` y de `src/data/programs.ts` por fotos autorizadas del negocio o material licenciado. Propuesta visual: recortes arqueados y fotos de movimiento auténtico, sin usar fotografías del perfil de una persona que no consintió su uso.

## 4. Estilos

Los tokens de color están en `src/styles/tokens.css`. Cambiá colores globales en ese archivo, antes de tocar las reglas de cada sección. Tipografías desde `index.html`.

## 5. Formulario

`src/features/intake/IntakeWizard.tsx` presenta los campos; `model.ts` guarda reglas, objetivos y la estructura. Actualmente la demo **no envía ni guarda nada**. No basta con introducir un número de teléfono para usarlo en producción: requiere backend/proveedor, política de privacidad y controles de seguridad.

## 6. Portal de alumnos

`src/pages/PortalPreviewPage.tsx` usa datos ficticios de `src/data/workouts.ts`. El estado se reinicia al recargar. Nunca afirmar que son rutinas asignadas a alumnos reales. Para producirlo, implementar autenticación robusta, autorización por cuenta y privacidad.

## 7. Comprobación

```bash
npm install
npm run format
npm run lint
npm run typecheck
npm run test
npm run build
npm run dev
```

Al publicar, usar un servicio SPA compatible o las reglas de reescritura incluidas.
