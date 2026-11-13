# Checklist antes de mostrar el proyecto a un cliente

## Pruebas automáticas

```bash
npm install
npm run format
npm run lint
npm run typecheck
npm run test
npm run build
```

No dar el build por aprobado sin ejecutar los comandos. Al terminar la instalación, versionar `package-lock.json` y usar `npm ci` para CI reproducible.

## Manual — priorizar teléfono

- [ ] iPhone/Android 320, 360, 390, 430 px: textos sin cortes horizontales, imágenes bien encuadradas y botones accesibles.
- [ ] Menú móvil abre/cierra, foco visible, tecla Escape y desplazamiento correcto.
- [ ] Links de navegación y CTA enlazan a rutas existentes; recarga directa de subrutas en hosting SPA.
- [ ] Catálogo: filtrar por disciplina y modalidad; cambiar y limpiar filtros.
- [ ] Detalle de programa: título, fotografía, beneficios y CTA con disciplina preseleccionada.
- [ ] Wizard: requeridos, edad, teléfono, límite de dos objetivos, campos condicionales, volver y finalizar.
- [ ] Wizard: comprobar que no se producen envíos de red ni persistencia y que el resumen no comparte datos de salud.
- [ ] Portal: elegir día, leer indicaciones, marcar/desmarcar sesión, ver barra de progreso, reiniciar.
- [ ] Accesibilidad: recorrer todas las interacciones solo con teclado y con lector de pantalla.
- [ ] `prefers-reduced-motion: reduce`: no reproducir animaciones de desplazamiento innecesarias.
- [ ] Fotos externas visibles. Sustituir las imágenes de muestra por recursos propios antes de la venta.
- [ ] Ejecutar Lighthouse en despliegue real y corregir advertencias significativas de performance, SEO y accesibilidad.

## Antes de publicar para una marca real

- [ ] Confirmar nombre, disciplinas, servicios presenciales y ubicación con el cliente.
- [ ] Solicitar autorización para cualquier foto, biografía o testimonial.
- [ ] Definir formulario real con almacenamiento seguro, protección anti-spam, política de privacidad y consentimiento apropiado.
- [ ] Desactivar `robots.txt` restrictivo solamente cuando el sitio oficial esté autorizado para indexar.
- [ ] Revisar los enlaces, datos de contacto, texto legal y dominio finales.
- [ ] Si se agrega autenticación, probar autorización por roles y aislamiento de datos por alumno.
