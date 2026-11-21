import { Link } from 'react-router-dom';

import { site } from '../config/site';

const contactEmail = site.brand.email;

export function PrivacyPage() {
  return (
    <section className="legal-page container">
      <span className="eyebrow">
        INFORMACIÓN / PRIVACIDAD
      </span>

      <h1 className="display-title">
        Privacidad y
        <br />
        <em>datos personales.</em>
      </h1>

      <div className="legal-content">
        <p>
          <strong>
            Última actualización: 20 de noviembre de 2026.
          </strong>
        </p>

        <p>
          Esta política explica qué información se solicita a
          través del sitio de FORMA Studio, con qué finalidad se
          utiliza y cómo podés realizar consultas sobre tus datos.
        </p>

        <h2>1. Información que se solicita</h2>

        <p>
          El formulario de entrenamiento puede solicitar nombre y
          apellido, edad, ciudad, teléfono o WhatsApp, disciplina
          y modalidad de interés, objetivos, experiencia,
          disponibilidad, lugar de entrenamiento, equipamiento
          disponible y comentarios sobre lesiones o molestias
          que puedan ser relevantes para orientar la consulta.
        </p>

        <h2>2. Para qué se utilizan los datos</h2>

        <p>
          La información se utiliza para revisar tu solicitud,
          conocer qué tipo de entrenamiento estás buscando y
          ponerse en contacto con vos por teléfono o WhatsApp
          para conversar sobre las opciones disponibles. Enviar
          el formulario no implica una contratación automática
          ni garantiza la disponibilidad de un servicio o turno.
        </p>

        <p>
          Los datos no se venden ni se utilizan para enviar
          publicidad de terceros.
        </p>

        <h2>3. Envío de la solicitud y correo electrónico</h2>

        <p>
          Cuando enviás el formulario, las respuestas se
          transmiten mediante una función del servidor y se
          remiten al correo de gestión {contactEmail}. El envío
          se realiza a través de la infraestructura de la
          aplicación; no depende de que abras manualmente tu
          programa de correo.
        </p>

        <p>
          El sitio no utiliza una base de datos propia para
          guardar las respuestas del formulario. Sin embargo,
          el mensaje recibido queda almacenado en la cuenta de
          correo destinataria y puede permanecer allí hasta que
          quien administra esa cuenta lo elimine.
        </p>

        <h2>4. Servicios de terceros</h2>

        <p>
          El sitio utiliza Vercel para alojamiento y ejecución
          de funciones del servidor, y Google Gmail para recibir
          las solicitudes. Estos proveedores pueden procesar
          información técnica necesaria para prestar sus
          servicios y operar desde servidores ubicados en
          distintos países, de acuerdo con sus propias políticas
          de privacidad.
        </p>

        <p>
          La página del gimnasio también puede mostrar contenido
          de Google Maps y enlaces a servicios externos, como
          Instagram. Al abrir esos servicios, se aplican sus
          propias condiciones y políticas de privacidad.
        </p>

        <h2>5. Información sobre salud y bienestar</h2>

        <p>
          El formulario puede incluir una pregunta sobre lesiones
          o molestias para comprender mejor tu situación al
          momento de la consulta. Compartí solamente la
          información que consideres necesaria. No envíes
          estudios, historias clínicas, diagnósticos ni otros
          documentos médicos sensibles a través del formulario.
        </p>

        <h2>6. Conservación de la información</h2>

        <p>
          Las solicitudes se conservan en la cuenta de correo
          mientras sean necesarias para gestionar la consulta
          y mantener la comunicación. No se ha establecido un
          sistema de eliminación automática de esos mensajes.
          Podés solicitar que se revise o elimine la información
          relacionada con tu consulta escribiendo al correo de
          contacto.
        </p>

        <h2>7. Tus derechos y consultas</h2>

        <p>
          Podés solicitar información sobre los datos que
          compartiste, pedir su corrección o solicitar su
          eliminación cuando corresponda. Para realizar una
          consulta relacionada con privacidad, escribí a{' '}
          <a href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>.
        </p>

        <h2>8. Cambios en esta política</h2>

        <p>
          Esta información puede actualizarse cuando cambien
          las funciones del sitio, los servicios utilizados o
          la forma de gestionar las solicitudes. La fecha
          indicada al comienzo permite identificar la última
          revisión publicada.
        </p>

        <p>
          Si tenés dudas sobre el funcionamiento del formulario
          o querés conocer el espacio antes de comenzar, podés
          visitar la sección{' '}
          <Link to="/nuestro-gimnasio">
            Nuestro gimnasio
          </Link>{' '}
          o volver al{' '}
          <Link to="/empezar">
            formulario de entrenamiento
          </Link>.
        </p>

        <Link className="underlined-link" to="/">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}