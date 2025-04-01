import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link href={`/productos/${product.id}`}>
        <div className="product-image">
          <Image 
            src={product.image} 
            alt={product.name} 
            width={300} 
            height={300}
            className="product-img"
          />
          {product.discount > 0 && (
            <span className="discount-badge">-{product.discount}%</span>
          )}
        </div>
        
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-category">{product.category}</p>
          
          <div className="product-price">
            <span className="price">${product.price.toFixed(2)}</span>
            {product.discount > 0 && (
              <span className="original-price">
                ${(product.price / (1 - product.discount / 100)).toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>
      
      <button className="btn-primary add-to-cart">
        Agregar al carrito
      </button>
    </div>
  );
}
