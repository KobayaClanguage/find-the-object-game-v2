import { NextResponse, type NextRequest } from 'next/server';
import * as admin from 'firebase-admin';
import { deleteAccountAndGameProgressData } from '@/features/auth/server-actions';

if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(
      process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
    );
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
    console.error("Firebase Admin SDK initialization error:", (error as Error).message);
  }
}

export async function POST(request: NextRequest) {
  try {
    const authorizationHeader = request.headers.get('Authorization');

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: '認証トークンが必要です' }, { status: 401 });
    }
    const idToken = authorizationHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    const deleteAccountResult = await deleteAccountAndGameProgressData(uid);
    if(!deleteAccountResult.success) {
      return NextResponse.json({ error: 'アカウント削除に失敗しました' }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
    });

  } catch (error) {
    return NextResponse.json({ error: error }, { status: 401 });
  }
}