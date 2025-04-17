'use client';

import { useState, useEffect } from 'react';
import CartItem from '../components/CartItem';
import Link from 'next/link';
import { getCart } from '../firebase/cartUtils';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import './cart.css';

export default function CartPage() {
  const auth = getAuth();
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login');
        return;
      }

      const fetchCart = async () => {
        try {
          const cart = await getCart(user.uid);
          setCartItems(cart.items || []);
        } catch (error) {
          console.error('Error fetching cart:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchCart();
    });

    return () => unsubscribe();
  }, [router]);

  const handleCartUpdate = (updatedItems) => {
    const itemsWithTotals = updatedItems.map(item => ({
      ...item,
      total: parseFloat((item.price * item.quantity).toFixed(2))
    }));
    setCartItems(itemsWithTotals);
  };

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
                key={`${item.productId}-${item.quantity}`}
                item={item}
                onUpdate={handleCartUpdate}
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