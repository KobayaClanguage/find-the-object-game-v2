"use client";
import jsQR from "jsqr";
import { auth } from "@/firebase/config";
import { db } from "@/firebase/config";
import { doc, updateDoc } from "firebase/firestore";

export async function ScanQR(
  video: HTMLVideoElement,
  canvasRef: HTMLCanvasElement | null,
  onDetected: (name: string) => void,
): Promise<() => void> {
  let contentWidth = 500;
  let contentHeight = 500;

  if (!canvasRef) return () => {};
  const cvs = canvasRef;
  const ctx = cvs.getContext("2d", { willReadFrequently: true });
  if (!ctx) return () => {};

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        width: 640,
        height: 480,
        facingMode: { exact: "environment" },
      },
    });

    video.srcObject = stream;
    await video.play(); // ← 再生されるまで待つ

    contentWidth = video.videoWidth || 640;
    contentHeight = video.videoHeight || 480;

    let intervalId: NodeJS.Timeout | null = null;
    let animationFrameId: number | null = null;

    const canvasUpdate = () => {
      cvs.width = contentWidth;
      cvs.height = contentHeight;
      ctx.drawImage(video, 0, 0, contentWidth, contentHeight);
      animationFrameId = requestAnimationFrame(canvasUpdate);
    };

    const checkImage = async () => {
      const imageData = ctx.getImageData(0, 0, contentWidth, contentHeight);
      const code = jsQR(imageData.data, contentWidth, contentHeight);

      if (code) {
        if (auth.currentUser === null) return;
        const objectsRef = doc(
          db,
          "game_progress",
          auth.currentUser.uid.toString(),
        );

        const objectsName = [
          "object_1",
          "object_2",
          "object_3",
          "object_4",
          "object_5",
          "object_6",
          "object_7",
          "object_8",
          "object_9",
          "object_10",
        ];

        for (const objectName of objectsName) {
          if (code.data === objectName) {
            await updateDoc(objectsRef, { [objectName]: true });
            onDetected(objectName);
            return;
          }
        }
      }
    };

    // ここで両処理を開始
    canvasUpdate();
    intervalId = setInterval(checkImage, 300);

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (intervalId) clearInterval(intervalId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  } catch (error) {
    console.error("カメラ起動に失敗:", error);
    return () => {};
  }
}
