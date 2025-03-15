'use client'
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/app/config";
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";

export default function stamp() {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user === null) {
        router.push("/auth/login");
      }
  
    });


    auth.currentUser?.getIdToken(true).then(async function(idToken) {
      const response = await fetch("/api/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idToken }),
      });
      // 今後、userIDを使用する可能性があるためjsonで取得しておく
      let Userdata = await response.json();
      console.log("Validation idToken is success", Userdata.uid, Userdata.email);
      }).catch(function(error) {
          console.log("Validation of idToken is failed", error);
  });

  });

  return (
    <div>
      <h1>Find-the-object-game</h1>
    </div>
  );
}
