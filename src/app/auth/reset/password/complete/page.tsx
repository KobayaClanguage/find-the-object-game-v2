'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AuthResetPasswordComplete() {
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
      <div className="px-10">
        <p className="text-2xl">パスワードの再設定が完了しました。</p>
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
