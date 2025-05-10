import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export function Transition() {
  const router = useRouter();
  const urlParams = useSearchParams();
  const oobCode = urlParams.get("oobCode");
  const mode = urlParams.get("mode");

  useEffect(() => {
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
