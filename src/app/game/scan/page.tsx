"use client";
import NavigationFooter from "@/features/game/NavigationFooter";
import { Scan } from "@/features/game/scan";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function GameScan() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const video = document.getElementById("video") as HTMLVideoElement;
    Scan(video, canvasRef.current, router);
  });
  // TODO: フロントエンド実装
  const pageTitle = "QRコード読み取り";
  return (
    <div className="relative h-full">
      <h1 className="fixed inset-x-0 top-0 bg-[#0094f4] p-4 pt-7 text-center text-3xl text-white">
        {pageTitle}
      </h1>
      <div className="min-h-screen flex flex-col">
        <header className="text-center pt-4">
          <h1>Find-the-object-game</h1>
        </header>

        <main className="flex-grow flex items-center justify-center relative">
          <video
            id="video"
            autoPlay
            muted
            playsInline
            className="max-w-full max-h-full object-contain"
          ></video>
          <canvas
            className="hidden"
            id="camera-canvas"
            ref={canvasRef}
          ></canvas>
          <canvas id="react-canvas" className="absolute top-0 left-0"></canvas>
        </main>

        <footer className="fixed inset-x-0 bottom-0 flex items-center justify-around border bg-white p-4 shadow-md">
          <NavigationFooter />
        </footer>
      </div>
    </div>
  );
}
