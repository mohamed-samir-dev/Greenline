import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { initializeApp, getApps } from "firebase/app";
import { doc, setDoc, updateDoc, getDoc, query, collection, getDocs, orderBy, limit } from "firebase/firestore";
import { db } from "./firebaseClient";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export const auth = getAuth();

export const loginUser = (email: string, password: string) => 
  signInWithEmailAndPassword(auth, email, password);

export const registerUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userId = userCredential.user.uid;
    
    const lastUserQuery = query(collection(db, "users"), orderBy("numericId", "desc"), limit(1));
    const lastUserSnapshot = await getDocs(lastUserQuery);
    const nextId = lastUserSnapshot.empty ? 1 : lastUserSnapshot.docs[0].data().numericId + 1;
    
    await setDoc(doc(db, "users", userId), {
      id: userId,
      numericId: nextId,
      email: userCredential.user.email,
      password: password,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    
    return userCredential;
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('This email is already registered');
    }
    throw error;
  }
};

export const logoutUser = async () => {
  if (auth.currentUser) {
    const userDoc = doc(db, "users", auth.currentUser.uid);
    const userSnapshot = await getDoc(userDoc);
    if (userSnapshot.exists()) {
      await updateDoc(userDoc, {
        isActive: false,
        updatedAt: new Date().toISOString()
      });
    }
  }
  return signOut(auth);
};
