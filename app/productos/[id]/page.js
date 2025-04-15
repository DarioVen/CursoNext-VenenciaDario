'use client';

import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { getProductById, getRelatedProducts } from '../../firebase/firebaseUtils';
import ProductDetail from '../../components/ProductDetail';
import ProductSlider from '../../components/ProductSlider';
import Counter from '../../components/Counter';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { addToCart } from '../../firebase/cartUtils';
import { use } from 'react';

export default function ProductDetailPage({ params }) {
  const { id } = params;  
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const userId = 'testUser';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getProductById(id);
        if (!productData) {
          notFound();
          return;
        }
        setProduct(productData);
        if (productData.variants && productData.variants.length > 0) {
          setSelectedVariant(productData.variants[0]);
        }
        
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

  const handleAddToCart = async () => {
    // Check stock availability
    const currentStock = product.variants?.length > 0 ? selectedVariant?.stock : product.stock;
    
    if (!currentStock || currentStock < quantity) {
      await Swal.fire({
        title: 'Error',
        text: 'No hay suficiente stock disponible',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }

    setAddingToCart(true);
    try {
      const productToAdd = {
        ...product,
        variant: product.variants?.length > 0 ? selectedVariant : null,
      };
      
      await addToCart(userId, productToAdd, quantity);
      
      await Swal.fire({
        title: '¡Producto agregado!',
        text: `${product.name} se ha agregado al carrito`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
        position: 'top-end',
        toast: true
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      await Swal.fire({
        title: 'Error',
        text: 'No se pudo agregar el producto al carrito',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return notFound();
  }

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
          
          {product?.variants && (
            <div className="variant-selector">
              <label>Variantes:</label>
              <select 
                value={selectedVariant?.id} 
                onChange={(e) => {
                  const variant = product.variants.find(v => v.id === e.target.value);
                  setSelectedVariant(variant);
                }}
              >
                {product.variants.map(variant => (
                  <option key={variant.id} value={variant.id}>
                    {variant.name} - Stock: {variant.stock}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="quantity-selector">
            <span>Cantidad:</span>
            <Counter 
              initialValue={1} 
              onChange={setQuantity}
              disabled={addingToCart}
              max={selectedVariant?.stock || 0}
            />
            <span className="stock-info">
              Stock disponible: {selectedVariant?.stock || 0}
            </span>
          </div>
          
          <button 
            className="btn-primary add-to-cart"
            onClick={handleAddToCart}
            disabled={
              addingToCart || 
              (product?.variants?.length > 0 
                ? (!selectedVariant || selectedVariant.stock < quantity)
                : !product?.stock || product.stock < quantity)
            }
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