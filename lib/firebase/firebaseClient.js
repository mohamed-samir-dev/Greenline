// lib/firebaseClient.js
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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

// Export null objects during build to prevent errors
export const db = (getApps().length > 0) ? getFirestore() : null;
export const storage = (getApps().length > 0) ? getStorage() : null;
