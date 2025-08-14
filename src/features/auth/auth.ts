"use client";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
  reauthenticateWithCredential,
  updatePassword,
  verifyBeforeUpdateEmail,
  applyActionCode,
  sendPasswordResetEmail,
  confirmPasswordReset,
  signInAnonymously,
  linkWithCredential,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "@/firebase/config";
import { EmailAuthProvider } from "firebase/auth/web-extension";
import { createDocument, deleteDocument } from "@/features/game/firestore";

export async function Anonymously() {
  try {
    const signInResult = await signInAnonymously(auth);
    const result = await createDocument(signInResult.user.uid);
    if (!result) {
      return {
        success: false,
        errorMessage: "匿名アカウント作成に失敗しました",
      };
    }
    return { success: true };
  } catch (error) {
    console.error("匿名アカウント作成エラー:", error);
    return { success: false, errorMessage: "匿名アカウント作成に失敗しました" };
  }
}

export async function sendLinkEmail(password: string, email: string) {
  try {
    const user = auth.currentUser;

    if (!user || !user.isAnonymous) {
      throw new Error("匿名ログインしているユーザーでないため、紐づけ不可");
    }

    const credential = EmailAuthProvider.credential(email, password);
    const linkedUserCredential = await linkWithCredential(user, credential);
    await sendEmailVerification(linkedUserCredential.user);
    return { success: true };
  } catch {
    return { success: false, errorMessage: "確認メールの送信に失敗しました" };
  }
}

export async function linkEmail(actionCode: string) {
  try {
    await applyActionCode(auth, actionCode);
    return {
      success: true,
      resultMessage: "メールアドレスの連携が完了しました",
    };
  } catch {
    return {
      success: false,
      resultMessage: "メールアドレスの連携に失敗しました",
    };
  }
}

export async function signupWithEmail(email: string, password: string) {
  try {
    const useCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const result = await createDocument(useCredential.user.uid);
    if (!result)
      return { success: false, errorMessage: "アカウント作成に失敗しました" };
    return { success: true };
  } catch {
    return { success: false, errorMessage: "アカウント作成に失敗しました" };
  }
}

export async function signinWithEmail(email: string, password: string) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch {
    return { success: false, error_message: "ログインに失敗しました" };
  }
}

export async function logout() {
  try {
    await signOut(auth);
    return { success: true };
  } catch {
    return { success: false, errorMessage: "ログアウトに失敗しました" };
  }
}

export async function deleteAccount(password: string) {
  try {
    const user = auth.currentUser;
    const email = auth.currentUser?.email;

    if (!user || !email) {
      return { success: false, errorMessage: "アカウント削除に失敗しました" };
    }
    const result = await deleteDocument(user.uid);
    if (!result) {
      return { success: false, errorMessage: "アカウント削除に失敗しました" };
    }
    const credential = EmailAuthProvider.credential(email, password);

    await reauthenticateWithCredential(user, credential);
    await deleteUser(user);

    return { success: true };
  } catch {
    return { success: false, errorMessage: "アカウント削除に失敗しました" };
  }
}

export async function changePassword(nowPassword: string, newPassword: string) {
  try {
    const user = auth.currentUser;
    const email = auth.currentUser?.email;

    if (!user || !email) {
      return { success: false, errorMessage: "パスワード変更に失敗しました" };
    }

    const credential = EmailAuthProvider.credential(email, nowPassword);

    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);

    return { success: true };
  } catch {
    return { success: false, errorMessage: "パスワード変更に失敗しました" };
  }
}

export async function sendChangeEmail(password: string, newEmail: string) {
  try {
    const user = auth.currentUser;
    const email = auth.currentUser?.email;

    if (!user || !email) {
      return { success: false, errorMessage: "確認メールの送信に失敗しました" };
    }

    const credential = EmailAuthProvider.credential(email, password);

    await reauthenticateWithCredential(user, credential);
    await verifyBeforeUpdateEmail(user, newEmail);

    return { success: true };
  } catch {
    return { success: false, errorMessage: "確認メールの送信に失敗しました" };
  }
}

export async function changeEmail(actionCode: string) {
  try {
    await applyActionCode(auth, actionCode);
    return {
      success: true,
      resultMessage: "メールアドレスの変更が完了しました",
    };
  } catch {
    return {
      success: false,
      resultMessage: "メールアドレスの変更に失敗しました",
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
      errorMessage: "メールの送信に失敗しました",
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
      errorMessage: "パスワードのリセットに失敗しました",
    };
  }
}
