import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-info">
          <h3>Tienda Online</h3>
          <p>Tu tienda de confianza para todo tipo de productos.</p>
        </div>
        
        <div className="footer-links">
          <div className="footer-links-column">
            <h4>Enlaces</h4>
            <ul>
              <li><Link href="/">Inicio</Link></li>
              <li><Link href="/productos">Productos</Link></li>
              <li><Link href="/nosotros">Nosotros</Link></li>
              <li><Link href="/contacto">Contacto</Link></li>
            </ul>
          </div>
          
          <div className="footer-links-column">
            <h4>Categorías</h4>
            <ul>
              <li><Link href="/productos?categoria=electronics">Electrónica</Link></li>
              <li><Link href="/productos?categoria=clothing">Ropa</Link></li>
              <li><Link href="/productos?categoria=home">Hogar</Link></li>
            </ul>
          </div>
          
          <div className="footer-links-column">
            <h4>Soporte</h4>
            <ul>
              <li><Link href="/faq">Preguntas frecuentes</Link></li>
              <li><Link href="/envios">Envíos</Link></li>
              <li><Link href="/devoluciones">Devoluciones</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-social">
          <h4>Síguenos</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Tienda Online. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}