"use client";
import NavigationFooter from "@/features/game/NavigationFooter";
import { fetchStamps, StampInfo } from "@/features/game/stamp";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";

export default function GamePage() {
  const pageTitle = "ホーム";
  const completeIconUrl = "/game/stamp/stamp-complete.png";
  const uncompleteIconUrl = "/game/stamp/stamp-uncomplete.png";
  const [stamps, setStamps] = useState<StampInfo[]>([]);
  const [isClear, setIsClear] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const Stamps = await fetchStamps(user.uid);
          setStamps(Stamps.stamps ?? []);
          setIsClear(Stamps.isClear);
        }
      });
    };

    fetchData();
  }, []);

  return (
    <div className="relative h-full">
      <h1 className="fixed inset-x-0 top-0 bg-[#0094f4] p-4 pt-7 text-center text-3xl text-white">
        {pageTitle}
      </h1>
      <div className="pb-16 pt-24">
        <div className="flex items-center justify-around p-4">
          <Image
            src={"/images/nukaLogo.png"}
            alt="額のロゴ"
            width={158}
            height={51}
          />
          <Image
            src="/images/cross.png"
            alt="☓アイコン"
            width={30}
            height={30}
          />
          <Image
            src="/images/KITimage.png"
            alt="KITロゴ"
            width={150}
            height={75}
          />
        </div>

        {isClear && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="rounded-2xl bg-white p-8 text-center shadow-xl">
              <h2 className="mb-4 text-2xl font-bold">🎉 おめでとう！ 🎉</h2>
              <p className="mb-4">すべてのオブジェを見つけました！</p>
              <button
                onClick={() => setIsClear(false)}
                className="mt-4 rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 "
              >
                閉じる
              </button>
            </div>
          </div>
        )}

        <h2 className="w-full text-center text-lg font-bold">オブジェ一覧</h2>
        {/* スタンプ一覧 */}
        <div className="grid grid-cols-2 gap-2 p-4">
          {stamps.map((item) => (
            <div key={item.id} className="flex flex-col items-center">
              <Link href={`/game/stamp/${item.id}`}>
                <Image
                  src={item.isCollected ? completeIconUrl : uncompleteIconUrl}
                  alt={item.name}
                  width={120}
                  height={120}
                  className="object-contain"
                />
                <p className="text-center">{item.name}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 flex items-center justify-around border bg-white p-4 shadow-md">
        <NavigationFooter />
      </div>
    </div>
  );
}
