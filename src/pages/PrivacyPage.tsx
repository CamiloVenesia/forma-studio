
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

        <h2>Formulario de entrenamiento</h2>

        <p>
          El formulario de FORMA Studio permite compartir datos de contacto, objetivos, experiencia
          y preferencias de entrenamiento. Al finalizar, el sitio prepara un correo con las
          respuestas y solicita abrir la aplicación de correo del dispositivo. La información solo
          se envía si la persona revisa y confirma el envío desde esa aplicación. El sitio no guarda
          las respuestas ni las transmite automáticamente a un servidor.
        </p>

        <p>
          Si la aplicación de correo no se abre, se puede copiar el resumen y enviarlo por otro
          canal. Una vez enviado, el tratamiento del mensaje depende del proveedor de correo y de la
          persona destinataria.
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
          El formulario consulta si tenés lesiones o molestias para orientar la propuesta de
          entrenamiento. Compartí únicamente los detalles que consideres necesarios. No incluyas
          diagnósticos, estudios médicos ni información clínica sensible que no quieras enviar por
          correo electrónico.
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
