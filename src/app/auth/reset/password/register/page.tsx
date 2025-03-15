"use client";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "@/app/config";
import { useState } from "react";
import { useForm } from 'react-hook-form'
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PasswordResetPage() {
  const [newPassword, setNewPassword] = useState("");
  const onChangeNewPassword = (event: React.ChangeEvent<HTMLInputElement>): void => setNewPassword(event.target.value);
  const { handleSubmit } = useForm();

  // パスワードのリセット
  const resetPassword = handleSubmit(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const oobCode = queryParams.get('oobCode');

    if (!oobCode) {
        console.log("oobCodeがありません")
        return;
    }
    // oobCode（Firebaseのリセットコード）が有効か確認
    confirmPasswordReset(auth, oobCode, newPassword)
    .then(() => {
        console.log("パスワードの再設定に成功しました");
    })
    .catch(() => {
        console.log("パスワードの再設定に失敗しました");
    })

  })

    return (
        <div>
            <h1>find-the-object-game パスワードの再設定</h1>
            <Label htmlFor="password" className="text-sm">
                新しいパスワード
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="新しいパスワード"
                required
                className="h-[40px] text-sm border-gray-500 rounded-none"
                value={ newPassword } 
                onChange={ onChangeNewPassword }
              />
            <Button className="mt-6 w-full h-14 bg-[#0094f4] text-white text-2xl font-semibold rounded-none" onClick={ resetPassword }>
              パスワードをリセット
            </Button>

        </div>
    )
}