import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

export async function createGameProgressDocument(uid: string) {
  try {
    const objectInfoCollectionRef = collection(db, "ObjectInfo");
    const objectInfoQuerySnap = await getDocs(objectInfoCollectionRef);
    if(objectInfoQuerySnap.empty) {
      return false;
    }
    const gameProgressDataInit: {[key: string]: boolean} = {};
    objectInfoQuerySnap.forEach((doc) => {
      gameProgressDataInit[doc.id] = false;
    });

    const GameProgressDocRef = doc(db, "game_progress", uid);
    await setDoc(GameProgressDocRef, gameProgressDataInit);
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
