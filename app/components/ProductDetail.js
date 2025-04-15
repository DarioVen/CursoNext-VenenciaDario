import Image from 'next/image';
import { useState } from 'react';

export default function ProductDetail({ product }) {
  const [currentImage, setCurrentImage] = useState(product.image);

  const handleImageClick = (img) => {
    setCurrentImage(img);
  };

  return (
    <div className="product-detail">
      <div className="product-images">
        <div className="main-image">
          <Image 
            src={currentImage} 
            alt={product.name} 
            width={500} 
            height={500}
            className="product-img-main"
            priority
          />
        </div>
        
        <div className="thumbnail-images">
          <div className="thumbnail" onClick={() => handleImageClick(product.image)}>
            <Image 
              src={product.image} 
              alt={product.name} 
              width={80} 
              height={80}
              className={`product-img-thumbnail ${currentImage === product.image ? 'active' : ''}`}
            />
          </div>
          {product.gallery?.map((img, index) => (
            <div key={index} className="thumbnail" onClick={() => handleImageClick(img)}>
              <Image 
                src={img} 
                alt={`${product.name} ${index + 1}`} 
                width={80} 
                height={80}
                className={`product-img-thumbnail ${currentImage === img ? 'active' : ''}`}
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