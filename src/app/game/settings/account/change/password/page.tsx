'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { reauthenticateWithCredential,
         verifyBeforeUpdateEmail,
         EmailAuthProvider,
         onAuthStateChanged,
         updatePassword,
         signOut
} from 'firebase/auth';
import { auth } from "@/app/config";

export default function chang_email() {
  const { handleSubmit } = useForm();

  // メールアドレス取得
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>): void => setPassword(event.target.value);
  const onChangeNewPassword = (event: React.ChangeEvent<HTMLInputElement>): void => setNewPassword(event.target.value);


  // ログインしているか確認
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        setUser(user);
        if (user === null) {
            router.push('/auth/login');
        }
    })
  })

  // パスワード変更
  const submitPassword = handleSubmit(() => {
    const credential = EmailAuthProvider.credential(user?.email ?? '', password);
    reauthenticateWithCredential(user, credential)
    .then(() => {
        console.log("再認証に成功しました");
        updatePassword(user, newPassword)
        .then(() => {
            console.log("パスワードを変更しました");
            signOut(auth);
            router.push("/auth/login");
        })
        .catch((error) =>{
            console.log(error);
        })
    })
    .catch((error) => {
        console.log(error);
    })
  })



  return (
    <div>
      <h1>Find-the-object-game</h1>
      <h1>パスワードを変更</h1>
      <h1>現在のパスワード</h1>
      <input className='border border-black mb-10' type={ "text" } value={ password } onChange={ onChangePassword }/>
      <h1>新しいパスワード</h1>
      <input className='border border-black' type={ "text" } value={ newPassword } onChange={ onChangeNewPassword }/>    
      <br/>
      <button className='border border-black mb-5' onClick={ submitPassword }>パスワード変更</button>

      <hr className='border border-black'></hr>


    </div>
  );
}