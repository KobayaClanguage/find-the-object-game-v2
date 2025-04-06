"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function AuthResetPassword() {
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
      <div className="mb-4 mt-10 flex flex-col items-center space-y-2">
        <h2 className="text-2xl font-bold">オブジェを探せゲーム</h2>
        <p className="text-2xl text-gray-700">パスワード再設定</p>
      </div>
      <div className="flex flex-col items-center justify-around space-y-6 px-10">
        <p className="px-5 text-xl">
          登録したメールアドレスを入力してください。
        </p>
        <div className="w-full">
          <Label className="text-xl font-normal">メールアドレス</Label>
          <Input
            placeholder="ID(メールアドレス)"
            className="h-10 rounded-none border-black shadow-none"
          />
        </div>
        <p>パスワード再設定用のURLをお送りします。</p>
        <Button className="mb-4 mt-9 h-14 w-full rounded-none bg-[#0094f4] text-2xl">
          次へ
        </Button>
        <Button
          asChild
          className="mb-4 mt-9 h-14 w-full rounded-none border-[3px] border-[#0094f4] bg-white text-2xl text-[#0094f4] shadow-none"
        >
          <Link href={"/auth/login"}>ログイン</Link>
        </Button>
      </div>
    </div>
  );
}
