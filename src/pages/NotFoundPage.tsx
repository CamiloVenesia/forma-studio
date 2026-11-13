import { ArrowLink } from '../components/common/ArrowLink';
export function NotFoundPage() {
  return (
    <section className="not-found container">
      <span className="eyebrow">ERROR 404 / CAMINO NO ENCONTRADO</span>
      <h1 className="display-title">
        Este camino
        <br />
        <em>no está acá.</em>
      </h1>
      <p>La página que buscabas no existe. Volvé a explorar desde el inicio.</p>
      <ArrowLink to="/">Volver al inicio</ArrowLink>
    </section>
  );
}
