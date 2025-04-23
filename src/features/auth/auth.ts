// features/auth/signInWithEmail.ts
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/firebase/config';

export async function signinWithEmail(email: string, password: string) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch {
    return { success: false, error_message: "ログインに失敗しました"};
  }
}
