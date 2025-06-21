"use client";
import NavigationFooter from "@/features/game/NavigationFooter";
import { ScanQR } from "@/features/game/scan";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AuthGuard } from "@/features/auth/authGuard";

export default function GameScan() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const router = useRouter();
  const [detectedName, setDetectedName] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const handleClosePopup = () => {
    setShowPopup(false);
    router.push("/game/stamp");
  };

  useEffect(() => {
    const video = document.getElementById("video") as HTMLVideoElement;
    let stopScan: (() => void) | null = null;

    const startScan = async () => {
      stopScan = await ScanQR(video, canvasRef.current, (name) => {
        setDetectedName(name);
        setShowPopup(true);
      });
    };

    startScan();

    return () => {
      if (stopScan) stopScan();
    };
  }, []);

  const pageTitle = "QRコード読み取り";
  return (
    <AuthGuard>
      <div className="relative h-full">
        <h1 className="fixed inset-x-0 top-0 bg-[#0094f4] p-4 pt-7 text-center text-3xl text-white">
          {pageTitle}
        </h1>

        {showPopup && (
          <div className="popup-overlay fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="popup bg-white p-6 rounded shadow-md text-center">
              <p>{detectedName} を読み取りました！</p>
              <button
                onClick={handleClosePopup}
                className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
              >
                閉じる
              </button>
            </div>
          </div>
        )}

      <div className="mt-20 [height:calc(100vh_-_160px)] flex flex-col items-center justify-center">
        <video
          className="object-fill"
          id="video"
          autoPlay
          muted
          playsInline
        ></video>
        <canvas className="hidden" ref={canvasRef}></canvas>
      </div>

      <div className="fixed inset-x-0 bottom-0 flex items-center justify-around border bg-white p-4 shadow-md">
        <NavigationFooter />
      </div>
    </AuthGuard>
  );
}
