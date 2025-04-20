'use client';

import { useState, useEffect } from 'react';
import { getCart } from '../firebase/cartUtils';
import { createOrder } from '../firebase/orderUtils';
import CartItem from '../components/CartItem';
import Link from 'next/link';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import './cart.css';

export default function CartPage() {
  const auth = getAuth();
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 10 : 0; // Fixed shipping cost of $10 if cart is not empty
  const total = subtotal + shipping;

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

  const handleCheckout = async () => {
    if (!auth.currentUser) return;

    try {
      const orderData = {
        items: cartItems,
        subtotal,
        shipping,
        total,
        shippingAddress: "Default Address" 
      };

      await createOrder(auth.currentUser.uid, orderData);
      
      await Swal.fire({
        title: '¡Pedido realizado!',
        text: 'Tu pedido ha sido procesado con éxito',
        icon: 'success',
        confirmButtonText: 'Ok'
      });

      setCartItems([]); 
      router.push('/productos');
    } catch (error) {
      console.error('Error creating order:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo procesar tu pedido',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
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
                userId={auth.currentUser?.uid}
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
            
            <button 
              className="btn-primary checkout"
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
            >
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