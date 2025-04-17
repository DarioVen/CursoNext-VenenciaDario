import { doc, updateDoc, getDoc, setDoc, arrayUnion } from 'firebase/firestore';
import { db } from './config';

export const addToCart = async (userId, product, quantity = 1) => {
  try {
    const cartRef = doc(db, 'carts', userId);
    const cartDoc = await getDoc(cartRef);

    const cartItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
      variantId: product.variant?.id || null,
      variantName: product.variant?.name || null,
      timestamp: new Date().toISOString()
    };

    if (!cartDoc.exists()) {
      await setDoc(cartRef, {
        userId: userId,
        items: [cartItem]
      });
    } else {
      const cartData = cartDoc.data();
      const existingItemIndex = cartData.items.findIndex(item => 
        item.productId === product.id && 
        item.variantId === cartItem.variantId
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...cartData.items];
        updatedItems[existingItemIndex].quantity += quantity;
        await updateDoc(cartRef, {
          items: updatedItems
        });
      } else {
        await updateDoc(cartRef, {
          items: [...cartData.items, cartItem]
        });
      }
    }
    return true;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const getCart = async (userId) => {
  try {
    const cartRef = doc(db, 'carts', userId);
    const cartDoc = await getDoc(cartRef);
    
    if (cartDoc.exists()) {
      return cartDoc.data();
    } else {
      return { items: [] };
    }
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

export const removeFromCart = async (userId, productId) => {
  try {
    const cartRef = doc(db, 'carts', userId);
    const cartDoc = await getDoc(cartRef);
    
    if (cartDoc.exists()) {
      const cartData = cartDoc.data();
      const updatedItems = cartData.items.filter(item => item.productId !== productId);
      
      await updateDoc(cartRef, {
        items: updatedItems
      });
    }
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw error;
  }
};

export const updateCartItem = async (userId, productId, newQuantity) => {
  try {
    const cartRef = doc(db, 'carts', userId);
    const cartDoc = await getDoc(cartRef);
    
    if (cartDoc.exists()) {
      const cartData = cartDoc.data();
      const updatedItems = cartData.items.map(item => 
        item.productId === productId 
          ? { ...item, quantity: newQuantity }
          : item
      );
      
      await updateDoc(cartRef, {
        items: updatedItems
      });
    }
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};