"use client";
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase/config";

export type StampInfo = {
  ID: string;
  Name: string;
  IconFileName: string;
  OrderNo: number;
  isCollected: boolean;
};

export async function fetchStamps(uid: string) {
  const objectInfoCollectionRef = collection(db, "ObjectInfo");
  const objectInfoQuery = query(objectInfoCollectionRef, orderBy("OrderNo", "asc"));
  const objectInfoQuerySnap = await getDocs(objectInfoQuery);

  const gameProgressDocRef = doc(db, "game_progress", uid);
  const gameProgressDocSnap = await getDoc(gameProgressDocRef);

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
