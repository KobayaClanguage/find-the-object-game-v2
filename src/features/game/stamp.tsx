"use client";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { fieldName, stampName } from "@/features/game/stampData";

export type StampInfo = {
  id: number;
  name: string;
  isCollected: boolean;
  mapUrl: string;
};

export async function fetchStamps(uid: string) {
  const docRef = doc(db, "game_progress", uid);
  const docSnap = await getDoc(docRef);

  const stamps: StampInfo[] = [];
  let isClear = false;

  for (let i = 0; i < fieldName.length; i++) {
    stamps.push({
      id: i,
      name: stampName[i],
      isCollected: docSnap.data()?.[fieldName[i]] ?? false,
      mapUrl: "/images/game/stamp-map-sample.png",
    });
  }
  if (stamps.every((stamp) => stamp.isCollected === true)) {
    isClear = true;
  }
  return { stamps, isClear };
}
