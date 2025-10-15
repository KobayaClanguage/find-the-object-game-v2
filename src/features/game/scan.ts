"use client";
import { doc, updateDoc } from "firebase/firestore";
import jsQR from "jsqr";
import { stampIDs } from "@/features/game/stampData";
import { auth, db } from "@/firebase/config";

export async function ScanQR(
  video: HTMLVideoElement,
  canvasRef: HTMLCanvasElement | null,
  onDetected: (name: string) => void,
  onFirebaseError: (isFirebaseError: boolean) => void
): Promise<() => void> {
  const MAX_SCREEN_WIDTH = 640;
  const MAX_SCREEN_HEIGHT = 480;

  if (!canvasRef) return () => {};

  const cvs = canvasRef;
  const ctx = cvs.getContext("2d", { willReadFrequently: true });
  if (!ctx) return () => {};

  let stream: MediaStream | null = null;
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { facingMode: { exact: "environment" } },
    });
  } catch (e) {
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { facingMode: "user" },
      });
      console.warn(
        "environmentカメラが使えないため、userカメラに切り替えました",
        e,
      );
    } catch (err) {
      console.error("カメラ起動に失敗:", err);
      return () => {};
    }
  }

  video.srcObject = stream;
  if (!stream) return () => {};
  await video.play(); // 再生されるまで待つ

  // null値の場合はVGA規格のサイズに合わせて設定
  const contentWidth =
    stream.getVideoTracks()[0].getSettings().width || MAX_SCREEN_WIDTH;
  const contentHeight =
    stream.getVideoTracks()[0].getSettings().height || MAX_SCREEN_HEIGHT;
  console.log(contentWidth, contentHeight);

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
      if (!auth.currentUser) return;
      const objectsRef = doc(
        db,
        "game_progress",
        auth.currentUser.uid,
      );

      for (const stampID of stampIDs) {
        if (code.data === stampID) {
          try {
            await updateDoc(objectsRef, { [stampID]: true });
            onDetected(stampID);
          } catch {
            onFirebaseError(true);
          }
          return;
        }
      }
    }
  };

  canvasUpdate();
  intervalId = setInterval(checkImage, 300); // 300ms間隔でQRコード読み取り
  if (!intervalId) {
    console.error("ERROR: setInterval()");
    return () => {};
  }

  return () => {
    // アンマウント時の処理
    if (stream) {
      for (const track of stream.getTracks()) {
        track.stop();
      }
    }
    if (intervalId) clearInterval(intervalId);
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
  };
}
