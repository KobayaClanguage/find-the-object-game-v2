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
  const [detectedName, setDetectedName] = useState<string | null>(null);
  const [VideoFileName, setVideoFileName] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const handleClosePopup = () => {
    setShowPopup(false);
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
        (QRCodeUUID) => {
          setDetectedName(QRCodeUUID);
          setShowPopup(true);
        },
        (fileName: string) => {
          setVideoFileName(fileName);
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

        {showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="rounded bg-white p-6 text-center shadow-md">
              <p>{detectedName} の額を読み取りました！</p>
              <video
                src={`/KarutaVideo/${VideoFileName}`}
                controls
                className="mx-auto mt-4 h-96"
              ></video>
              <button
                onClick={handleClosePopup}
                className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
                type="button"
              >
                閉じる
              </button>
            </div>
          </div>
        )}

        <div className="mt-20 flex flex-col items-center justify-center [height:calc(100vh_-_160px)]">
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
