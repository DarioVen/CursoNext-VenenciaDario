'use client';

import { useState, useEffect } from 'react';
import { getProductById } from '../../firebase/firebaseUtils';
import ProductDetail from '../../components/ProductDetail';
import { notFound } from 'next/navigation';

export default function ProductDetailPage({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(params.id);
        if (!productData) {
          notFound();
          return;
        }
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return notFound();
  }

  return (
    <div className="product-detail-page">
      <ProductDetail product={product} />
    </div>
  );
}


export async function generateMetadata({ params }) {
  const product = await getProductById(params.id);

  if (!product) {
    return {
      title: 'Producto no encontrado',
      description: 'El producto que buscas no existe',
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
  };
}
