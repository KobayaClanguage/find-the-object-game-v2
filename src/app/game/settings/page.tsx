"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/config";

export default function GameSettings() {
  const router = useRouter();

  useEffect(() => {
    if (auth.currentUser) {
      if (auth.currentUser.isAnonymous) {
        router.replace("/game/settings/anonymous");
      } else {
        router.replace("/game/settings/email");
      }
    } else {
      router.replace("/auth/login");
    }
  }, []);

  return <p>読み込み中...</p>;
}
