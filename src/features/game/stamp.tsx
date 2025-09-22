"use client";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

export type StampInfo = {
  id: number;
  name: string;
  isCollected: boolean;
  mapUrl: string;
};

export async function fetchStamps(uid: string) {
  const docRef = doc(db, "game_progress", uid);
  const docSnap = await getDoc(docRef);

  const QRNameDocRef = doc(db, "QRcode", "UUID-Name");
  const QRNameDocSnap = await getDoc(QRNameDocRef);
  const QRName = Object.values(QRNameDocSnap.data() ?? {});

  const stamps: StampInfo[] = [];
  let isClear = false;

  for (let i = 0; i < QRName.length; i++) {
    stamps.push({
      id: i,
      name: QRName[i],
      isCollected: docSnap.data()?.[QRName[i]] ?? false,
      mapUrl: "/images/game/stamp-map-sample.png",
    });
  }
  if (stamps.every((stamp) => stamp.isCollected === true)) {
    isClear = true;
  }
  return { stamps, isClear };
}
