'use client'
import { useEffect, useRef } from "react";
import jsQR from 'jsqr'
import { auth } from "@/app/config";
import { db } from "@/app/config";
import { doc, updateDoc } from "firebase/firestore";

export default function Home() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const video = document.getElementById("video") as HTMLVideoElement;
        let contentWidth = 500;
        let contentHeight = 500;

        navigator.mediaDevices.getUserMedia({ audio: false, video: {width:640, height:480} })
        .then((stream) => {
            video.srcObject = stream;
            video.onloadeddata = () => {
                video.play();
                contentWidth = video.clientWidth;
                contentHeight = video.clientHeight;
                canvasUpdate();
                checkImage();
            }
        }).catch((error) => {
            console.log(error);
        });

        const cvs = canvasRef.current;
        if(cvs === null ) return;
        const ctx = cvs.getContext('2d', { willReadFrequently: true });
        if(ctx === null) return;

        const canvasUpdate = () => {
            cvs.width = contentWidth;
            cvs.height = contentHeight;
            ctx.drawImage(video, 0, 0, contentWidth, contentHeight);
            requestAnimationFrame(canvasUpdate);
        }


        const checkImage = async () => {
            const imageData = ctx.getImageData(0, 0, contentWidth, contentHeight);
            const code = jsQR(imageData.data, contentWidth, contentHeight);
            if (code) {
                const saveData = async () => {
                    if(auth.currentUser === null) return;

                    const objectsRef = doc(db, "game_progress", auth.currentUser.uid.toString());
                    if (code.data === "object_1"){
                        await updateDoc(objectsRef, {
                            object_1: true
                        });
                        clearTimeout(timerID);
                    } else if (code.data === "object_2") {
                        await updateDoc(objectsRef, {
                            object_2: true
                        });
                        clearTimeout(timerID);
                    } else if (code.data === "object_3") {
                        await updateDoc(objectsRef, {
                            object_3: true
                        });
                        clearTimeout(timerID);
                    } else if (code.data === "object_4") {
                        await updateDoc(objectsRef, {
                            object_4: true
                        });
                        clearTimeout(timerID);
                    } else if (code.data === "object_5") {
                        await updateDoc(objectsRef, {
                            object_5: true
                        });
                        clearTimeout(timerID);
                    } else if (code.data === "object_6") {
                        await updateDoc(objectsRef, {
                            object_6: true
                        });
                        clearTimeout(timerID);
                    }
                };
                saveData();

            }
        }
        const timerID = setTimeout(checkImage, 300);
    }, []);


  return (
    <div>
      <h1>Find-the-object-game</h1>
      <video id="video" autoPlay muted playsInline></video>
      <canvas id="camera-canvas" ref={ canvasRef }></canvas>
      <canvas id="react-canvas"></canvas>
    </div>
  );
}




