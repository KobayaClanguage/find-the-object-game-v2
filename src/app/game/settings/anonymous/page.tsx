import NavigationFooter from "@/features/game/NavigationFooter";
import Link from "next/link";
import {
  Diamond,
  Mail,
  Gamepad2,
  Info,
  FileText,
  ChevronRight,
} from "lucide-react";
import { AuthGuard } from "@/features/auth/authGuard";

export default function GameSettingsAnonymous() {
  const pageTitle = "設定";

  return (
    <AuthGuard>
      <div className="relative h-full">
        <h1 className="fixed inset-x-0 top-0 bg-[#0094f4] p-4 pt-7 text-center text-3xl text-white">
          {pageTitle}
        </h1>

        <div className="mx-auto justify-center pb-24 pt-28">
          <div className="mx-auto mb-5 flex w-[90%] items-center">
            <Diamond width={30} height={30} className="mr-5" />

            <span className="text-3xl">ユーザー設定</span>
          </div>

          <div className="mx-auto w-3/4">
            <div className="mb-5 flex items-center">
              <Mail width={30} height={30} className="mr-5" />

              <Link href={"/game/settings/account/link"}>
                <span className="text-2xl">メールアドレスと連携する</span>
              </Link>

              <ChevronRight width={30} height={30} className="ml-auto" />
            </div>
          </div>

          <div className="mx-auto mb-5 flex w-[90%] items-center">
            <Diamond width={30} height={30} className="mr-5" />
            <span className="text-3xl">サイト情報</span>
          </div>

          <div className="mx-auto w-3/4">
            <div className="mb-5 flex items-center">
              <Gamepad2 width={30} height={30} className="mr-5" />

              <Link href={"/game/settings/info/howToPlay"}>
                <span className="text-2xl">遊び方</span>
              </Link>

              <ChevronRight width={30} height={30} className="ml-auto" />
            </div>

            <div className="mb-5 flex items-center">
              <Info width={30} height={30} className="mr-5" />

              <Link href={"/game/settings/info/aboutUs"}>
                <span className="text-2xl">本webサイトについて</span>
              </Link>

              <ChevronRight width={30} height={30} className="ml-auto" />
            </div>

            <div className="flex items-center">
              <FileText width={30} height={30} className="mr-5" />

              <Link href={"/game/settings/info/termsOfUse"}>
                <span className="text-2xl">利用規約</span>
              </Link>

              <ChevronRight width={30} height={30} className="ml-auto" />
            </div>
          </div>
        </div>

        <div className="fixed inset-x-0 bottom-0 flex items-center justify-around border bg-white p-4 shadow-md">
          <NavigationFooter />
        </div>
      </div>
    </AuthGuard>
  );
}
