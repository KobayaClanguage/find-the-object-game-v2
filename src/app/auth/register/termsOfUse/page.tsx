import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import TermsOfUse from "@/features/game/settings/info/TermsOfUse";

// アカウント登録時にユーザが閲覧するページ
// AuthGuardは不要
export default function AuthRegisterTermsOfUse() {
  const pageTitle = "利用規約";
  return (
    <div className="relative h-full">
      <div className="pt-20 pb-16">
        <div className="relative mx-6 flex h-[80px] items-center justify-around">
          <div className="absolute left-0">
            <Link href="/auth/register" className="p-0">
              <ChevronLeft color="#000000" size={50} />
            </Link>
            <h1 className="fixed inset-x-0 top-0 bg-[#0094f4] p-4 pt-7 text-center text-3xl text-white">
              {pageTitle}
            </h1>
          </div>
        </div>
        <TermsOfUse />
      </div>
    </div>
  );
}
