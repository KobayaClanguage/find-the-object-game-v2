"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="my-2 flex min-h-[90vh] w-full max-w-md flex-col items-center justify-center space-y-4 bg-white sm:px-4 md:mb-5 md:max-w-full">
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
        <p className="text-xl text-gray-700">ログイン</p>
      </div>

      {/* ログインフォーム */}
      <Card className="w-5/6 rounded-none border-2 border-gray-400 py-10">
        <CardContent className="m-0 flex w-full flex-col items-center">
          <form className="mt-4 w-full">
            <div className="mb-4">
              <Label htmlFor="email" className="text-sm">
                ID（メールアドレス）
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="ID (メールアドレス)"
                required
                className="h-[40px] rounded-none border-gray-500 text-sm"
              />
            </div>
            <div className="mb-6">
              <Label htmlFor="password" className="text-sm">
                パスワード
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="パスワード"
                required
                className="h-[40px] rounded-none border-gray-500 text-sm"
              />
            </div>
            <Button className="mt-6 h-14 w-full rounded-none bg-[#0094f4] text-2xl font-semibold text-white">
              ログイン
            </Button>
          </form>

          <div className="mt-4 text-center text-sm font-semibold">
            <Link href={"/auth/account/password/change"}>
              パスワードをお忘れの方はこちら
            </Link>
          </div>

          {/* 新規登録ボタン */}
          <Button
            asChild
            className="mt-8 h-14 w-full rounded-none border-[3px] border-[#0094f4] bg-white font-sans text-2xl font-bold text-[#0094f4]"
          >
            <Link href={"/auth/account/register"}>新規登録</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
