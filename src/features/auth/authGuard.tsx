'use client';

import { auth } from '@/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { type ReactNode, useEffect, useState } from 'react';

type Props = {
  children: ReactNode;
};

export const AuthGuard = ({ children }: Props) => {
  const router = useRouter();
  const [userChecked, setUserChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        router.push('/auth/login');
      }
      setUserChecked(true);
    });

    return () => unsubscribe();
  }, [router]);

  // 認証状態確認中
  if (!userChecked) {
    return <div>読み込み中です</div>;
  }

  // 画面遷移は非同期のため、この一時的にこのコンポーネントを表示する
  if (!isAuthenticated) {
    return <div>ログイン画面に遷移します</div>;
  }

  return <>{children}</>;
};
