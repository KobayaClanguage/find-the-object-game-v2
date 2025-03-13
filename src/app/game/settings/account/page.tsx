'use client'

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { applyActionCode } from 'firebase/auth';
import { auth } from '@/app/config';
import { useSearchParams } from "next/navigation";

export default function updateEmail() {
    const router = useRouter();

    const urlParams = useSearchParams();
    const oobCode = urlParams.get("oobCode");
    const mode = urlParams.get("mode");

    useEffect(() => {
        if (!oobCode) {
            // oobCodeがない場合            
            return;
        }
        // modeに応じてパスワード変更完了画面もしくはメールアドレス完了画面に遷移させる
        if (mode === "verifyAndChangeEmail") {
            router.push("/game/settings/account/change/email/complete?oobCode=" + oobCode);
        } else if (mode === "resetPassword") {
            router.push("/auth/reset/password/register?oobCode=" + oobCode);
        }
    }, [oobCode]);


      return(
        <div>
        </div>
    );
}
