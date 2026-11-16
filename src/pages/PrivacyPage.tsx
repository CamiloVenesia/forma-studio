import { Link } from 'react-router-dom';

export function PrivacyPage() {
  return (
    <section className="legal-page container">
      <span className="eyebrow">INFORMACIÓN / PRIVACIDAD</span>

      <h1 className="display-title">
        Tu privacidad
        <br />
        <em>importa.</em>
      </h1>

      <div className="legal-content">
        <p>
          FORMA Studio busca ofrecer una experiencia de navegación clara y respetuosa con la
          privacidad de quienes visitan el sitio.
        </p>

        <h2>Rutinas y progreso</h2>

        <p>
          La sección de rutinas permite marcar sesiones completadas sin crear una cuenta. Cuando el
          navegador lo permite, el progreso se guarda localmente en ese dispositivo. No se
          sincroniza con un servidor.
        </p>

        <h2>Preferencias de entrenamiento</h2>

        <p>
          El formulario de preparación de consultas permite seleccionar objetivos y preferencias.
          Actualmente no realiza un envío automático al servidor. El resumen puede copiarse
          manualmente por decisión del visitante.
        </p>

        <h2>Recursos y enlaces externos</h2>

        <p>
          Las fotografías y tipografías principales se sirven desde el propio sitio. Algunos enlaces
          pueden dirigirte a plataformas externas, cuyas políticas de privacidad son independientes.
        </p>

        <p>
          El servicio de alojamiento puede procesar registros técnicos necesarios para entregar el
          sitio y mantener su seguridad.
        </p>

        <h2>Información sensible</h2>

        <p>
          No compartas diagnósticos, estudios médicos ni información clínica sensible mediante los
          formularios o enlaces públicos.
        </p>

        <h2>Control de tus datos</h2>

        <p>
          Podés reiniciar tu progreso desde la sección de rutinas o eliminar los datos del sitio
          mediante la configuración de tu navegador.
        </p>

        <Link className="underlined-link" to="/">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
