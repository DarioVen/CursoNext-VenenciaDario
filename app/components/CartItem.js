'use client';

import Image from 'next/image';
import { useState } from 'react';
import Counter from './Counter';
import { updateCartItem, removeFromCart, getCart } from '../firebase/cartUtils';

export default function CartItem({ item, userId, onUpdate }) {
  const [loading, setLoading] = useState(false);
  const total = item.price * item.quantity;

  const handleQuantityChange = async (newQuantity) => {
    setLoading(true);
    try {
      await updateCartItem(userId, item.productId, newQuantity);
      const updatedCart = await getCart(userId);
      onUpdate(updatedCart.items);
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    setLoading(true);
    try {
      await removeFromCart(userId, item.productId);
      const updatedCart = await getCart(userId);
      onUpdate(updatedCart.items);
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
          className="cart-product-img"
        />
      </div>
      
      <div className="cart-item-info">
        <h3 className="cart-item-name">{item.name}</h3>
        <p className="cart-item-price">${item.price.toFixed(2)}</p>
      </div>
      
      <div className="cart-item-quantity">
        <Counter 
          initialValue={item.quantity}
          onChange={handleQuantityChange}
          disabled={loading}
        />
      </div>
      
      <div className="cart-item-total">
        <p>${total.toFixed(2)}</p>
      </div>
      
      <button 
        className="btn-remove"
        onClick={handleRemove}
        disabled={loading}
      >
        <i className="icon-trash">🗑️</i>
      </button>
    </div>
  );
}