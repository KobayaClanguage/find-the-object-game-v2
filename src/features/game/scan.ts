"use client";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import jsQR from "jsqr";
import { auth, db } from "@/firebase/config";

export async function ScanQR(
  video: HTMLVideoElement,
  canvasRef: HTMLCanvasElement | null,
  onDetected: (QRname: string, videoFileName: string) => void,
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
        auth.currentUser.uid.toString(),
      );

      // FirebaseからQRコードのUUIDを取得
      const IDtoUUIDdocRef = doc(db, "QRcode", "ID-UUID");
      const IDtoUUIDdocSnap = await getDoc(IDtoUUIDdocRef);
      let UUIDs: string[] = [];
      if (IDtoUUIDdocSnap.exists()) {
        UUIDs = Object.values(IDtoUUIDdocSnap.data());
      } else {
        console.log("No such document!");
      }
    
      for (const stampID of UUIDs) {
        if (code.data === stampID) {
          await updateDoc(objectsRef, { [stampID]: true });

          const UUIDtoNameDocRef = doc(db, "QRcode", "UUID-Name");
          const UUIDtoNameDocSnap = await getDoc(UUIDtoNameDocRef);

          const QRName = UUIDtoNameDocSnap.data()?.[stampID];
          const UUIDtoVideoFileNameDocRef = doc(db, "QRcode", "UUID-video_file_name");
          const UUIDtoVideoFileNameDocSnap = await getDoc(UUIDtoVideoFileNameDocRef);
          const videoFileName = UUIDtoVideoFileNameDocSnap.data()?.[stampID];

          onDetected(QRName, videoFileName);
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
