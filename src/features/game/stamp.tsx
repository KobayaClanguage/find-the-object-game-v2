"use client";
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
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

  const NameQuery = query(collection(db, "NameMap"), orderBy("OrderNo", "asc"));
  const NameQuerySnap = await getDocs(NameQuery);
  const Names: string[] = [];
  NameQuerySnap.forEach(NameDocSnap => {
    Names.push(NameDocSnap.data()["Name"]);
  });

  const stamps: StampInfo[] = [];
  let isClear = false;

  for (let i = 0; i < IDs.length; i++) {
    stamps.push({
      id: IDs[i],
      name: Names[i],
      isCollected: docSnap.data()?.[IDs[i]] ?? false,
    });
  }
  if (stamps.every((stamp) => stamp.isCollected === true)) {
    isClear = true;
  }
  return { stamps, isClear };
}