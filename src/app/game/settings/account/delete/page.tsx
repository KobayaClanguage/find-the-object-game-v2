"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import NavigationFooter from "@/features/game/NavigationFooter";
import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { deleteAccount } from "@/features/auth/auth";
import { useRouter } from 'next/navigation'

export default function GameSettingsAccountDelete() {
  const pageTitle = "設定";
  const pageSubTitle = "アカウント削除";
  const [error_message, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const deleteButton = async() => {    
    const result = await deleteAccount(password);
    if(result.success) {
      router.push("/game/settings/account/delete/complete");
    } else {
      setErrorMessage(result.error_message ?? "アカウント削除に失敗しました")
    }
  }


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
        {/* (画面サイズの縦幅:100vh) - (タイトルバーの縦幅:80px) - (ナビゲーションバーの縦幅:74px) - (サブタイトルバーの縦幅:80px) */}
        <div className="relative mt-4 flex h-[calc(100vh-80px-74px-80px)] w-full flex-col items-center justify-start px-9 text-xl">
          <p className="text-2xl">本当にアカウントを削除しますか？</p>
          <p className="mb-8 text-xl">削除したアカウントは元に戻せません。</p>
          <div className="mx-auto w-4/5">
            <p className="mb-2 text-2xl">確認のため、<b>パスワード</b>を入力してください。</p>
            <div className="mb-8">
                <Label className="text-xl font-normal">パスワード</Label>
                <Input
                    placeholder="パスワード"
                    type="password"
                    className="h-10 rounded-none border-black shadow-none"
                    value={ password }
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>          
          </div>
          <div className="text-center text-red-500">
              { error_message }
            </div>
          <Button className="mb-4 mt-9 h-14 w-full rounded-none bg-[#ff0000] text-2xl" onClick={ deleteButton }>
            アカウント削除
          </Button>
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 flex items-center justify-around border bg-white p-4 shadow-md">
        <NavigationFooter />
      </div>
    </div>
  );
}
