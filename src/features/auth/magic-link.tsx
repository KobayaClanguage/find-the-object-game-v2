import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export function Transition() {
  const router = useRouter();
  const urlParams = useSearchParams();
  const oobCode = urlParams.get('oobCode');
  const mode = urlParams.get('mode');

  useEffect(() => {
    if (!oobCode) return;

    if (mode === 'verifyAndChangeEmail') {
      router.push(
        `/game/settings/account/change/email/complete?oobCode=${oobCode}`,
      );
    } else if (mode === 'resetPassword') {
      router.push(`/auth/reset/password/register?oobCode=${oobCode}`);
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
