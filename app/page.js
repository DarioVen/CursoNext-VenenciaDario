'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getFeaturedProducts } from './firebase/firebaseUtils';
import ProductCard from './components/ProductCard';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getFeaturedProducts();
        setFeaturedProducts(products);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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