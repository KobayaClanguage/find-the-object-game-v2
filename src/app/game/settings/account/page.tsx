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
            return;
        }

        if (mode === "verifyAndChangeEmail") {
            router.push("/game/settings/account/change/email/complete?oobCode=" + oobCode);
        } else if (mode === "resetPassword") {
            router.push("/auth/reset/password/register?oobCode=" + oobCode);
        }
    }, [router, urlParams]);


      return(
        
        <div>
            <h1>アカウント設定画面</h1>
        </div>
    );
}
