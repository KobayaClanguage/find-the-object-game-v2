import Link from "next/link";
import { Button } from "@/components/ui/button";
import NavigationFooter from "@/features/game/NavigationFooter";
import React from "react";
import { ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function GameSettingsAccountDelete() {
  const pageTitle = "設定";
  const pageSubTitle = "メールアドレス変更";

  return (
    <div className="relative h-full">
      <h1 className="fixed inset-x-0 top-0 bg-[#0094f4] p-4 pt-7 text-center text-3xl text-white">
        {pageTitle}
      </h1>

      <div className="pb-16 pt-20">
        <div className="relative mx-6 flex h-[80px] items-center justify-around">
          <div className="absolute left-0">
            <Link href="/game/settings" className="p-0">
              <ChevronLeft color="#000000" size={50} />
            </Link>
          </div>
          <h1 className="text-2xl">{pageSubTitle}</h1>
        </div>
      </div>

      <div className="w-4/5 mx-auto">
        <p className="text-xl mb-2">確認のため、<span className="font-bold">パスワード</span>を入力してください。</p>
        <div className="mb-8">
            <Label className="text-xl font-normal">パスワード</Label>
            <Input
                placeholder="パスワード"
                className="h-10 rounded-none border-black shadow-none"
            />
        </div>
        
        <p className="text-xl mb-2"><span className="font-bold">新しいメールアドレス</span>を入力してください。</p>
        <div className="mb-8">
            <Label className="text-xl font-normal">新しいメールアドレス</Label>
            <Input
                placeholder="新しいメールアドレス"
                className="h-10 rounded-none border-black shadow-none"
            />
        </div>


        <p className="text-xl mb-2">確認のため、もう一度<span className="font-bold">新しいメールアドレス</span>を入力してください。</p>
        <div className="mb-8">
            <Label className="text-xl font-normal">新しいメールアドレス（確認）</Label>
            <Input
                placeholder="新しいメールアドレス（確認）"
                className="h-10 rounded-none border-black shadow-none"
            />
        </div>

        <Button className="mt-6 h-14 w-full rounded-none bg-[#0094f4] text-2xl font-semibold text-white">
              確認メールを送信
            </Button>


      </div>


      <div className="fixed inset-x-0 bottom-0 flex items-center justify-around border bg-white p-4 shadow-md">
        <NavigationFooter />
      </div>
    </div>
  );
}
