"use server";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const signupWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const auth = getAuth();

  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    alert("登録成功");

    return user;
  } catch (error) {
    alert("登録失敗");
    console.log(error);
  }
};
