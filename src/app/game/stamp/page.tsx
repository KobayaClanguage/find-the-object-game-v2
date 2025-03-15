'use client'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/config";
import { useEffect } from 'react'
import { useRouter } from "next/router";

export default function Stamp() {
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
      
      const Userdata = await response.json();
      console.log(Userdata.uid); // 今後、uidを使用する可能性があるため取得しておく

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
