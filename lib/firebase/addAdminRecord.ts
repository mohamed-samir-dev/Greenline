// Utility to add admin record to Firestore for existing Firebase auth user
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { updatePassword } from "firebase/auth";
import { db } from "./firebaseClient";
import { auth } from "./auth";

export const addAdminRecord = async (userId: string, email: string, password?: string) => {
  await setDoc(doc(db, "admins", userId), {
    id: userId,
    email: email,
    password: password || "admin123",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  
  console.log('Admin record created in Firestore for:', email);
};

// Get admin password for current logged-in admin
export const getAdminPassword = async () => {
  const currentUser = auth.currentUser;
  if (!currentUser) return null;
  
  const adminDoc = await getDoc(doc(db, "admins", currentUser.uid));
  if (adminDoc.exists()) {
    return adminDoc.data().password;
  }
  return null;
};

// Update current admin's password in both Firebase Auth and Firestore
export const updateAdminPassword = async (newPassword: string) => {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error('No authenticated admin');
  
  // Update Firebase Auth password
  await updatePassword(currentUser, newPassword);
  
  // Update Firestore password
  await updateDoc(doc(db, "admins", currentUser.uid), {
    password: newPassword,
    updatedAt: new Date().toISOString()
  });
};