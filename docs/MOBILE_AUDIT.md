# Auditoría UX/UI móvil — FORMA Studio

## Información de revisión

Proyecto: FORMA Studio

Versión: 1.1.0

Etapa: Bloque 2 — Mobile UX

Referencia: grabación de la interfaz móvil del 13 de noviembre de 2026.

Resolución aproximada: 414 × 866 px.

Duración aproximada: 66 segundos.

## Objetivo

Evaluar la experiencia móvil y definir mejoras de diseño, accesibilidad, legibilidad y navegación.

El proyecto prioriza dispositivos móviles por ser el principal medio de acceso previsto para los usuarios del sector fitness.

## Fortalezas detectadas

- Identidad editorial diferenciada.
- Navegación móvil de pantalla completa.
- Buena composición vertical.
- Fotografías con recortes orgánicos.
- Catálogo adaptado a una columna.
- Formulario con recorrido progresivo.
- Coherencia cromática entre secciones.

## Problemas detectados

### 1. Portada

La fotografía principal aparece demasiado abajo en la experiencia móvil.

Es necesario equilibrar la jerarquía entre título, descripción, CTA e imagen.

### 2. Legibilidad

Algunas etiquetas, notas y textos secundarios utilizan tamaños demasiado reducidos.

La interfaz necesita una escala tipográfica más consistente.

### 3. Contraste

Determinados verdes claros sobre el fondo marfil dificultan la lectura.

Deben utilizarse colores más oscuros para contenido textual.

### 4. Espaciados

Existen secciones con espacios verticales excesivos respecto de la cantidad de información presentada.

### 5. Controles táctiles

Algunos filtros y enlaces necesitan superficies de interacción más grandes.

### 6. Catálogo

Los programas ficticios requieren mayor diferenciación de modalidades y beneficios.

### 7. Asesoramiento

Debe diferenciarse claramente el servicio comercial de asesoramiento del futuro portal de entrenamiento.

### 8. Fotografías

Se necesita una dirección fotográfica más específica para diferenciar las disciplinas.

### 9. Formulario

Las validaciones deberán evolucionar hacia mensajes asociados individualmente a cada campo.

## Modificaciones del Bloque 2

### Identidad visual

- Ajuste de colores semánticos.
- Mejora del contraste.
- Revisión de tamaños tipográficos.
- Mejora de la legibilidad de textos secundarios.

### Portada

- Reducción de espacios iniciales.
- Mejora de la descripción comercial.
- Ajuste del equilibrio entre contenido e imagen.

### Navegación

- Mejoras en el menú móvil.
- Gestión de foco.
- Cierre mediante Escape.
- Bloqueo del desplazamiento del fondo.
- Transiciones más breves.

### Catálogo

- Controles de filtro ampliados.
- Campos de selección adaptados a dispositivos táctiles.
- Mejoras en la jerarquía de los programas.

### Portal

- Textos y controles más legibles.
- Mejor presentación de ejercicios.
- Ajustes del diseño responsive.

### Formulario

- Campos de texto de 16 px.
- Opciones seleccionables más grandes.
- Distribución móvil en una columna.
- Mejoras en el diseño de mensajes y estados.

## Verificaciones pendientes

### Responsive

Comprobar las siguientes resoluciones:

- 320 px.
- 360 px.
- 390 px.
- 414 px.
- 430 px.
- 768 px.
- 1024 px.
- 1440 px.

Revisar desbordamiento horizontal, legibilidad y composición.

### Navegación

Verificar:

- Tab.
- Shift + Tab.
- Enter.
- Escape.
- Apertura y cierre del menú.
- Navegación entre rutas.
- Retorno del foco.

### Accesibilidad

Verificar:

- Contraste WCAG.
- Tamaños táctiles.
- Estados de foco.
- Movimiento reducido.
- Zoom al 200 %.
- Compatibilidad con lectores de pantalla.

### Rendimiento

Medir:

- Largest Contentful Paint.
- Cumulative Layout Shift.
- Interaction to Next Paint.
- Peso de imágenes.
- Carga en redes móviles.

### Navegadores

Validar especialmente:

- Chrome Android.
- Safari iOS.
- Chrome de escritorio.
- Firefox de escritorio.

## Próximas etapas

### Bloque 3

Claridad comercial, catálogo y arquitectura de contenidos.

### Bloque 4

Animaciones y microinteracciones avanzadas.

### Bloque 5

Experiencia de inscripción y evolución del portal de alumnos.

### Bloque 6

Configuración comercial reutilizable, documentación y pruebas finales.

## Validación del código

Ejecutar:

```bash
npm install
npm run format
npm run check
npm run dev
```

La ejecución local debe confirmar que la actualización no introduce errores.

## Estado

Implementación del Bloque 2 preparada.

Validación funcional, visual y compilación definitiva pendientes de ejecución en el entorno local.

No debe considerarse aprobado hasta completar las verificaciones correspondientes.
