"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function AuthResetPasswordSend() {
  return (
    <div className="my-2 mt-11 flex min-h-[90vh] w-full max-w-md flex-col items-center justify-start space-y-4 bg-white sm:px-4 md:mb-5 md:max-w-full">
      {/* ヘッダー部分 */}
      <div className="mb-6 flex flex-col items-center space-y-2 text-center">
        <Image
          src={"/images/commentLogo.png"}
          alt="額ロゴの吹き出し"
          width={120}
          height={49}
        />
        <Image
          src={"/images/nukaLogo.png"}
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
        <h1 className="font-bold text-2xl">オブジェを探せゲーム</h1>
        <h2 className="text-2xl text-gray-700">パスワード再設定</h2>
      </div>
      <div className="flex flex-col items-center justify-around space-y-10 px-10">
        <p className="text-xl">
          登録したメールアドレスにパスワードリセットURLを送信しました。
        </p>
        <p className="text-xl">
          メールが届かない場合、迷惑メールフォルダー等もご確認ください。
        </p>
        <Button
          asChild
          className="h-14 w-full rounded-none bg-[#0094f4] text-2xl"
        >
          <Link href={"/auth/login"}>ログイン画面に戻る</Link>
        </Button>
      </div>
    </div>
  );
}
