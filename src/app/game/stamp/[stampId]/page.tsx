"use client";
import NavigationFooter from "@/features/game/NavigationFooter";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
// import { useSearchParams } from "next/navigation";

export default function GameStampId() {
  const pageTitle = "マップ";
  // TODO: ページタイトルを動的に変更する
  // const stampId = useSearchParams().get("stampId");
  const stampId = "1";
  const stampName = "駐車場";

  return (
    <div className="relative h-full">
      <h1 className="fixed inset-x-0 top-0 bg-[#0094f4] p-4 pt-7 text-center text-3xl text-white">
        {pageTitle}
      </h1>
      <div className="pb-16 pt-20">
        <div className="relative mx-6 flex h-[80px] items-center justify-around">
          <div className="absolute left-0">
            <Link href="/game/stamp" className="p-0">
              <ChevronLeft color="#000000" size={50}/>
            </Link>
          </div>
          <h1 className="text-[30px]">{stampName}</h1>
        </div>
        {/* (画面サイズの縦幅:100vh) - (タイトルバーの縦幅:80px) - (ナビゲーションバーの縦幅:74px) - (スタンプ名タイトルの縦幅:80px) */}
        <div className="relative h-[calc(100vh-80px-74px-80px)] w-full">
          <Image
            src={`/game/stamp/maps/map${stampId}.png`}
            fill
            alt={`${stampName} map`}
          />
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 flex items-center justify-around border bg-white p-4 shadow-md">
        <NavigationFooter />
      </div>
    </div>
  );
}
