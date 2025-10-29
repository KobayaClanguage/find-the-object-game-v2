import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="my-20 flex min-h-screen flex-col items-center bg-white p-6"
    style={{
      paddingBottom: `var(--recaptcha-notice-height, 16px)`
    }}
    >
      {/* 上部タイトル */}
      <h1 className="mb-12 text-3xl font-bold text-gray-800">
        オブジェを探せゲーム
      </h1>

      {/* ロゴセクション */}
      <div className="mb-4 flex flex-col items-center">
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
          <X />
          <Image
            src="/images/KITimage.png"
            alt="KITロゴ"
            width={150}
            height={75}
          />
        </div>
      </div>

      {/* TODO: 準備中メッセージ削除 */}
      <div className="text-center text-3xl text-red-500">
        <strong>
          準備中です
          <br />
          来春リリース予定
        </strong>
      </div>

      {/* サブタイトル */}
      <div className="mb-8 mt-4 flex flex-col items-center">
        <h2 className="mb-16 text-center text-3xl font-bold text-gray-800">
          スタンプを集めて
          <br />
          額地区を探索しよう！
        </h2>
      </div>

      {/* ボタンセクション */}
      <div className="flex w-full max-w-xs flex-col gap-4">
        <Button
          type="button"
          className="h-16 rounded-full bg-[#0094F4] py-3 text-xl font-bold text-white shadow-md transition-transform hover:scale-105 active:scale-95"
          asChild
        >
          {/* TODO: アカウント登録画面にリンクを貼り替える */}
          <Link href={"/preparation"}>はじめる</Link>
        </Button>
        <Button
          type="button"
          className="h-16 rounded-full border-2 border-[#0094F4] bg-white py-3 text-xl font-bold text-blue-500 shadow-md transition-transform hover:scale-105 active:scale-95"
          asChild
        >
          {/* TODO: 遊び方ページの実装 */}
          <Link href={"/preparation"}>遊び方</Link>
        </Button>
      </div>
    </main>
  );
}
