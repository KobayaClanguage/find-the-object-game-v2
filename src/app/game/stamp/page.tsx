"use client";
import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AuthGuard } from "@/features/auth/authGuard";
import NavigationFooter from "@/features/game/NavigationFooter";
import { fetchStamps, type StampInfo } from "@/features/game/stamp";
import { auth, db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { createGameProgressDocument } from "@/features/game/firestore";

export default function GamePage() {
  const pageTitle = "ホーム";
  const firstViewIndex = 2;
  const [stamps, setStamps] = useState<StampInfo[]>([]);
  const [isClear, setIsClear] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          try{
            const GameProgressDocRef = doc(db, "game_progress", user.uid);
            const GameProgressDocSnap = await getDoc(GameProgressDocRef);
            if(!GameProgressDocSnap.exists()) {
              const GameProgressInitResult = await createGameProgressDocument(user.uid);
              if (!GameProgressInitResult) {
                setErrorMessage("ゲームデータの初期化もしくは取得に失敗しました");
              }
            }
            const Stamps = await fetchStamps(user.uid);
            setStamps(Stamps.stamps ?? []);
            setIsClear(Stamps.isClear);
          } catch {
            setErrorMessage("ゲームデータの取得に失敗しました");
          }
        }
      });
    };

    fetchData();
  }, []);

  return (
    <AuthGuard>
      <div className="relative h-full">
        <h1 className="fixed inset-x-0 top-0 bg-[#0094f4] p-4 pt-7 text-center text-3xl text-white">
          {pageTitle}
        </h1>
        <div className="pb-32 pt-24">
          <div className="flex items-center justify-around p-4">
            <Image
              src={"/images/nukaLogo.png"}
              alt="額のロゴ"
              width={158}
              height={51}
              priority={true}
            />
            <Image
              src="/images/cross.png"
              alt="☓アイコン"
              width={30}
              height={30}
              priority={true}
            />
            <Image
              src="/images/KITimage.png"
              alt="KITロゴ"
              width={150}
              height={75}
              priority={true}
            />
          </div>

          {isClear && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="rounded-2xl bg-white p-8 text-center shadow-xl">
                <h2 className="mb-4 text-2xl font-bold">🎉 おめでとう！ 🎉</h2>
                <p className="mb-4">すべてのオブジェを見つけました！</p>
                <button
                  onClick={() => setIsClear(false)}
                  className="mt-4 rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
                  type="button"
                >
                  閉じる
                </button>
              </div>
            </div>
          )}

          <h2 className="w-full text-center text-lg font-bold">オブジェ一覧</h2>
          <div className="text-center text-lg font-bold text-red-500">{errorMessage}</div>
          {/* スタンプ一覧 */}
          <div className="grid grid-cols-2 gap-2 p-4">
            {stamps.map((item, index) => (
              <div key={item.ID} className="flex flex-col items-center text-center">
                <Link href={`/game/stamp/${item.ID}`} className="flex w-[120px] flex-col items-center gap-2">
                  <Image
                    src={`/game/stamp/${item.isCollected ? 'Collected' : 'UnCollected'}/${item.IconFileName}`}
                    alt={item.Name}
                    width={ 1070 }
                    height={ 1255 }
                    className="object-contain"
                    priority={index < firstViewIndex}
                  />
                  <p>{item.Name}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="fixed inset-x-0 bottom-0 flex items-center justify-around border bg-white p-4 shadow-md">
          <NavigationFooter />
        </div>
      </div>
    </AuthGuard>
  );
}
