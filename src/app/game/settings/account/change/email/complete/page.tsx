"use client";
import { applyActionCode } from "firebase/auth";
import{ auth } from "@/app/config";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Complete() {
    const executed = useRef<boolean | null>(null);
    const urlParams = useSearchParams();
    const oobCode = urlParams.get("oobCode");

    useEffect(() => {
        // TODO: フロントエンド実装
        if(executed.current) return; // 2回実行されるのを防ぐ
        executed.current = true; // フラグを立てる
        if (!oobCode) return;

        applyActionCode(auth, oobCode)
        .then(() => {
            console.log("メールアドレスの変更が完了しました");
        })
        .catch((error) => {
            console.log(oobCode, error);
        })    
    })

    return (
        <div>メールアドレス認証確認画面（コンソールに結果が出力されます）</div>
    )
}