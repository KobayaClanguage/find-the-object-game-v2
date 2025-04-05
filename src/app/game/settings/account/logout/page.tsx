"use client";

import { auth } from "@/app/config";
import { signOut } from "firebase/auth";

export default function Logout() {
    signOut(auth);

    return (
        // TODO: フロントエンド実装
        <div>ログアウト</div>
    )
}