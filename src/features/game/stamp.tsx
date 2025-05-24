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
  const fieldName = [
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
  const stampName = [
    "入口",
    "階段",
    "駐車場",
    "ベンチ",
    "すべり台",
    "時計",
    "Undefined1",
    "Undefined2",
    "Undefined3",
    "Undefined4",
  ];

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
