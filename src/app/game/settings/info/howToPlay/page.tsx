import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { AuthGuard } from "@/features/auth/authGuard";
import NavigationFooter from "@/features/game/NavigationFooter";
import HowToPlay from "@/features/game/settings/info/howToPlay";

export default function GameSettingsInfoHowToPlay() {
  const pageTitle = "設定";
  const pageSubTitle = "遊び方";

  return (
    <AuthGuard>
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
          <HowToPlay />
        </div>
        <div className="fixed inset-x-0 bottom-0 flex items-center justify-around border bg-white p-4 shadow-md">
          <NavigationFooter />
        </div>
      </div>
    </AuthGuard>
  );
}
