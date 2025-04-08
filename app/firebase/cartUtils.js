import { db } from './config';
import { collection, doc, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';

export async function getCart(userId) {
  const cartDoc = await getDoc(doc(db, 'carts', userId));
  return cartDoc.exists() ? cartDoc.data() : { items: [] };
}

export async function addToCart(userId, product, quantity = 1) {
  const cartRef = doc(db, 'carts', userId);
  const cartDoc = await getDoc(cartRef);
  
  if (!cartDoc.exists()) {
    await setDoc(cartRef, {
      items: [{
        productId: product.id,
        quantity,
        price: product.price,
        name: product.name,
        image: product.image
      }]
    });
  } else {
    const cart = cartDoc.data();
    const existingItem = cart.items.find(item => item.productId === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
      await updateDoc(cartRef, { items: cart.items });
    } else {
      cart.items.push({
        productId: product.id,
        quantity,
        price: product.price,
        name: product.name,
        image: product.image
      });
      await updateDoc(cartRef, { items: cart.items });
    }
  }
}

export async function updateCartItem(userId, productId, quantity) {
  const cartRef = doc(db, 'carts', userId);
  const cartDoc = await getDoc(cartRef);
  
  if (cartDoc.exists()) {
    const cart = cartDoc.data();
    const items = cart.items.map(item => 
      item.productId === productId ? { ...item, quantity } : item
    );
    await updateDoc(cartRef, { items });
  }
}

export async function removeFromCart(userId, productId) {
  const cartRef = doc(db, 'carts', userId);
  const cartDoc = await getDoc(cartRef);
  
  if (cartDoc.exists()) {
    const cart = cartDoc.data();
    const items = cart.items.filter(item => item.productId !== productId);
    await updateDoc(cartRef, { items });
  }
}