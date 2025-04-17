'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { addToCart } from '../firebase/cartUtils';
import { getAuth } from 'firebase/auth';
import Swal from 'sweetalert2';

export default function ProductCard({ product }) {
  const auth = getAuth();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    if (!auth.currentUser) {
      await Swal.fire({
        title: 'Error',
        text: 'Debes iniciar sesión para agregar productos al carrito',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }

    setLoading(true);
    try {
      await addToCart(auth.currentUser.uid, product);
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
      setLoading(false);
    }
  };

  return (
    <div className="product-card">
      <Link href={`/productos/${product.id}`} className="product-link">
        <div className="product-image">
          <Image 
            src={product.image} 
            alt={product.name} 
            width={300} 
            height={300}
            className="product-img"
          />
        </div>
        
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-category">{product.category}</p>
          <div className="product-price">
            <span className="price">${product.price.toFixed(2)}</span>
          </div>
        </div>
      </Link>
      
      <button 
        className="btn-add-to-cart"
        onClick={handleAddToCart}
        disabled={loading}
      >
        {loading ? 'Agregando...' : 'Agregar al carrito'}
      </button>
    </div>
  );
}
