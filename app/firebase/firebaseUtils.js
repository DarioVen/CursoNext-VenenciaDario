import { doc, updateDoc, getDoc, getDocs, collection, query, where, limit } from 'firebase/firestore';
import { db } from './config';

export async function getAllProducts() {
  const querySnapshot = await getDocs(collection(db, "products"));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export async function getFeaturedProducts() {
  const q = query(
    collection(db, "products"),
    where("discount", ">", 0)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export async function getProductById(id) {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data()
    };
  }
  return null;
}

export async function getProductsByCategory(category) {
  const q = query(
    collection(db, "products"),
    where("category", "==", category)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export async function getRelatedProducts(category, currentProductId) {
  const q = query(
    collection(db, "products"),
    where("category", "==", category),
    where("id", "!=", currentProductId),
    limit(4)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export const updateProductStock = async (productId, newStock, variantId = null) => {
  const productRef = doc(db, 'products', productId);
  
  try {
    if (variantId) {
      // Update variant stock
      const productDoc = await getDoc(productRef);
      const productData = productDoc.data();
      const updatedVariants = productData.variants.map(variant =>
        variant.id === variantId ? { ...variant, stock: newStock } : variant
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