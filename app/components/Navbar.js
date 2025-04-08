import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
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
            <li>
              <Link href="/">Inicio</Link>
            </li>
            <li>
              <Link href="/productos">Productos</Link>
            </li>
            <li>
              <Link href="/nosotros">Nosotros</Link>
            </li>
            <li>
              <Link href="/contacto">Contacto</Link>
            </li>
          </ul>
        </nav>
        
        <div className="navbar-actions">
          <button className="btn-icon search-toggle">
            <i className="icon-search">🔍</i>
          </button>
          <Link href="/carrito" className="btn-icon cart">
            <i className="icon-cart">🛒</i>
            <span className="cart-count">3</span>
          </Link>
          <Link href="/admin" className="btn-icon admin">
            <i className="icon-user">👤</i>
          </Link>
        </div>
      </div>
    </nav>
  );
}
