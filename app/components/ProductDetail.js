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
          />
        </div>
        
        <div className="thumbnail-images">
          {product.gallery?.map((img, index) => (
            <div key={index} className="thumbnail">
              <Image 
                src={img} 
                alt={`${product.name} ${index + 1}`} 
                width={80} 
                height={80}
                className="product-img-thumbnail"
              />
            </div>
          ))}
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
      </div>
    </div>
  );
}