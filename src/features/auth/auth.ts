"use client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/firebase/config';

export async function signupWithEmail(email: string, password: string) {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log(result);
      return { success: true };
    } catch {
      return { success: false, error_message: "アカウント登録に失敗しました"};
    }
  }