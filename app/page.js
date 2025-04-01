import Link from 'next/link';
import { getFeaturedProducts } from './lib/mockData';
import ProductCard from './components/ProductCard';

export default function Home() {
  const featuredProducts = getFeaturedProducts();
  
  return (
    <div className="home-page">
      <section className="hero">
        <h1>Bienvenido a nuestra tienda</h1>
        <p>Descubre nuestros productos destacados</p>
        <Link href="/productos" className="btn-primary">
          Ver catálogo
        </Link>
      </section>
      
      <section className="featured-products">
        <h2>Productos destacados</h2>
        <div className="products-grid">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}