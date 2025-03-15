import { NextResponse } from "next/server";
import { adminAuth } from "@/app/api/config";

export async function POST(req: Request) {
  try {
    const { idToken } = await req.json(); 

    if (!idToken) {
      return NextResponse.json({ message: "No token provided" }, { status: 400 });
    }

    // FirebaseのIDトークンを検証
    const decodedToken = await adminAuth.verifyIdToken(idToken);

    return NextResponse.json({ uid: decodedToken.uid, email: decodedToken.email });
  } catch {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
