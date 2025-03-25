"use client";
import { auth } from "@/app/config";
import { deleteUser } from "firebase/auth";
import { useForm } from 'react-hook-form'

export default function DeleteAccount() {
    const { handleSubmit } = useForm();

    const deleteAccount = handleSubmit(() => {
        if(auth.currentUser === null) return;
        deleteUser(auth.currentUser)
        .then(() => {
            console.log("アカウントを削除しました");
        })
        .catch((error) => {
            console.log(error);
        })
    })

    return (
        <div>
            <h1>アカウント削除</h1>
            <button onClick={ deleteAccount }>アカウント削除</button>
        </div>
    )
}
