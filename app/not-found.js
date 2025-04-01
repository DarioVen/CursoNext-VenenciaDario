import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <Link href="/" className="btn-primary">
        Volver al inicio
      </Link>
    </div>
  );
}