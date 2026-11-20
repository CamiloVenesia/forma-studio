
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
          En FORMA Studio valoramos la privacidad de las
          personas que visitan nuestro sitio y se interesan
          por nuestras propuestas de entrenamiento.
        </p>

        <p>
          En esta página explicamos qué información
          recopilamos, para qué la utilizamos, cómo se
          transmite y cuáles son las opciones disponibles
          para consultar o solicitar la eliminación de
          tus datos.
        </p>

        <h2>1. Información que recopilamos</h2>

        <p>
          Cuando completás el formulario de entrenamiento,
          solicitamos información necesaria para conocer
          tu punto de partida y poder responder a tu consulta.
        </p>

        <p>
          Esta información puede incluir tu nombre y apellido,
          edad, ciudad, número de WhatsApp o teléfono,
          disciplina elegida, modalidad de entrenamiento,
          objetivos, experiencia, disponibilidad y
          equipamiento.
        </p>

        <p>
          El formulario también pregunta si tenés alguna
          lesión o molestia. Si respondés afirmativamente,
          se solicita una breve explicación para conocer
          las circunstancias que deberían considerarse
          antes de conversar sobre una propuesta de
          entrenamiento.
        </p>

        <p>
          Las respuestas identificadas como obligatorias
          son necesarias para completar la solicitud.
          Los comentarios adicionales son opcionales.
          No es necesario enviar estudios médicos,
          historias clínicas ni diagnósticos detallados.
        </p>

        <h2>2. Para qué utilizamos tus datos</h2>

        <p>
          La información que compartís se utiliza para
          recibir y revisar tu solicitud, comprender tus
          preferencias de entrenamiento y comunicarnos
          con vos a través del teléfono o WhatsApp
          que indiques.
        </p>

        <p>
          El envío del formulario no implica una
          contratación automática, un pago ni la
          asignación inmediata de un programa
          personalizado.
        </p>

        <p>
          Los datos recibidos mediante este formulario
          no están destinados al envío automático de
          publicidad ni a la elaboración de perfiles
          comerciales para terceros.
        </p>

        <h2>3. Cómo se envía tu solicitud</h2>

        <p>
          Al presionar el botón de envío, las respuestas
          se transmiten a una función de servidor
          alojada en Vercel, que realiza las
          comprobaciones necesarias antes de procesar
          la solicitud.
        </p>

        <p>
          Si la solicitud supera las validaciones, el
          servidor utiliza un servicio de correo
          electrónico para enviar las respuestas a
          la casilla de FORMA Studio.
        </p>

        <p>
          Actualmente utilizamos Gmail como servicio
          de correo y la cuenta{' '}
          <a href="mailto:formastudiofit2000@gmail.com">
            formastudiofit2000@gmail.com
          </a>{' '}
          como destinataria de las solicitudes.
        </p>

        <p>
          Las respuestas no se almacenan en una base
          de datos propia del sitio. Sin embargo, una
          vez enviado el mensaje, su contenido queda
          registrado en el servicio de correo utilizado
          para recibir y gestionar las consultas.
        </p>

        <h2>4. Conservación y seguridad</h2>

        <p>
          Las solicitudes recibidas pueden permanecer
          en la casilla de correo mientras se gestionan
          las consultas y las comunicaciones
          relacionadas con ellas.
        </p>

        <p>
          Actualmente no existe un mecanismo automático
          de eliminación de esos correos. Podés
          solicitar la revisión o eliminación de la
          información que compartiste utilizando el
          canal de contacto indicado más abajo,
          sin perjuicio de las obligaciones legales
          de conservación que pudieran corresponder.
        </p>

        <p>
          Utilizamos comprobaciones de datos y
          mecanismos de control de solicitudes para
          reducir errores y usos indebidos del
          formulario. Ningún sistema de transmisión
          y almacenamiento electrónico puede
          garantizar una seguridad absoluta.
        </p>

        <h2>5. Información sobre lesiones o molestias</h2>

        <p>
          La información relativa a la salud puede
          considerarse un dato personal sensible.
          Por ese motivo, te recomendamos compartir
          solamente la información mínima necesaria
          para explicar tu situación.
        </p>

        <p>
          Este formulario no reemplaza una consulta
          médica, una evaluación física presencial
          ni una indicación de un profesional de la
          salud.
        </p>

        <p>
          Si tenés dolor persistente, una lesión
          diagnosticada o limitaciones importantes
          para realizar actividad física, es
          recomendable contar con orientación de
          un profesional sanitario antes de
          comenzar o modificar tus entrenamientos.
        </p>

        <h2>6. Solicitudes de menores de edad</h2>

        <p>
          El formulario permite realizar consultas
          relacionadas con el entrenamiento de
          personas menores de 18 años.
        </p>

        <p>
          Si sos menor de edad, la solicitud debe
          realizarse con conocimiento e intervención
          de tu madre, padre o representante
          responsable. Antes de comenzar cualquier
          actividad, podrán requerirse autorizaciones
          y comprobaciones adicionales.
        </p>

        <p>
          Completar y enviar el formulario no
          constituye, por sí solo, una verificación
          de la autorización de una persona adulta
          responsable.
        </p>

        <h2>7. Rutinas y progreso local</h2>

        <p>
          La sección de rutinas ofrece sesiones
          y ejercicios de consulta, junto con
          una herramienta para marcar sesiones
          como completadas.
        </p>

        <p>
          Cuando el navegador permite utilizar
          almacenamiento local, ese progreso
          se conserva en el propio dispositivo.
          No está vinculado a una cuenta personal
          ni se sincroniza con un servidor de
          seguimiento de alumnos.
        </p>

        <p>
          Podés reiniciar el progreso desde
          la sección de rutinas o eliminar los
          datos locales mediante las opciones
          de tu navegador.
        </p>

        <h2>8. Servicios y enlaces externos</h2>

        <p>
          FORMA Studio utiliza servicios externos
          para el alojamiento de la página y el
          envío de correos electrónicos, entre
          ellos Vercel y Google.
        </p>

        <p>
          Estos proveedores pueden procesar
          información técnica y prestar sus
          servicios mediante infraestructura
          ubicada en distintos países, conforme
          a sus propias condiciones y políticas
          de privacidad.
        </p>

        <p>
          También podemos incluir enlaces a
          plataformas externas, como Instagram.
          Al ingresar en esas plataformas,
          se aplican sus respectivas políticas.
        </p>

        <h2>9. Tus derechos y contacto</h2>

        <p>
          Podés solicitar información sobre los
          datos personales que compartiste,
          comunicar una corrección o pedir
          su eliminación cuando corresponda.
        </p>

        <p>
          Para realizar una consulta relacionada
          con tus datos, escribinos a{' '}
          <a href={`mailto:${site.brand.email}`}>
            {site.brand.email}
          </a>
          .
        </p>

        <p>
          En Argentina, el tratamiento de datos
          personales se encuentra regulado por
          la Ley 25.326. La Agencia de Acceso
          a la Información Pública es el organismo
          de control competente en materia de
          protección de datos personales.
        </p>

        <h2>10. Actualizaciones</h2>

        <p>
          Esta información podrá actualizarse
          cuando cambien las funcionalidades del
          sitio, los servicios utilizados o los
          procedimientos de tratamiento de datos.
        </p>

        <p>
          Última actualización:
          20 de noviembre de 2026.
        </p>

        <Link className="underlined-link" to="/empezar">
          Volver al formulario
        </Link>
      </div>
    </section>
  );
}
