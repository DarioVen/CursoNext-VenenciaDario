'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Counter from './Counter';
import { updateCartItem, removeFromCart, getCart } from '../firebase/cartUtils';

export default function CartItem({ item, userId, onUpdate }) {
  const [loading, setLoading] = useState(false);
  const [currentQuantity, setCurrentQuantity] = useState(item.quantity);
  const [showConfirm, setShowConfirm] = useState(false);
  const [tempQuantity, setTempQuantity] = useState(item.quantity);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    setTempQuantity(newQuantity);
    setShowConfirm(true);
  };

  const confirmQuantityChange = async () => {
    setLoading(true);
    try {
      await updateCartItem(userId, item.productId, tempQuantity);
      const updatedCart = await getCart(userId);
      setCurrentQuantity(tempQuantity);
      onUpdate(updatedCart.items);
      setShowConfirm(false);
    } catch (error) {
      console.error('Error updating quantity:', error);
      setTempQuantity(currentQuantity);
    } finally {
      setLoading(false);
    }
  };

  const cancelChange = () => {
    setTempQuantity(currentQuantity);
    setShowConfirm(false);
  };

  const handleRemove = async () => {
    setLoading(true);
    try {
      await removeFromCart(userId, item.productId);
      const updatedCart = await getCart(userId);
      onUpdate(updatedCart.items || []);
    } catch (error) {
      console.error('Error removing item:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <Image 
          src={item.image} 
          alt={item.name}
          width={100}
          height={100}
        />
      </div>
      
      <div className="cart-item-details">
        <h3>{item.name}</h3>
        {item.variantName && <p className="variant">Variante: {item.variantName}</p>}
        <p className="price">${item.price}</p>
      </div>

      <div className="cart-item-actions">
        <div className="counter-and-confirm">
          <Counter
            initialValue={tempQuantity}
            onChange={handleQuantityChange}
            disabled={loading}
            min={1}
          />
          {showConfirm && (
            <div className="confirm-actions">
              <button 
                onClick={confirmQuantityChange}
                className="confirm-btn"
                disabled={loading}
              >
                ✓ Confirmar
              </button>
              <button 
                onClick={cancelChange}
                className="cancel-btn"
                disabled={loading}
              >
                ✕ Cancelar
              </button>
            </div>
          )}
        </div>
        <button 
          onClick={handleRemove}
          className="remove-btn"
          disabled={loading}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}