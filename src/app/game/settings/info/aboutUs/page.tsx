import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import NavigationFooter from "@/features/game/NavigationFooter";
import Image from "next/image";

export default function GameSettingsInfoAboutUs() {
  const pageTitle = "設定";
  const pageSubTitle = "本Webサービスについて";

  const TITLE_BAR_HEIGHT = 80; // タイトルバーの縦幅 (px)
  const NAVIGATION_BAR_HEIGHT = 74; // ナビゲーションバーの縦幅 (px)
  const STAMP_TITLE_HEIGHT = 80; // スタンプ名タイトルの縦幅 (px)

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
          <h2 className="text-2xl">{pageSubTitle}</h2>
        </div>
        <div
          className={`relative mt-4 flex h-[calc(100vh-${TITLE_BAR_HEIGHT}px-${NAVIGATION_BAR_HEIGHT}px-${STAMP_TITLE_HEIGHT}px)] w-full flex-col items-center justify-start px-9 text-xl space-y-10`}
        >
          <p className="text-2xl">
            {/* Webサービスの説明 */}
            本Webサービスは、金沢市額地区における地域の発展を目標として金沢工業大学所属の組織である
            <strong>額プロジェクト</strong>と<strong>額振興会</strong>
            が共同で開発しました。
          </p>

          <div className="mb-6 flex flex-col items-center space-y-10 text-center">
            {/* ロゴと各団体のホームページへのリンク */}
            <h2 className="text-2xl">額振興会ホームページ</h2>
            <Link href={"https://nukashinkoukai.com/"}>
              <Image
                src={"/images/nukaLogo.png"}
                alt="額のロゴ"
                width={198}
                height={64}
              />
            </Link>
            <h2 className="text-2xl">額プロジェクトホームページ</h2>
            <Link
              href={
                "https://www.kanazawa-it.ac.jp/yumekobo/project/21nuka.html"
              }
            >
              <Image
                src="/images/KITimage.png"
                alt="KITロゴ"
                width={150}
                height={75}
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 flex items-center justify-around border bg-white p-4 shadow-md">
        <NavigationFooter />
      </div>
    </div>
  );
}
