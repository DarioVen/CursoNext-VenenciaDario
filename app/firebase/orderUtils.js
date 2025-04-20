import { collection, addDoc } from 'firebase/firestore';
import { db } from './config';
import { clearCart } from './cartUtils';

export const createOrder = async (userId, orderData) => {
  try {
    const order = {
      ...orderData,
      userId,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    const docRef = await addDoc(collection(db, 'orders'), order);
    await clearCart(userId);
    
    return docRef.id;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};