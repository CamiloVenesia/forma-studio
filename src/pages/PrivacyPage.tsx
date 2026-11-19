
import { Link } from 'react-router-dom';
import { site } from '../config/site';

export function PrivacyPage() {
  return (
    <section className="legal-page container">
      <span className="eyebrow">
        INFORMACIÓN / PRIVACIDAD
      </span>

      <h1 className="display-title">
        Tu privacidad
        <br />
        <em>importa.</em>
      </h1>

      <div className="legal-content">
        <p>
          FORMA Studio busca ofrecer una experiencia
          de navegación clara y respetuosa con la
          privacidad de quienes visitan el sitio.
        </p>

        <h2>Rutinas y progreso</h2>

        <p>
          La sección de rutinas permite marcar
          sesiones completadas sin crear una cuenta.
          Cuando el navegador lo permite, el
          progreso se guarda localmente en ese
          dispositivo. No se sincroniza con un
          servidor.
        </p>

        <h2>Formulario de entrenamiento</h2>

        <p>
          El formulario de FORMA Studio permite
          compartir nombre, edad, ciudad, WhatsApp,
          objetivos, experiencia y preferencias
          de entrenamiento.
        </p>

        <p>
          Cuando presionás «Enviar solicitud»,
          las respuestas se transmiten mediante
          una conexión HTTPS a una función del
          servidor alojada en Vercel.
        </p>

        <p>
          El servidor valida la información y,
          si la solicitud es válida, prepara
          un correo electrónico destinado a
          FORMA Studio.
        </p>

        <p>
          La dirección utilizada para recibir
          las solicitudes es{' '}
          <a href={`mailto:${site.brand.email}`}>
            {site.brand.email}
          </a>
          .
        </p>

        <h2>Finalidad de la información</h2>

        <p>
          Utilizamos las respuestas para conocer
          las necesidades de entrenamiento,
          evaluar la solicitud y comunicarnos
          con la persona interesada.
        </p>

        <p>
          El formulario no crea una cuenta de
          usuario ni almacena las respuestas
          en una base de datos propia.
        </p>

        <p>
          Los proveedores de alojamiento y
          correo electrónico pueden procesar
          o conservar datos técnicos y mensajes
          de acuerdo con sus servicios y
          políticas de privacidad.
        </p>

        <h2>Información sensible</h2>

        <p>
          El formulario pregunta si existen
          lesiones o molestias que deban tenerse
          en cuenta al preparar una propuesta
          de entrenamiento.
        </p>

        <p>
          Compartí únicamente la información
          necesaria. No incluyas diagnósticos,
          estudios médicos, historias clínicas
          ni otros datos de salud sensibles
          que no quieras transmitir por
          correo electrónico.
        </p>

        <h2>Solicitudes de menores de edad</h2>

        <p>
          Las personas menores de 18 años deben
          completar la solicitud con conocimiento
          y autorización de su madre, padre o
          persona adulta responsable.
        </p>

        <p>
          La recepción de una solicitud no
          significa que se haya aceptado
          automáticamente la inscripción
          ni que se haya autorizado la
          participación en actividades físicas.
        </p>

        <h2>Recursos y enlaces externos</h2>

        <p>
          Las fotografías y tipografías
          principales se sirven desde el propio
          sitio. Algunos enlaces pueden dirigirte
          a plataformas externas con políticas
          de privacidad independientes.
        </p>

        <h2>Control de tus datos</h2>

        <p>
          Podés reiniciar tu progreso de rutinas
          desde la aplicación o eliminar los
          datos locales del sitio mediante
          la configuración de tu navegador.
        </p>

        <p>
          Si querés consultar sobre los datos
          enviados en una solicitud o pedir
          su eliminación, podés comunicarte
          por correo electrónico a{' '}
          <a href={`mailto:${site.brand.email}`}>
            {site.brand.email}
          </a>
          .
        </p>

        <Link
          className="underlined-link"
          to="/"
        >
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
