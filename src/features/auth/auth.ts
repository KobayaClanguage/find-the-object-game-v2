import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  deleteUser,
  reauthenticateWithCredential
} from "firebase/auth";
import { auth } from "@/firebase/config";
import { EmailAuthProvider } from "firebase/auth/web-extension";

export async function signupWithEmail(email: string, password: string) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
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

export async function deleteAccount(password: string) {
  try {
    const user = auth.currentUser;
    const email = auth.currentUser?.email;

    if(user === null || email === null || email === undefined) {
      return { success: false, error_message: "アカウント削除に失敗しました"};
    } 

    const credential = EmailAuthProvider.credential(
      email,
      password
    )

    await reauthenticateWithCredential(user, credential)
    await deleteUser(user);

    return { success: true};
  } catch {
    return { success: false, error_message: "アカウント削除に失敗しました"};
  }
}
