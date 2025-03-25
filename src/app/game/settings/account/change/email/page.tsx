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
            })
        .catch((error) => {
            console.log(error);
        })
        });
  })



  return (
    <div>
      <h1>Find-the-object-game</h1>
      <h1>メールアドレスを変更</h1>
      <h1>メールアドレス</h1>
      <input className='border border-black' type={ "text" } value={ newEmail } onChange={ onChangeEmail }/>    
      <h1>パスワード</h1>
      <input className='border border-black mb-10' type={ "text" } value={ password } onChange={ onChangePassword }/>
      <br/>
      <button className='border border-black mb-5' onClick={ submitEmail }>メールアドレス変更</button>

      <hr className='border border-black'></hr>


    </div>
  );
}