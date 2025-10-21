"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AuthGuard } from "@/features/auth/authGuard";
import NavigationFooter from "@/features/game/NavigationFooter";
import { ScanQR } from "@/features/game/scan";

export default function GameScan() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasReady, setCanvasReady] = useState(false);
  const router = useRouter();
  const [showReadPopup, setShowQRReadPopup] = useState(false);
  const [isFirebaseError, setFirebaseError] = useState(false);
  const [detectedObjectName, setDetectedObjectName] = useState<string | null>(null);
  const [detectedObjectVideoFileName, setDetectedObjectVideoFileName] = useState<string>("");

  const handleCloseReadPopup = () => {
    setShowQRReadPopup(false);
    router.push("/game/stamp");
  };

  const handleCloseFirebaseErrorPopup = () => {
    setFirebaseError(false);
    router.push("/game/stamp");
  };

  useEffect(() => {
    if (!canvasReady) return;

    const video = document.getElementById("video") as HTMLVideoElement;
    let stopScan: (() => void) | null = null;

    const startScan = async () => {
      stopScan = await ScanQR(
        video,
        canvasRef.current,
        (ObjectName) => {
          setDetectedObjectName(ObjectName);
          setShowQRReadPopup(true);
        },
        (videoFileName) => {
          setDetectedObjectVideoFileName(videoFileName);
        },
        (isFirebaseError) => {
          if (isFirebaseError) {
            setFirebaseError(true);
          }
        }        
      );
    };

    startScan();

    return () => {
      if (stopScan) stopScan();
    };
  }, [canvasReady]);

  const pageTitle = "QRコード読み取り";
  return (
    <AuthGuard>
      <div className="relative h-full">
        <h1 className="fixed inset-x-0 top-0 bg-[#0094f4] p-4 pt-7 text-center text-3xl text-white">
          {pageTitle}
        </h1>

        {showReadPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="rounded bg-white p-6 text-center shadow-md">
              <p>{detectedObjectName} を読み取りました！</p>
              <video className="mt-4 h-96" controls src={`/game/stamp/KarutaVideo/${detectedObjectVideoFileName}`}></video>
              <button
                onClick={handleCloseReadPopup}
                className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
                type="button"
              >
                閉じる
              </button>
            </div>
          </div>
        )}

        {isFirebaseError && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="rounded bg-white p-6 text-center shadow-md">
              <p>通信エラーが発生しました</p>
              <button
                onClick={handleCloseFirebaseErrorPopup}
                className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
                type="button"
              >
                閉じる
              </button>
            </div>
          </div>
        )}

        <div className="mt-20 flex flex-col items-center justify-center [height:calc(100vh_-_200px)]">
          <video
            className="object-fill"
            id="video"
            autoPlay
            muted
            playsInline
          />
          <canvas
            className="hidden"
            ref={(el) => {
              canvasRef.current = el;
              if (el) setCanvasReady(true);
            }}
          />
        </div>

        <div className="fixed inset-x-0 bottom-0 flex items-center justify-around border bg-white p-4 shadow-md">
          <NavigationFooter />
        </div>
      </div>
    </AuthGuard>
  );
}