"use client";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { AuthGuard } from "@/features/auth/authGuard";
import NavigationFooter from "@/features/game/NavigationFooter";
import { doc, getDoc} from "firebase/firestore";
import { db } from "@/firebase/config";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function GameStampId() {
  const pageTitle = "マップ";
  const params = useParams();
  const ID = String(params.stampId);
  const [errorMessage, setErrorMessage] = useState("");

  const [stampName, setStampName] = useState();
  const [MapURL, setMapURL] = useState();

  useEffect(() => {
    const GetObjectInfo = async() => {
      const NameDocRef = doc(db, "ObjectInfo", ID);
      try {
        const NameDocSnap = await getDoc(NameDocRef);
        setStampName(NameDocSnap.data()?.["Name"]);
        setMapURL(NameDocSnap.data()?.["MapURL"]);
      } catch {
        setErrorMessage("通信エラーが発生しました");
      }
    }
    GetObjectInfo();

  }, [ID]);


  return (
    <AuthGuard>
      <div className="relative h-full"
      style={{
        paddingBottom: `calc(var(--recaptcha-notice-height, 16px) + var(--navigation-footer-height, 80px))`
      }}>

        <h1 className="fixed inset-x-0 top-0 bg-[#0094f4] p-4 pt-7 text-center text-3xl text-white">
          {pageTitle}
        </h1>
        <div className="pt-20">
          <div className="relative mx-6 flex h-[80px] items-center justify-around">
            <div className="absolute left-0">
              <Link href="/game/stamp" className="p-0">
                <ChevronLeft color="#000000" size={50} />
              </Link>
            </div>
            <h1 className="text-[30px]">{stampName}</h1>
          </div>
          {/* (画面サイズの縦幅:100vh) - (タイトルバーの縦幅:80px) - (ナビゲーションバーの縦幅:74px) - (スタンプ名タイトルの縦幅:80px) */}
          <div className="relative h-[calc(100vh-80px-74px-80px)] w-full">
            <div className="text-center text-lg font-bold text-red-500">{errorMessage}</div>
            <iframe
              src={MapURL}
              style={{ border: 0 }}
              className="size-full"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            >
            </iframe>
          </div>
        </div>
        <div className="fixed inset-x-0 bottom-0 flex items-center justify-around border bg-white p-4 shadow-md">
          <NavigationFooter />
        </div>
      </div>
    </AuthGuard>
  );
}