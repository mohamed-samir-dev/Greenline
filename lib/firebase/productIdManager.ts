import { db } from "./config";
import { doc, getDoc, setDoc, collection, getDocs, writeBatch, query, orderBy } from "firebase/firestore";

export const getNextSequentialId = async (): Promise<number> => {
  if (!db) {
    throw new Error('Firebase not initialized');
  }
  
  const counterDoc = await getDoc(doc(db, "counters", "productSequentialId"));
  
  if (!counterDoc.exists()) {
    await setDoc(doc(db, "counters", "productSequentialId"), { value: 1 });
    return 1;
  }
  
  const nextId = counterDoc.data().value + 1;
  await setDoc(doc(db, "counters", "productSequentialId"), { value: nextId });
  return nextId;
};

export const validateSequentialId = async (sequentialId: number): Promise<boolean> => {
  if (!db) {
    throw new Error('Firebase not initialized');
  }
  
  const productsQuery = query(collection(db, "products"));
  const snapshot = await getDocs(productsQuery);
  
  return !snapshot.docs.some(doc => doc.data().sequentialId === sequentialId);
};

export const reorganizeSequentialIds = async (): Promise<void> => {
  if (!db) {
    throw new Error('Firebase not initialized');
  }
  
  const productsQuery = query(collection(db, "products"), orderBy("createdAt"));
  const snapshot = await getDocs(productsQuery);
  
  const batch = writeBatch(db);
  
  snapshot.docs.forEach((docSnapshot, index) => {
    const newSequentialId = index + 1;
    batch.update(docSnapshot.ref, { sequentialId: newSequentialId });
  });
  
  // Update counter
  batch.set(doc(db, "counters", "productSequentialId"), { value: snapshot.docs.length });
  
  await batch.commit();
};