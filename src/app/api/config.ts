import admin from "firebase-admin";

// Firebase Admin SDK の初期化
if (!admin.apps.length) {
    const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS || '{}');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
}

export const adminAuth = admin.auth();