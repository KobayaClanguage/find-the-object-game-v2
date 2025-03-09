import { NextResponse } from "next/server";
import { adminAuth } from "../config";

export async function POST(req: Request) {
  try {
    const { idToken } = await req.json(); 

    console.log("Received ID Token:", idToken);

    if (!idToken) {
      return NextResponse.json({ message: "No token provided" }, { status: 400 });
    }

    // FirebaseのIDトークンを検証
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    console.log("Decoded Token Email:", decodedToken.email);

    return NextResponse.json({ uid: decodedToken.uid, email: decodedToken.email });
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
