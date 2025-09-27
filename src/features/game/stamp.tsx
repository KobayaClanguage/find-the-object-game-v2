"use client";
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { stampName } from "@/features/game/stampData";
import { db } from "@/firebase/config";

export type StampInfo = {
  id: string;
  name: string;
  iconFileName: string
  mapUrl: string;
};

export async function fetchStamps(uid: string) {
  const GameProgressDocRef = doc(db, "game_progress", uid);
  const GameProgressDocSnap = await getDoc(GameProgressDocRef);
  const GameProgress = GameProgressDocSnap.data() as { [key: string]: boolean };

  const OrderNoQuery = query(collection(db, "OrderNoMap"), orderBy("OrderNo", "asc"));
  const OrderNoQuerySnap = await getDocs(OrderNoQuery);
  const IDs: string[] = [];
  OrderNoQuerySnap.forEach(OrderNoDocSnap => {
    IDs.push(OrderNoDocSnap.id);
  });

  const ObjectIconFileNameQuery = query(collection(db, "ObjectIconFileNameMap"), orderBy("OrderNo", "asc"));
  const ObjectIconFileNameQuerySnap = await getDocs(ObjectIconFileNameQuery);
  const ObjectIconFileNames: string[] = [];
  ObjectIconFileNameQuerySnap.forEach(ObjectIconFileNameDocSnap => {
    if(GameProgressDocSnap.data()?.[ObjectIconFileNameDocSnap.id]) {
      ObjectIconFileNames.push(ObjectIconFileNameDocSnap.data()["Collected"]);
    } else {
      ObjectIconFileNames.push(ObjectIconFileNameDocSnap.data()["UnCollected"]);
    }
  });

  const stamps: StampInfo[] = [];
  let isClear = false;

  for (let i = 0; i < IDs.length; i++) {
    stamps.push({
      id: IDs[i],
      name: stampName[i],
      iconFileName: ObjectIconFileNames[i],
      mapUrl: "/images/game/stamp-map-sample.png",
    });
  }
  if (Object.values(GameProgress).every((progress: boolean) => progress === true)) {
    isClear = true;
  }
  return { stamps, isClear };
}
