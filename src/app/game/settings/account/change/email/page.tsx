"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sendChangeEmail } from "@/features/auth/auth";
import { AuthGuard } from "@/features/auth/authGuard";
import NavigationFooter from "@/features/game/NavigationFooter";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function GameSettingsAccountChangeEmail() {
  const pageTitle = "設定";
  const pageSubTitle = "メールアドレス変更";
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newEmailConfirm, setNewEmailConfirm] = useState("");

  const sendEmail = async () => {
    if (newEmail !== newEmailConfirm) {
      setErrorMessage("メールアドレスが一致していません");
      return;
    }
    sendChangeEmail(password, newEmail)
      .then((result) => {
        if (result.success) {
          router.push("/game/settings/account/change/email/send");
        } else {
          setErrorMessage(
            result.errorMessage ?? "確認メールの送信に失敗しました",
          );
        }
      })
      .catch(() => {
        setErrorMessage("確認メールの送信に失敗しました");
      });
  };

  return (
    <AuthGuard>
      <div className="relative h-full">
        <h1 className="fixed inset-x-0 top-0 bg-[#0094f4] p-4 pt-7 text-center text-3xl text-white">
          {pageTitle}
        </h1>

        <div className="pt-20 pb-16">
          <div className="relative mx-6 flex h-[80px] items-center justify-around">
            <div className="absolute left-0">
              <Link href="/game/settings" className="p-0">
                <ChevronLeft color="#000000" size={50} />
              </Link>
            </div>
            <h1 className="text-2xl">{pageSubTitle}</h1>
          </div>
        </div>

        <div className="mx-auto w-4/5">
          <p className="mb-2 text-2xl">
            確認のため、<b>パスワード</b>を入力してください。
          </p>
          <div className="mb-8">
            <Label className="font-normal text-xl">パスワード</Label>
            <Input
              placeholder="パスワード"
              type="password"
              className="h-10 rounded-none border-black shadow-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <p className="mb-2 text-2xl">
            <b>新しいメールアドレス</b>を入力してください。
          </p>
          <div className="mb-8">
            <Label className="font-normal text-xl">新しいメールアドレス</Label>
            <Input
              placeholder="新しいメールアドレス"
              className="h-10 rounded-none border-black shadow-none"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </div>

          <p className="mb-2 text-2xl">
            確認のため、もう一度<b>新しいメールアドレス</b>を入力してください。
          </p>
          <div className="mb-8">
            <Label className="font-normal text-xl">
              新しいメールアドレス（確認）
            </Label>
            <Input
              placeholder="新しいメールアドレス（確認）"
              className="h-10 rounded-none border-black shadow-none"
              value={newEmailConfirm}
              onChange={(e) => setNewEmailConfirm(e.target.value)}
            />
          </div>
          <div className="text-center text-red-500">{errorMessage}</div>
          <Button
            className="mt-6 h-14 w-full rounded-none bg-[#0094f4] font-semibold text-2xl text-white"
            onClick={sendEmail}
          >
            確認メールを送信
          </Button>
        </div>

        <div className="fixed inset-x-0 bottom-0 flex items-center justify-around border bg-white p-4 shadow-md">
          <NavigationFooter />
        </div>
      </div>
    </AuthGuard>
  );
}
