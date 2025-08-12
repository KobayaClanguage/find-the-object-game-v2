import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GameSettingsAccountDeleteComplete() {
  const pageTitle = "設定";
  const pageSubTitle = "アカウント削除";

  return (
    <div className="relative h-full">
      <h1 className="fixed inset-x-0 top-0 bg-[#0094f4] p-4 pt-7 text-center text-3xl text-white">
        {pageTitle}
      </h1>
      <div className="pb-16 pt-20">
        <div className="relative mx-6 flex h-[80px] items-center justify-around">
          <h1 className="text-2xl">{pageSubTitle}</h1>
        </div>
        {/* (画面サイズの縦幅:100vh) - (タイトルバーの縦幅:80px) - (ナビゲーションバーの縦幅:74px) - (サブタイトルの縦幅:80px) */}
        <div className="relative mt-4 flex h-[calc(100vh-80px-74px-80px)] w-full flex-col items-center justify-start px-9 text-xl">
          <p className="text-2xl">アカウントを削除しました</p>
          <Button
            asChild
            className="mb-4 mt-16 h-14 w-full rounded-none bg-[#0094f4] text-2xl"
          >
            <Link href="/auth/register">新規登録画面に戻る</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
