import { getProductById, getRelatedProducts } from '../../lib/mockData';
import ProductDetail from '../../components/ProductDetail';
import ProductSlider from '../../components/ProductSlider';
import Counter from '../../components/Counter';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function ProductDetailPage({ params }) {
  const { id } = params;
  const product = getProductById(Number(id));
  
  if (!product) {
    notFound();
  }
  
  const relatedProducts = getRelatedProducts(product.category, product.id);
  
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
            <Counter />
          </div>
          
          <button className="btn-primary add-to-cart">
            Agregar al carrito
          </button>
        </div>
      </div>
      
      <section className="related-products">
        <h2>Productos relacionados</h2>
        <ProductSlider products={relatedProducts} />
      </section>
    </div>
  );
}