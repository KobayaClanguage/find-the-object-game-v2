import { getDocs, setDoc } from "firebase/firestore";
import { collections, docRefs } from "@/features/game/firestore";

export async function createGameProgressDocument(uid: string) {
  try {
    const objectInfoQuerySnap = await getDocs(collections.objectInfo);
    if(objectInfoQuerySnap.empty) {
      return false;
    }
    const gameProgressDataInit: {[key: string]: boolean} = {};
    objectInfoQuerySnap.forEach((doc) => {
      gameProgressDataInit[doc.id] = false;
    });

    const GameProgressDocRef = docRefs.GameProgress(uid);
    await setDoc(GameProgressDocRef, gameProgressDataInit);
    return true;
  } catch {
    return false;
  }
}
