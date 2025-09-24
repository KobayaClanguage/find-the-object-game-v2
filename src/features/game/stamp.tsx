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
  // FirebaseのGameProgressからIDごとにTrue/Falseを取得
  const GameProgressDocRef = doc(db, "game_progress", uid);
  const GameProgressDocSnap = await getDoc(GameProgressDocRef);
  const GameProgress = GameProgressDocSnap.data() as { [key: string]: boolean };
  console.log("GameProgress:", GameProgress); // IDごとのTrue/Falseを取得

  const NameMasterDocRef = doc(db, "ObjectInfo", "NameMaster");
  const NamaMasterDocSnap = await getDoc(NameMasterDocRef);
  const ObjectName = NamaMasterDocSnap.data() as { [key: string]: string };
  console.log("ObjectName:", ObjectName); // IDごとのオブジェ名を取得

  const MapMasterDocRef = doc(db, "ObjectInfo", "MapMaster");
  const MapMasterDocSnap = await getDoc(MapMasterDocRef);
  const ObjectMap = MapMasterDocSnap.data() as { [key: string]: string };
  console.log("ObjectMap:", ObjectMap); // IDごとのMapURLを取得

  const UUIDMasterDocRef = doc(db, "ObjectInfo", "UUIDMaster");
  const UUIDMasterDocSnap = await getDoc(UUIDMasterDocRef);
  const ObjectUUID = UUIDMasterDocSnap.data() as { [key: string]: string };
  console.log("ObjectUUID:", ObjectUUID); // IDごとのUUIDを取得

  const stamps: StampInfo[] = [];
  let isClear = false;
  console.log("Object keys length:", Object.keys(GameProgress).length);
  for (let i = 0; i < Object.keys(GameProgress).length; i++) {
    console.log(ObjectName[Object.values(ObjectUUID)[i]]);
    console.log(Object.values(GameProgress)[i]);
    console.log(ObjectMap[Object.values(ObjectUUID)[i]]);

    stamps.push({
      id: i,
      name: ObjectName[Object.values(ObjectUUID)[i]],
      isCollected: GameProgress[Object.values(ObjectUUID)[i]],
      mapUrl: ObjectMap[Object.values(ObjectUUID)[i]]
    });

  }
  if (stamps.every((stamp) => stamp.isCollected === true)) {
    isClear = true;
  }
  return { stamps, isClear };
}
