import { Link } from 'react-router-dom';

export function PrivacyPage() {
  return (
    <section className="legal-page container">
      <span className="eyebrow">INFORMACIÓN / PRIVACIDAD</span>
      <h1 className="display-title">
        Privacidad
        <br />
        <em>en esta demo.</em>
      </h1>
      <div className="legal-content">
        <p>
          FORMA Studio es un proyecto demostrativo sin relación comercial con un estudio o
          profesional real. El formulario se ejecuta enteramente dentro de tu navegador: no realiza
          solicitudes para enviar los datos personales a un servidor, no genera cuentas y no los
          guarda en almacenamiento local.
        </p>
        <p>
          Al cerrar o actualizar esta página se descartan los campos del formulario. El botón
          “Copiar resumen” funciona sólo si lo elegís y excluye detalles de salud. No se utiliza
          analítica publicitaria ni una herramienta de seguimiento propia.
        </p>
        <p>
          Este sitio carga tipografías desde Google Fonts e imágenes de Unsplash, servicios externos
          que pueden registrar solicitudes técnicas según sus propias políticas. Antes de ofrecerlo
          comercialmente conviene servir recursos localmente y publicar una política de privacidad
          adaptada al proveedor real, su jurisdicción y al formulario final.
        </p>
        <p>
          El área de alumnos utiliza ejemplos ficticios y no conserva el progreso al recargar. Este
          texto no sustituye una política legal definitiva de un servicio real.
        </p>
        <Link className="underlined-link" to="/empezar">
          Volver al formulario →
        </Link>
      </div>
    </section>
  );
}
