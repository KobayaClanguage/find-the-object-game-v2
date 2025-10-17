import { deleteDocument } from "../game/firestore";
import admin from "@/firebase/admin";

export async function deleteAccountAndGameProgressData(uid: string) {
    try {
        await deleteDocument(uid);
        await admin.auth().deleteUser(uid);
        return { success: true };
        
    } catch (error) {
        return { success: false, error };
    }

}