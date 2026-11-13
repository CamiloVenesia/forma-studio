# FORMA Studio — Case study para portfolio

## Resumen

Un concepto premium de experiencia digital para el sector fitness y pilates, diseñado para representar el equilibrio entre el lenguaje editorial de un estudio boutique y la claridad operativa de una plataforma de programas.

## Problema

Muchos profesionales del rubro dependen de redes sociales y formularios genéricos que presentan el servicio de forma fragmentada. La propuesta explora una experiencia de presentación, descubrimiento de programas y captación desde un mismo sitio.

## Objetivos de diseño

- Un primer contacto elegante, con identidad visual atemporal y sin clichés de interfaces genéricas.
- Navegación y lectura optimizadas para el teléfono móvil.
- Claridad de disciplinas (fuerza/pilates) y modalidades (online/presencial).
- Formularios guiados con preguntas condicionales y validación.
- Arquitectura reutilizable para distintas marcas del mismo sector.
- Fundaciones para un área de alumnos futura, claramente diferenciada de las funciones ya disponibles.

## Decisiones

1. **Marca ficticia**: FORMA permite mostrar la propuesta comercial sin usar fotos ni biografía de una profesional que no autorizó el proyecto.
2. **Paleta marfil/oliva**: equilibrio entre fuerza y bienestar, evitando un estilo excesivamente clínico o deportivo.
3. **Recortes arqueados**: jerarquía visual creada con imágenes orgánicas y espacios negativos; las animaciones acompañan el recorrido.
4. **Catálogo parametrizado**: configuración y datos separados del render permiten reutilización comercial.
5. **Captación prudente**: el formulario recorre cuatro etapas pero no simula envíos reales ni conserva datos de salud.
6. **Portal demostrativo**: permite explicar la visión futura y probar interacción sin fabricar un backend o credenciales ficticias.

## Tecnologías

React, TypeScript, Vite, React Router, Motion, CSS mobile-first, ESLint, Prettier y Vitest.

## Estado de entrega

**Prototipo funcional de frontend.** No publicado ni probado contra usuarios reales; no incluye autenticación, almacenamiento, pagos ni conectores de CRM. Métricas de conversión, rendimiento y accesibilidad deben medirse en un deployment real antes de afirmarlas públicamente.

## Próximos pasos

1. Instalar dependencias y correr lint, typecheck, pruebas y build.
2. Ejecutar auditoría Lighthouse y pruebas de teclado/dispositivos reales.
3. Optimizar imágenes localmente y configurar metadatos del dominio definitivo.
4. Integrar un endpoint seguro con consentimiento y un mecanismo anti-abuso.
5. Iniciar portal autenticado con permisos por profesional y alumno.

## Referencias de dirección creativa

Studio Bon (editorial), BLOOM Reformer Pilates (formas de imágenes) y Alo Moves (estructura digital de servicios). No se copiaron recursos ni código de esas webs.
