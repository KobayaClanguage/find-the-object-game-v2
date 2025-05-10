"use client";

import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

function Transition() {
  const router = useRouter();
  const urlParams = useSearchParams();

  useEffect(() => {
    const oobCode = urlParams.get("oobCode");
    const mode = urlParams.get("mode");

    if (!oobCode) return;

    if (mode === "verifyAndChangeEmail") {
      router.push(
        "/game/settings/account/change/email/complete?oobCode=" + oobCode,
      );
    }
  });
  return (
    <div>
      画面が変わります。しばらくお待ちください。
      <br />
      変わらない場合は再度やり直してください。
    </div>
  );
}

export default function UpdateEmail() {
  return (
    <Suspense>
      <Transition />
    </Suspense>
  );
}
