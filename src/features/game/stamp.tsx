"use client";
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { stampIDs, stampName } from "@/features/game/stampData";
import { db } from "@/firebase/config";

export type StampInfo = {
  id: string;
  name: string;
  isCollected: boolean;
};

export async function fetchStamps(uid: string) {
  const docRef = doc(db, "game_progress", uid);
  const docSnap = await getDoc(docRef);

  const OrderNoQuery = query(collection(db, "OrderNoMap"), orderBy("OrderNo", "asc"));
  const OrderNoQuerySnap = await getDocs(OrderNoQuery);
  const IDs: string[] = [];
  OrderNoQuerySnap.forEach(OrderNoDocSnap => {
    IDs.push(OrderNoDocSnap.id);
  });
  console.log(IDs);

  const stamps: StampInfo[] = [];
  let isClear = false;

  for (let i = 0; i < 3; i++) {
    stamps.push({
      id: IDs[i],
      name: stampName[i],
      isCollected: docSnap.data()?.[stampIDs[i]] ?? false,
    });
  }
  if (stamps.every((stamp) => stamp.isCollected === true)) {
    isClear = true;
  }
  return { stamps, isClear };
}
