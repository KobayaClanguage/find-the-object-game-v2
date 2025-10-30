import { collection, doc } from "firebase/firestore";
import { db } from "@/firebase/config";

export const collections = {
  objectInfo: collection(db, "ObjectInfo"),
}

export const docRefs = {
  ObjectInfo: (docID: string) => doc(db, "ObjectInfo", docID),
  UUIDMap: (docID: string) => doc(db, "UUIDMap", docID),
  GameProgress: (docID: string) => doc(db, "game_progress", docID)
}

