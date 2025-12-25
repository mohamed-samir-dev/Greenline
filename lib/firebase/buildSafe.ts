// lib/firebase/buildSafe.ts
// This file provides build-safe Firebase utilities that won't break during static generation

export const isBrowser = typeof window !== 'undefined';
export const isFirebaseAvailable = isBrowser && !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

export const withFirebase = <T>(fn: () => T, fallback: T): T => {
  if (!isFirebaseAvailable) {
    return fallback;
  }
  
  try {
    return fn();
  } catch (error) {
    console.error('Firebase operation failed:', error);
    return fallback;
  }
};

export const asyncWithFirebase = async <T>(
  fn: () => Promise<T>, 
  fallback: T
): Promise<T> => {
  if (!isFirebaseAvailable) {
    return fallback;
  }
  
  try {
    return await fn();
  } catch (error) {
    console.error('Firebase async operation failed:', error);
    return fallback;
  }
};