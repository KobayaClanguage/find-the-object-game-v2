import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AuthGuard } from "@/features/auth/authGuard";
import NavigationFooter from "@/features/game/NavigationFooter";

export default function GameSettingsAccountChangeEmailSend() {
  const pageTitle = "設定";
  const pageSubTitle = "メールアドレス変更";

  return (
    <AuthGuard>
      <div className="relative h-full">
        <h1 className="fixed inset-x-0 top-0 bg-[#0094f4] p-4 pt-7 text-center text-3xl text-white">
          {pageTitle}
        </h1>

        <div className="relative mx-6 flex h-[80px] items-center justify-around pb-16 pt-32">
          <div className="absolute left-0">
            <Link href="/game/settings" className="p-0">
              <ChevronLeft color="#000000" size={50} />
            </Link>
          </div>
          <h1 className="text-2xl">{pageSubTitle}</h1>
        </div>

        <div className="mx-auto w-4/5">
          <p className="mb-2 text-2xl">
            新しいメールアドレスに確認URLを送信しました。
          </p>

          <p className="mb-2 text-2xl">
            メールが届かない場合は、迷惑メールフォルダーなどもご確認ください。
          </p>

          <Button
            asChild
            className="mt-6 h-14 w-full rounded-none bg-[#0094f4] text-2xl font-semibold text-white"
          >
            <Link href="/auth/login">ログイン画面に戻る</Link>
          </Button>
        </div>

        <div className="fixed inset-x-0 bottom-0 flex items-center justify-around border bg-white p-4 shadow-md">
          <NavigationFooter />
        </div>
      </div>
    </AuthGuard>
  );
}
