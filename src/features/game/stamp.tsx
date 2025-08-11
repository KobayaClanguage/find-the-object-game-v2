"use client";
import { stampIDs, stampName } from "@/features/game/stampData";
import { db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";

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

  for (let i = 0; i < stampIDs.length; i++) {
    stamps.push({
      id: i,
      name: stampName[i],
      isCollected: docSnap.data()?.[stampIDs[i]] ?? false,
      mapUrl: "/images/game/stamp-map-sample.png",
    });
  }
  if (stamps.every((stamp) => stamp.isCollected === true)) {
    isClear = true;
  }
  return { stamps, isClear };
}
