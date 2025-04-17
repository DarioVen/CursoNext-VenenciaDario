import { collection, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from './config';

export const getAllProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting products:', error);
    throw error;
  }
};

export const updateProductStock = async (productId, newStock, variantId = null) => {
  try {
    const productRef = doc(db, 'products', productId);
    const productDoc = await getDoc(productRef);

    if (!productDoc.exists()) {
      throw new Error('Product not found');
    }

    if (variantId) {
      const productData = productDoc.data();
      
      const updatedVariants = productData.variants.map(variant => 
        variant.id === variantId 
          ? { ...variant, stock: newStock }
          : variant
      );

      await updateDoc(productRef, {
        variants: updatedVariants
      });
    } else {
      await updateDoc(productRef, {
        stock: newStock
      });
    }
  } catch (error) {
    console.error('Error updating stock:', error);
    throw error;
  }
};

export const getFeaturedProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting products:', error);
    throw error;
  }
};

// Add this new function
export const getProductById = async (productId) => {
  try {
    const productRef = doc(db, 'products', productId);
    const productDoc = await getDoc(productRef);

    if (!productDoc.exists()) {
      return null;
    }

    return {
      id: productDoc.id,
      ...productDoc.data()
    };
  } catch (error) {
    console.error('Error getting product:', error);
    throw error;
  }
};