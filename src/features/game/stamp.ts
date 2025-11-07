"use client";
import { getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { collections, docRefs } from "@/features/game/firestore";

export type StampInfo = {
  ID: string;
  Name: string;
  IconFileName: string;
  OrderNo: number;
  isCollected: boolean;
};

export async function fetchStamps(uid: string) {
  const objectInfoQuery = query(collections.objectInfo, orderBy("OrderNo", "asc"));
  const objectInfoQuerySnap = await getDocs(objectInfoQuery);

  const gameProgressDocSnap = await getDoc(docRefs.GameProgress(uid));

  let stamps: StampInfo[] = [];
  let isClear = false;

  if (gameProgressDocSnap.exists() && !objectInfoQuerySnap.empty) {
    stamps = objectInfoQuerySnap.docs.map(objectInfo => {
      return {
        ID: objectInfo.id,
        Name: objectInfo.data().Name || "No Name",
        IconFileName: gameProgressDocSnap.data()[objectInfo.id] ? objectInfo.data().CollectedIconFileName : objectInfo.data().UnCollectedIconFileName || "default.png",
        OrderNo: objectInfo.data().OrderNo  || 0,
        isCollected: gameProgressDocSnap.data()[objectInfo.id] || false,
      } as StampInfo;
    });
  }
  if (gameProgressDocSnap.exists()) {
    if (Object.values(gameProgressDocSnap.data()).every((stamp: boolean) => stamp === true)) {
      isClear = true;
    }
  }
  return { stamps, isClear };
}
