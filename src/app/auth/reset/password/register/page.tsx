'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { resetPassword } from '@/features/auth/auth';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

function Reset() {
  const [errorMessage, setErrorMessage] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const urlParams = useSearchParams();
  const oobCode = urlParams.get('oobCode');
  const router = useRouter();

  const resetPasswordButton = async () => {
    if (oobCode === null) return;
    if (newPassword === confirmNewPassword) {
      const result = await resetPassword(newPassword, oobCode);
      if (result.success) {
        router.push('/auth/reset/password/complete');
      } else {
        setErrorMessage(
          result.errorMessage ?? 'パスワードのリセットに失敗しました',
        );
      }
    } else {
      setErrorMessage('パスワードが一致していません');
    }
  };

  return (
    <div className="my-2 mt-11 flex min-h-[90vh] w-full max-w-md flex-col items-center justify-start space-y-4 bg-white sm:px-4 md:mb-5 md:max-w-full">
      {/* ヘッダー部分 */}
      <div className="mb-6 flex flex-col items-center space-y-2 text-center">
        <Image
          src={'/images/commentLogo.png'}
          alt="額ロゴの吹き出し"
          width={120}
          height={49}
        />
        <Image
          src={'/images/nukaLogo.png'}
          alt="額のロゴ"
          width={198}
          height={64}
        />
        <Image src="/images/cross.png" alt="☓アイコン" width={29} height={29} />
        <Image
          src="/images/KITimage.png"
          alt="KITロゴ"
          width={150}
          height={75}
        />
      </div>
      <div className="mt-10 mb-4 flex flex-col items-center space-y-2">
        <h2 className="font-bold text-2xl">オブジェを探せゲーム</h2>
        <p className="text-2xl text-gray-700">パスワード再設定</p>
      </div>
      <div className="flex flex-col items-center justify-around space-y-6 px-10">
        <p className="text-2xl">
          <strong>新しいパスワード</strong>を入力してください
        </p>
        <div className="w-full">
          <Label className="font-normal text-xl">新しいパスワード</Label>
          <Input
            placeholder="新しいパスワード"
            type="password"
            className="h-10 rounded-none border-black shadow-none"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <p className="text-2xl">
          もう一度<strong>新しいパスワード</strong>を入力してください
        </p>
        <div className="w-full">
          <Label className="font-normal text-xl">新しいパスワード(確認)</Label>
          <Input
            placeholder="新しいパスワード(確認)"
            type="password"
            className="h-10 rounded-none border-black shadow-none"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>

        <div className="text-center text-red-500">{errorMessage}</div>

        <Button
          className="mt-9 mb-4 h-14 w-full rounded-none bg-[#0094f4] text-2xl"
          onClick={resetPasswordButton}
        >
          パスワードを変更
        </Button>
      </div>
    </div>
  );
}

export default function AuthResetPasswordRegister() {
  return (
    <Suspense>
      <Reset />
    </Suspense>
  );
}
