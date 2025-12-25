import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { initializeApp, getApps } from "firebase/app";
import { doc, setDoc, updateDoc, getDoc, query, collection, getDocs, orderBy, limit, where } from "firebase/firestore";
import { db } from "./firebaseClient";
interface UserData {
  id: string;
  numericId: number;
  email: string;
  password: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  isAdmin?: boolean;
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Only initialize Firebase if we have valid config and not during build
if (!getApps().length && 
    firebaseConfig.apiKey && 
    firebaseConfig.apiKey !== 'placeholder_api_key' &&
    typeof window !== 'undefined') {
  initializeApp(firebaseConfig);
}

export const auth = getApps().length > 0 ? getAuth() : null;

// ADMIN AUTHENTICATION (Firebase Auth + Firestore)
export const loginAdmin = async (email: string, password: string) => {
  if (!auth || !db) {
    throw new Error('Firebase not initialized');
  }
  
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  
  // Verify admin exists in Firestore
  const adminDoc = await getDoc(doc(db, "admins", userCredential.user.uid));
  if (!adminDoc.exists()) {
    await signOut(auth);
    throw new Error('Access denied: Admin privileges required');
  }
  
  return userCredential;
};

export const registerAdmin = async (email: string, password: string) => {
  if (!auth || !db) {
    throw new Error('Firebase not initialized');
  }
  
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const adminId = userCredential.user.uid;
  
  await setDoc(doc(db, "admins", adminId), {
    id: adminId,
    email: userCredential.user.email,
    password: password,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  
  return userCredential;
};

export const logoutAdmin = () => {
  if (!auth) {
    throw new Error('Firebase not initialized');
  }
  return signOut(auth);
};

// USER AUTHENTICATION (Firestore only)
export const loginUser = async (email: string, password: string) => {
  if (!db) {
    throw new Error('Firebase not initialized');
  }
  
  const userQuery = query(collection(db, "users"), where("email", "==", email));
  const userSnapshot = await getDocs(userQuery);
  
  if (userSnapshot.empty) {
    throw new Error('User not found');
  }
  
  const userData = userSnapshot.docs[0].data();
  if (userData.password !== password) {
    throw new Error('Invalid password');
  }
  
  await updateDoc(userSnapshot.docs[0].ref, {
    isActive: true,
    lastLogin: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  
  return { user: userData, id: userSnapshot.docs[0].id };
};

export const registerUser = async (email: string, password: string, adminPassword?: string) => {
  if (!db) {
    throw new Error('Firebase not initialized');
  }
  
  const userQuery = query(collection(db, "users"), where("email", "==", email));
  const existingUser = await getDocs(userQuery);
  
  if (!existingUser.empty) {
    throw new Error('This email is already registered');
  }
  
  // Check if admin password is provided and validate against any admin
  if (adminPassword) {
    const adminsQuery = query(collection(db, "admins"));
    const adminsSnapshot = await getDocs(adminsQuery);
    
    let validAdminPassword = false;
    for (const adminDoc of adminsSnapshot.docs) {
      if (adminDoc.data().password === adminPassword) {
        validAdminPassword = true;
        break;
      }
    }
    
    if (!validAdminPassword) {
      throw new Error('Invalid admin password');
    }
  }
  
  const lastUserQuery = query(collection(db, "users"), orderBy("numericId", "desc"), limit(1));
  const lastUserSnapshot = await getDocs(lastUserQuery);
  const nextId = lastUserSnapshot.empty ? 1 : lastUserSnapshot.docs[0].data().numericId + 1;
  
  const userRef = doc(collection(db, "users"));
  const userData: UserData = {
    id: userRef.id,
    numericId: nextId,
    email: email,
    password: password,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  // If admin password was provided and valid, make this user an admin
  if (adminPassword) {
    userData.isAdmin = true;
    // Also create admin record
    await setDoc(doc(db, "admins", userRef.id), {
      id: userRef.id,
      email: email,
      password: adminPassword,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }
  
  await setDoc(userRef, userData);
  
  return { user: { email, id: userRef.id, numericId: nextId, isActive: true, isAdmin: adminPassword ? true : false } };
};

export const logoutUser = async (userId: string) => {
  if (!db) {
    throw new Error('Firebase not initialized');
  }
  
  const userDoc = doc(db, "users", userId);
  await updateDoc(userDoc, {
    isActive: false,
    updatedAt: new Date().toISOString()
  });
};
