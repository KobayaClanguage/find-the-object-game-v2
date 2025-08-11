'use client';
import { createDocument, deleteDocument } from '@/features/game/firestore';
import { auth } from '@/firebase/config';
import type { FirebaseError } from 'firebase/app';
import {
  applyActionCode,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  deleteUser,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  verifyBeforeUpdateEmail,
} from 'firebase/auth';
import { EmailAuthProvider } from 'firebase/auth/web-extension';

export async function signupWithEmail(email: string, password: string) {
  try {
    const useCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const result = await createDocument(useCredential.user.uid);
    if (!result) {
      return { success: false, errorMessage: 'アカウント登録に失敗しました' };
    }
    return { success: true };
  } catch (error: unknown) {
    const firebaseError = error as FirebaseError;
    if (firebaseError.code === 'auth/weak-password') {
      return {
        success: false,
        errorMessage: 'パスワードが短すぎます（6文字以上にしてください）',
      };
    }
    if (firebaseError.code === 'auth/email-already-in-use') {
      return {
        success: false,
        errorMessage: 'このメールアドレスは既に使用されています',
      };
    }
    if (firebaseError.code === 'auth/invalid-email') {
      return {
        success: false,
        errorMessage: 'メールアドレスの形式が正しくありません',
      };
    }
    return { success: false, errorMessage: 'アカウント登録に失敗しました' };
  }
}

export async function signinWithEmail(email: string, password: string) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch {
    return { success: false, error_message: 'ログインに失敗しました' };
  }
}

export async function logout() {
  try {
    await signOut(auth);
    return { success: true };
  } catch {
    return { success: false, errorMessage: 'ログアウトに失敗しました' };
  }
}

export async function deleteAccount(password: string) {
  try {
    const user = auth.currentUser;
    const email = auth.currentUser?.email;

    if (!user || !email) {
      return { success: false, errorMessage: 'アカウント削除に失敗しました' };
    }
    const result = await deleteDocument(user.uid);
    if (!result) {
      return { success: false, errorMessage: 'アカウント削除に失敗しました' };
    }
    const credential = EmailAuthProvider.credential(email, password);

    await reauthenticateWithCredential(user, credential);
    await deleteUser(user);

    return { success: true };
  } catch {
    return { success: false, errorMessage: 'アカウント削除に失敗しました' };
  }
}

export async function changePassword(nowPassword: string, newPassword: string) {
  try {
    const user = auth.currentUser;
    const email = auth.currentUser?.email;

    if (!user || !email) {
      return { success: false, errorMessage: 'パスワード変更に失敗しました' };
    }

    const credential = EmailAuthProvider.credential(email, nowPassword);

    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);

    return { success: true };
  } catch {
    return { success: false, errorMessage: 'パスワード変更に失敗しました' };
  }
}

export async function sendChangeEmail(password: string, newEmail: string) {
  try {
    const user = auth.currentUser;
    const email = auth.currentUser?.email;

    if (!user || !email) {
      return { success: false, errorMessage: '確認メールの送信に失敗しました' };
    }

    const credential = EmailAuthProvider.credential(email, password);

    await reauthenticateWithCredential(user, credential);
    await verifyBeforeUpdateEmail(user, newEmail);

    return { success: true };
  } catch {
    return { success: false, errorMessage: '確認メールの送信に失敗しました' };
  }
}

export async function changeEmail(actionCode: string) {
  try {
    await applyActionCode(auth, actionCode);
    return {
      success: true,
      resultMessage: 'メールアドレスの変更が完了しました',
    };
  } catch {
    return {
      success: false,
      resultMessage: 'メールアドレスの変更に失敗しました',
    };
  }
}

export async function sendResetEmail(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch {
    return {
      success: false,
      errorMessage: 'メールの送信に失敗しました',
    };
  }
}

export async function resetPassword(newPassword: string, oobCode: string) {
  try {
    await confirmPasswordReset(auth, oobCode, newPassword);
    return { success: true };
  } catch {
    return {
      success: false,
      errorMessage: 'パスワードのリセットに失敗しました',
    };
  }
}
