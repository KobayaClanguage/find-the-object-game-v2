"use client";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/app/config";
import { useState } from "react";
import { useForm } from 'react-hook-form'
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function PasswordResetPage() {
  const [email, setEmail] = useState("");
  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>): void => setEmail(event.target.value);
  const { handleSubmit } = useForm();
  const router = useRouter();

  const sendEmail = handleSubmit(() => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        router.push("/game/settings/account/change/password/complete");
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  })

    return (
        <div>
            <h1>find-the-object-game パスワードの再設定メール送信</h1>
            <Label htmlFor="email" className="text-sm">
                ID（メールアドレス）
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="ID (メールアドレス)"
                required
                className="h-[40px] text-sm border-gray-500 rounded-none"
                value={ email } 
                onChange={ onChangeEmail }
              />
            <Button className="mt-6 w-full h-14 bg-[#0094f4] text-white text-2xl font-semibold rounded-none" onClick={ sendEmail }>
              パスワードメールを送信
            </Button>

        </div>
    )
}