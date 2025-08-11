import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
export async function createDocument(uid: string) {
  try {
    const docRef = doc(db, "game_progress", uid);
    const data = {
      object_1: false,
      object_2: false,
      object_3: false,
      object_4: false,
      object_5: false,
      object_6: false,
      object_7: false,
      object_8: false,
      object_9: false,
      object_10: false,
    };

    await setDoc(docRef, data);
    return true;
  } catch {
    return false;
  }
}

export async function deleteDocument(uid: string) {
  try {
    const docRef = doc(db, "game_progress", uid);
    await deleteDoc(docRef);
    return true;
  } catch {
    return false;
  }
}
