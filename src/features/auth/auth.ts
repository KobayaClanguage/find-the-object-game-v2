import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/firebase/config";

export async function signupWithEmail(email: string, password: string) {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    console.log(result);
    return { success: true };
  } catch {
    return { success: false, error_message: "アカウント登録に失敗しました" };
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
    return { success:false, error_message: "ログアウトに失敗しました" };
  }
}