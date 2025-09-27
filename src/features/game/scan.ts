"use client";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import jsQR from "jsqr";
import { auth, db } from "@/firebase/config";

export async function ScanQR(
  video: HTMLVideoElement,
  canvasRef: HTMLCanvasElement | null,
  onDetected: (name: string) => void,
  onDetectedVideoFileName: (fileName: string) => void,
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

    if (code?.data) {
      if (!auth.currentUser) return;
      const GameProgressDocRef = doc(db, "game_progress", auth.currentUser.uid.toString());

      const UUIDDocRef = doc(db, "UUIDmap", code.data);
      const UUIDDocSnap = await getDoc(UUIDDocRef);
      if (UUIDDocSnap.exists()) {
        const UUIDData = UUIDDocSnap.data();
        if (UUIDData) {
          await updateDoc(GameProgressDocRef, { [UUIDData.UUID]: true });

          onDetected(UUIDData.Name);
          const VideoFileNameDocRef = doc(db, "VideoFileNameMap", UUIDData.ID);
          const VideoFileNameDocSnap = await getDoc(VideoFileNameDocRef);
          const VideoFileNameData = VideoFileNameDocSnap.data()?.["VideoFileName"];
          onDetectedVideoFileName(VideoFileNameData);

          const NameDocRef = doc(db, "NameMap", UUIDData.ID);
          const NameDocSnap = await getDoc(NameDocRef);
          const NameData = NameDocSnap.data()?.["Name"];
          onDetected(NameData)
        } else {
          console.warn("読み取ったQRコードはスタンプに対応していません:", code.data);
        }
      } else {
        console.warn("読み取ったQRコードは存在しません:", code.data);
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
