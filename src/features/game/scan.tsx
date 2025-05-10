"use client";
import jsQR from "jsqr";
import { auth } from "@/firebase/config";
import { db } from "@/firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function Scan(
  video: HTMLVideoElement,
  canvasRef: HTMLCanvasElement | null,
  router: AppRouterInstance,
) {
  let contentWidth = 500;
  let contentHeight = 500;

  navigator.mediaDevices
    .getUserMedia({ audio: false, video: { width: 640, height: 480 } })
    .then((stream) => {
      video.srcObject = stream;
      video.onloadeddata = () => {
        video.play();
        contentWidth = video.clientWidth;
        contentHeight = video.clientHeight;
        canvasUpdate();
        checkImage();
      };
    })
    .catch((error) => {
      console.log(error);
    });

  if (canvasRef === null) return;
  const cvs = canvasRef;
  if (cvs === null) return;
  const ctx = cvs.getContext("2d", { willReadFrequently: true });
  if (ctx === null) return;

  const canvasUpdate = () => {
    cvs.width = contentWidth;
    cvs.height = contentHeight;
    ctx.drawImage(video, 0, 0, contentWidth, contentHeight);
    requestAnimationFrame(canvasUpdate);
  };

  const checkImage = async () => {
    const imageData = ctx.getImageData(0, 0, contentWidth, contentHeight);
    const code = jsQR(imageData.data, contentWidth, contentHeight);

    if (code) {
      console.log(code.data);
      const saveData = async () => {
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
        ];
        for (const objectName of objectsName) {
          if (code.data === objectName) {
            await updateDoc(objectsRef, {
              [objectName]: true,
            });
            router.push("/game/stamp");
          }
        }
      };
      saveData();
    }
  };
  setInterval(checkImage, 300);
}
