"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import NavigationFooter from "@/features/game/NavigationFooter";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sendLinkEmail } from "@/features/auth/auth";
import { useRouter } from "next/navigation";
import { AuthGuard } from "@/features/auth/authGuard";

export default function GameSettingsAccountLink() {
  const pageTitle = "設定";
  const pageSubTitle = "メールアドレスと連携する";
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
    sendLinkEmail(password, newEmail)
      .then((result) => {
        if (result.success) {
          router.push("/auth/verify/send");
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

        <div className="pb-16 pt-20">
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
            現在のゲームデータを紐づけるために、パスワードと新しいメールアドレスを入力してください。
          </p>
          <div className="mb-8">
            <Label className="text-2xl">パスワード</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4"
            />

            <Label className="text-2xl">新しいメールアドレス</Label>
            <Input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="mb-4"
            />

            <Label className="text-2xl">新しいメールアドレス（確認用）</Label>
            <Input
              type="email"
              value={newEmailConfirm}
              onChange={(e) => setNewEmailConfirm(e.target.value)}
              className="mb-4"
            />

            <div className="text-center text-red-500">{errorMessage}</div>

            <Button
              className="mt-6 h-14 w-full rounded-none bg-[#0094f4] text-2xl font-semibold text-white"
              onClick={sendEmail}
            >
              確認メールを送信
            </Button>
          </div>
        </div>

        <div className="fixed inset-x-0 bottom-0 flex items-center justify-around border bg-white p-4 shadow-md">
          <NavigationFooter />
        </div>
      </div>
    </AuthGuard>
  );
}
