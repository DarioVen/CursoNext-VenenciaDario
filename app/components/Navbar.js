'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getCart } from '../firebase/cartUtils';

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const userId = 'testUser';

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const cart = await getCart(userId);
        const count = cart.items.reduce((total, item) => total + item.quantity, 0);
        setCartCount(count);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCartCount();

    const interval = setInterval(fetchCartCount, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <Link href="/" className="logo-link">
          <Image 
            src="/images/logo.jfif"
            alt="Logo"
            width={150}
            height={50}
            className="logo-image"
          />
        </Link>
        <nav className="navbar-menu">
          <ul className="navbar-links">
            <li><Link href="/">Inicio</Link></li>
            <li><Link href="/productos">Productos</Link></li>
            <li><Link href="/nosotros">Nosotros</Link></li>
            <li><Link href="/contacto">Contacto</Link></li>
          </ul>
        </nav>
        
        <div className="navbar-actions">
          <button className="btn-icon search-toggle">
            <i className="icon-search">🔍</i>
          </button>
          <Link href="/carrito" className="btn-icon cart">
            <i className="icon-cart">🛒</i>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
          <Link href="/login" className="btn-icon">
            <i className="icon-login">🔐</i>
          </Link>
          <Link href="/registro" className="btn-icon">
            <i className="icon-register">📝</i>
          </Link>
          <Link href="/admin" className="btn-icon admin">
            <i className="icon-user">👤</i>
          </Link>
        </div>
      </div>
    </nav>
  );
}
