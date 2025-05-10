"use client"
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import NavigationFooter from "@/features/game/NavigationFooter";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { changePassword } from "@/features/auth/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GameSettingsAccountChangePassword() {
  const pageTitle = "設定";
  const pageSubTitle = "パスワード変更";
  const [errorMessage, setErrorMessage] = useState("");
  const [nowPassword, setNowPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const router = useRouter();

  const submitChangePassword = (async () => {
    if(newPassword == newPasswordConfirm) {
      changePassword(nowPassword, newPassword)
      .then((result) => {
        if(result.success) {
          router.push("/game/settings/account/change/password/complete");
        } else {
          setErrorMessage(result.errorMessage ?? "パスワード変更に失敗しました");
        }
      })
      .catch((result) => {
        setErrorMessage(result.errorMessage ?? "パスワード変更に失敗しました");
      })
    } else {
      setErrorMessage("パスワードの変更に失敗しました");
    }
  })

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
        {/* (画面サイズの縦幅:100vh) - (タイトルバーの縦幅:80px) - (ナビゲーションバーの縦幅:74px) - (スタンプ名タイトルの縦幅:80px) */}
        <div className="relative mt-4 flex h-[calc(100vh-80px-74px-80px)] w-full flex-col items-center justify-around px-9 text-xl">
          <p className="text-2xl">
            確認のため、 <strong>現在のパスワード</strong>を入力してください
          </p>
          <div className="w-full">
            <Label className="text-xl font-normal">現在のパスワード</Label>
            <Input
              placeholder="現在のパスワード"
              type="password"
              className="h-10 rounded-none border-black shadow-none"
              value={nowPassword}
              onChange={(e) => setNowPassword(e.target.value)}
            />
          </div>
          <p className="text-2xl">
            <strong>新しいパスワード</strong>を入力してください。
          </p>
          <div className="w-full">
            <Label className="text-xl font-normal">新しいパスワード</Label>
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
            <Label className="text-xl font-normal">
              新しいパスワード(確認)
            </Label>
            <Input
              placeholder="新しいパスワード"
              type="password"
              className="h-10 rounded-none border-black shadow-none"
              value={newPasswordConfirm}
              onChange={(e) => setNewPasswordConfirm(e.target.value)}

            />
          </div>
          <div className="text-center text-red-500">
              { errorMessage }
          </div>
          <Button className="mb-4 mt-9 h-14 w-full rounded-none bg-[#0094f4] text-2xl" onClick={ submitChangePassword }>
            パスワードを変更
          </Button>
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 flex items-center justify-around border bg-white p-4 shadow-md">
        <NavigationFooter />
      </div>
    </div>
  );
}