"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import NavigationFooter from "@/features/game/NavigationFooter";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { logout } from "@/features/auth/auth";
import { useRouter } from "next/navigation";

export default function GameSettingsAccountLogout() {
  const pageTitle = "設定";
  const pageSubTitle = "ログアウト";
  const router = useRouter();
  const [ErrorMessage, setErrorMessage] = useState("");

  const logoutButton = ( async() => {
    logout()
    .then((result) => {
      if(result.success) {
        router.push("/game/settings/account/logout/complete");
      } else {
        setErrorMessage(result.ErrorMessage ?? "ログアウトに失敗しました");
      }
    })
    .catch(() => {
      setErrorMessage("ログアウトに失敗しました");
    })
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
        <div className="relative mt-4 flex h-[calc(100vh-80px-74px-80px)] w-full flex-col items-center justify-start px-9 text-xl">
          <p className="mb-9 text-2xl">本当にログアウトしますか？</p>

          <div className="text-center text-red-500">
              { ErrorMessage }
          </div>

          <Button className="mb-4 h-14 w-full rounded-none bg-[#0094f4] text-2xl" onClick={ logoutButton }>
            ログアウト
          </Button>
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 flex items-center justify-around border bg-white p-4 shadow-md">
        <NavigationFooter />
      </div>
    </div>
  );
}
