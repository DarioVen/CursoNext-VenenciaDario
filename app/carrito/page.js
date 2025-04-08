'use client';

import { useState, useEffect } from 'react';
import CartItem from '../components/CartItem';
import Link from 'next/link';
import { getCart } from '../firebase/cartUtils';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Temporary userId - You'll need to implement authentication
  const userId = 'testUser';

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cart = await getCart(userId);
        setCartItems(cart.items || []);
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + shipping;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cart-page">
      <h1>Carrito de Compras</h1>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Tu carrito está vacío</p>
          <Link href="/productos" className="btn-primary">
            Continuar comprando
          </Link>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {cartItems.map(item => (
              <CartItem 
                key={item.productId} 
                item={item}
                userId={userId}
                onUpdate={setCartItems}
              />
            ))}
          </div>
          
          <div className="cart-summary">
            <h2>Resumen del pedido</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Envío</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            
            <button className="btn-primary checkout">
              Finalizar compra
            </button>
            <Link href="/productos" className="continue-shopping">
              Continuar comprando
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}