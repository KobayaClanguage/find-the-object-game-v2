'use client'

import { useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function UpdateEmail() {
    const router = useRouter();
    const urlParams = useSearchParams();

    useEffect(() => {
        const oobCode = urlParams.get("oobCode");
        const mode = urlParams.get("mode");
    
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
    }, [router, urlParams]);


      return(
        <div>
        </div>
    );
}
