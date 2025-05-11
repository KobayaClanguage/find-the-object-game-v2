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
      <div>
        <h1>Find-the-object-game</h1>
        <video className="" id="video" autoPlay muted playsInline></video>
        <canvas className="hidden" id="camera-canvas" ref={canvasRef}></canvas>
        <canvas id="react-canvas"></canvas>
      </div>
      <div className="fixed inset-x-0 bottom-0 flex items-center justify-around border bg-white p-4 shadow-md">
        <NavigationFooter />
      </div>
    </div>
  );
}
