// Initialize admin password in Firestore
import { doc, setDoc } from "firebase/firestore";
import { db } from "./config";

export const initializeAdminPassword = async (initialPassword: string = "admin123") => {
  if (!db) throw new Error('Firestore not initialized');
  
  try {
    await setDoc(doc(db, "admins", "config"), {
      password: initialPassword,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    
    console.log('Admin password initialized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing admin password:', error);
    return false;
  }
};