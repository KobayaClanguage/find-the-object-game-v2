'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { reauthenticateWithCredential,
         verifyBeforeUpdateEmail,
         EmailAuthProvider,
         onAuthStateChanged,
         User
} from 'firebase/auth';
import { auth } from "@/app/config";
import NavigationFooter from "@/features/game/NavigationFooter";
import { ChevronLeft } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";


export default function ChangEmail() {
  const { handleSubmit } = useForm();

  // メールアドレス取得
  const [password, setPassword] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>): void => setNewEmail(event.target.value);
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>): void => setPassword(event.target.value);


  // ログインしているか確認
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        setUser(user);
        if (user === null) {
            router.push('/auth/login');
        }
    })
  })

  // メールアドレス変更
  const submitEmail = handleSubmit(() => {
        const credential = EmailAuthProvider.credential(user?.email ?? '', password);
        if (user === null) return;
        reauthenticateWithCredential(user, credential)
        .then(() => {
            console.log("再認証成功");
            verifyBeforeUpdateEmail(user, newEmail)
            .then(() => {
                console.log("新しいメールアドレス宛に確認メールを送信しました");
                router.push("/game/settings/account/change/email/send");
            })
            .catch((error) => {
                console.log(error);
            });
        })          
        .catch((error) => {
            console.log(error);
        });
  })


  const pageTitle = "設定";

  return (
    // TODO: フロントエンド実装
    <div>
      <div className="relative h-full">
        <h1 className="fixed inset-x-0 top-0 bg-[#0094f4] p-4 pt-7 text-center text-3xl text-white">
          {pageTitle}
        </h1>
      </div>

      <div className="mx-auto justify-center pb-24 pt-28">

        <div className="flex pb-10">
          <ChevronLeft size={30}/>
          <h1 className="mx-auto my-auto text-2xl">メールアドレスを変更</h1>
        </div>

        <div className="flex justify-center text-xl">
          確認のため、<span className="font-extrabold">パスワード</span>を入力してください。
        </div>

        <form className="mt-4 pb-10">
          <div className="w-2/3 mb-10 mx-auto">
            <Label htmlFor="password" className="text-sm">
              パスワード
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="パスワード"
              required
              className="h-[40px] text-sm border-gray-500 rounded-none"
              value={ password } 
              onChange={ onChangePassword }
            />
          </div>

          <div className="flex justify-center text-xl">
            <span className="font-extrabold">新しいメールアドレス</span>を入力してください。
          </div>


          <div className="w-2/3 mb-6 mx-auto mt-4">
            <Label htmlFor="email" className="text-sm">
              新しいメールアドレス
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="ID (メールアドレス)"
              required
              className="h-[40px] text-sm border-gray-500 rounded-none"
              value={ newEmail } 
              onChange={ onChangeEmail }
            />
          </div>


          <Button className="flex mt-10 mx-auto w-2/3 h-14 bg-[#0094f4] text-white text-2xl font-semibold rounded-none" onClick={ submitEmail }>
            変更
          </Button>
        </form>



        <div className="fixed inset-x-0 bottom-0 flex items-center justify-around border bg-white p-4 shadow-md">
          <NavigationFooter />
        </div>

      </div>


    </div>
  );
}