'use client';

import { Diamond } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signupWithEmail } from '@/features/auth/auth';

export default function RegisterPage() {
  const router = useRouter();
  const [error_message, setErrorMessage] = useState('');
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  function signup(formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password');

    if (typeof email !== 'string' || typeof password !== 'string') {
      setErrorMessage('入力値が不正です');
      return;
    }

    signupWithEmail(email, password)
      .then((result) => {
        console.log(result);
        if (result.success) {
          router.push('/game/stamp');
        } else {
          setErrorMessage(
            result.errorMessage ?? 'アカウント登録に失敗しました',
          );
        }
      })
      .catch(() => {
        setErrorMessage('アカウント登録に失敗しました');
      });
  }

  return (
    <div className="my-2 flex min-h-[90vh] w-full max-w-md flex-col items-center justify-center space-y-4 bg-white sm:px-4 md:mb-5 md:max-w-full">
      <div className="mb-6 flex flex-col items-center space-y-4 text-center">
        <h1 className="font-bold font-sans text-2xl">遊び方</h1>
        <ol className="space-y-2 text-left font-sans text-xl">
          <li className="flex items-center">
            <Diamond size={18} className="m-2" />
            <p>額地区に隠されたオブジェを見つける</p>
          </li>
          <li className="flex items-center">
            <Diamond size={18} className="m-2" />
            <p>オブジェのQRコードを読み取る</p>
          </li>
          <li className="flex items-center">
            <Diamond size={18} className="m-2" />
            <p>全て見つけたらゲームクリア</p>
          </li>
        </ol>
      </div>
      <div className="mt-10 mb-4 flex flex-col items-center space-y-2">
        <h2 className="font-bold text-2xl">オブジェを探せゲーム</h2>
        <p className="text-gray-700 text-xl">新規登録</p>
      </div>

      <Card className="w-5/6 rounded-none border-2 border-gray-400 py-10">
        <CardContent className="m-0 flex w-full flex-col items-center">
          <form className="mt-4 w-full" action={signup}>
            <div className="mb-4">
              <Label htmlFor="email" className="text-sm">
                ID（メールアドレス）
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="ID (メールアドレス)"
                required
                className="h-[40px] rounded-none border-gray-500 text-sm"
              />
            </div>
            <div className="mb-6">
              <Label htmlFor="password" className="text-sm">
                パスワード
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="パスワード"
                required
                className="h-[40px] rounded-none border-gray-500 text-sm"
              />
            </div>

            <div className="mb-6 flex items-center justify-center space-x-2">
              <input
                id="check_terms_of_use"
                name="check_terms_of_use"
                type="checkbox"
                required
                checked={isTermsAccepted}
                onChange={(e) => setIsTermsAccepted(e.target.checked)}
                className="size-4 rounded border-gray-500 text-[#0094f4] focus:ring-2 focus:ring-[#0094f4] focus:ring-offset-0"
              />
              <Label
                htmlFor="check_terms_of_use"
                className="cursor-pointer text-sm"
              >
                <Link
                  href="/auth/register/termsOfUse"
                  className="text-[#0094f4] hover:underline"
                >
                  利用規約
                </Link>
                に同意する
              </Label>
            </div>
            <div className="text-center text-red-500">{error_message}</div>

            <Button
              className={`mt-6 h-14 w-full rounded-none font-semibold text-2xl ${
                isTermsAccepted
                  ? 'cursor-pointer bg-[#0094f4] text-white'
                  : 'cursor-not-allowed bg-gray-400 text-gray-200'
              }`}
              type="submit"
              disabled={!isTermsAccepted}
            >
              新規登録
            </Button>
          </form>

          <Button
            asChild
            className="mt-8 h-14 w-full rounded-none border-[#0094f4] border-[3px] bg-white font-bold font-sans text-2xl text-[#0094f4]"
          >
            <Link href={'/auth/login'}>ログイン</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
