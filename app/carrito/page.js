import { getCartItems } from '../lib/mockData';
import CartItem from '../components/CartItem';
import Link from 'next/link';

export default function CartPage() {
  const cartItems = getCartItems();
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + shipping;
  
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
              <CartItem key={item.id} item={item} />
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