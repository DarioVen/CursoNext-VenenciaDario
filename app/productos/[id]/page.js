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
