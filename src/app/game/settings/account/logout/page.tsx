"use client";

import { auth } from "@/app/config";
import { signOut } from "firebase/auth";

export default function Logout() {
    signOut(auth);

    return (
        <div>ログアウト</div>
    )
}