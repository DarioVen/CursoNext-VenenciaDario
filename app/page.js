'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <h1>Bienvenido a nuestra tienda</h1>
        <p>Descubre nuestros productos</p>
        <Link href="/productos" className="btn-primary">
          Ver catálogo
        </Link>
      </section>
    </div>
  );
}