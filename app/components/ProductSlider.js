'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';

export default function ProductSlider({ products, slidesToShow = 4 }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const nextSlide = () => {
    if (currentSlide < products.length - slidesToShow) {
      setCurrentSlide(currentSlide + 1);
    }
  };
  
  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };
  
  return (
    <div className="product-slider">
      <button 
        className="slider-btn prev" 
        onClick={prevSlide}
        disabled={currentSlide === 0}
      >
        &lt;
      </button>
      
      <div className="slider-container">
        <div 
          className="slider-track"
          style={{ 
            transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)`,
          }}
        >
          {products.map(product => (
            <div 
              key={product.id} 
              className="slider-item"
              style={{ width: `${100 / slidesToShow}%` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
      
      <button 
        className="slider-btn next" 
        onClick={nextSlide}
        disabled={currentSlide >= products.length - slidesToShow}
      >
        &gt;
      </button>
    </div>
  );
}