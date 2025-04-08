'use client';

import { useState, useEffect } from 'react';
import { getProductById, getRelatedProducts } from '../../firebase/firebaseUtils';
import ProductDetail from '../../components/ProductDetail';
import ProductSlider from '../../components/ProductSlider';
import Counter from '../../components/Counter';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { addToCart } from '../../firebase/cartUtils';

export default function ProductDetailPage({ params }) {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getProductById(id);
        if (!productData) {
          notFound();
          return;
        }
        setProduct(productData);
        
        const related = await getRelatedProducts(productData.category, id);
        setRelatedProducts(related);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return notFound();
  }

  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const userId = 'testUser'; // Temporary userId

  const handleAddToCart = async () => {
    setAddingToCart(true);
    try {
      await addToCart(userId, product, quantity);
      alert('Producto agregado al carrito');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error al agregar al carrito');
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <div className="product-detail-page">
      <nav className="breadcrumbs">
        <Link href="/">Inicio</Link> &gt; 
        <Link href="/productos">Productos</Link> &gt; 
        <span>{product.name}</span>
      </nav>
      
      <div className="product-detail-container">
        <ProductDetail product={product} />
        
        <div className="product-actions">
          <div className="product-price">
            <span className="price">${product.price.toFixed(2)}</span>
            {product.discount > 0 && (
              <span className="original-price">
                ${(product.price / (1 - product.discount / 100)).toFixed(2)}
              </span>
            )}
          </div>
          
          <div className="quantity-selector">
            <span>Cantidad:</span>
            <Counter 
              initialValue={1} 
              onChange={setQuantity}
              disabled={addingToCart}
            />
          </div>
          
          <button 
            className="btn-primary add-to-cart"
            onClick={handleAddToCart}
            disabled={addingToCart}
          >
            {addingToCart ? 'Agregando...' : 'Agregar al carrito'}
          </button>
        </div>
      </div>
      
      {relatedProducts.length > 0 && (
        <section className="related-products">
          <h2>Productos relacionados</h2>
          <ProductSlider products={relatedProducts} />
        </section>
      )}
    </div>
  );
}