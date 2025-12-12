// Set admin claims (run once per admin user)
import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert('./green-line-store-firebase-adminsdk-fbsvc-655aeb02ea.json')
  });
}

export const setAdminClaim = async (uid) => {
  await admin.auth().setCustomUserClaims(uid, { admin: true });
};