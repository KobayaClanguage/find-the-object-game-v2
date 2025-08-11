'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { changeEmail } from '@/features/auth/auth';

function ChangeEmail() {
  const urlParams = useSearchParams();
  const oobCode = urlParams.get('oobCode');
  const executed = useRef<boolean>(false);
  const [resultMessage, setResultMessage] = useState('');

  useEffect(() => {
    if (executed.current) return; // ReactのStrictModeによる二重レンダリング対策
    executed.current = true;

    if (oobCode === null) {
      return;
    }

    const change = async () => {
      changeEmail(oobCode)
        .then((result) => {
          setResultMessage(result.resultMessage);
        })
        .catch((result) => {
          setResultMessage(result.resultMessage);
        });
    };
    change();
  }, [oobCode]);

  return <p className="text-2xl">{resultMessage} </p>;
}

export default function GameSettingsAccountChangeEmailComplete() {
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
        <p className="text-2xl text-gray-700">メールアドレス変更</p>
      </div>
      <div className="px-10">
        <Suspense>
          <ChangeEmail />
        </Suspense>
        <p className="text-2xl">ログインし直してください</p>
        <Button
          asChild
          className="mt-14 mb-4 h-14 w-full rounded-none bg-[#0094f4] text-2xl"
        >
          <Link href="/auth/login">ログイン画面に戻る</Link>
        </Button>
      </div>
    </div>
  );
}
