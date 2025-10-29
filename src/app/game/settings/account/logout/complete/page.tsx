import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GameSettingsAccountLogoutComplete() {
  const pageTitle = "設定";
  const pageSubTitle = "ログアウト";

  return (
    <div className="relative h-full"
    style={{
      paddingBottom: `var(--recaptcha-notice-height, 16px)`
    }}
    >

      <h1 className="fixed inset-x-0 top-0 bg-[#0094f4] p-4 pt-7 text-center text-3xl text-white">
        {pageTitle}
      </h1>
      <div className="pt-20">
        <div className="relative mx-6 flex h-[80px] items-center justify-around">
          <h1 className="text-2xl">{pageSubTitle}</h1>
        </div>
        <div className="relative mt-4 flex w-full flex-col items-center justify-start px-9 text-xl">
          <p className="text-2xl">ログアウトしました</p>
          <Button
            asChild
            className="mb-4 mt-16 h-14 w-full rounded-none bg-[#0094f4] text-2xl"
          >
            <Link href="/auth/login">ログイン画面に戻る</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
