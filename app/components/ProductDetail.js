import Image from 'next/image';

export default function ProductDetail({ product }) {
  return (
    <div className="product-detail">
      <div className="product-images">
        <div className="main-image">
          <Image 
            src={product.image} 
            alt={product.name} 
            width={500} 
            height={500}
            className="product-img-main"
            priority
          />
        </div>
      </div>
      
      <div className="product-info">
        <h1 className="product-name">{product.name}</h1>
        <p className="product-category">{product.category}</p>
        
        <div className="product-description">
          <h2>Descripción</h2>
          <p>{product.description}</p>
        </div>
        
        {product.features && (
          <div className="product-features">
            <h2>Características</h2>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        {product.variants && (
          <div className="product-variants">
            <h2>Variantes Disponibles</h2>
            <div className="variants-grid">
              {product.variants.map((variant) => (
                <div key={variant.id} className="variant-item">
                  <span className="variant-name">{variant.name}</span>
                  <span className="variant-stock">Stock: {variant.stock}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}