import admin from "firebase-admin";

export async function deleteAccountAndGameProgressData(uid: string) {
    try {
        const db = admin.firestore();
        const docRef = db.collection('game_progress').doc(uid);
        await docRef.delete();
        await admin.auth().deleteUser(uid);
        return { success: true };
        
    } catch (error) {
        return { success: false, error };
    }

}