import { deleteDocument } from "../game/firestore";
import * as admin from 'firebase-admin';

export async function deleteAccountAndGameProgressData(uid: string) {
    try {
        // ユーザーのゲーム進行データを削除する
        await deleteDocument(uid);
        // Firebase Authenticationからユーザーを削除する
        await admin.auth().deleteUser(uid);
        return { success: true };
        
    } catch (error) {
        return { success: false, error };
    }

}