import admin from "firebase-admin";
import serviceAccount from "../../green-line-store-firebase-adminsdk-fbsvc-655aeb02ea.json"; 

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });
}

export const adminDb = admin.firestore();
export const adminBucket = admin.storage().bucket();
