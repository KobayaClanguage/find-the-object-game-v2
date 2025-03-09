'use client'
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/app/config";
import { useEffect, useState } from 'react'

export default function stamp() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    if(user === null) {
      console.log("ログインしていません");
    }

    auth.currentUser?.getIdToken(/* forceRefresh */ true).then(async function(idToken) {
      // Send token to your backend via HTTPS
      const response = await fetch("/api/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idToken }),
      });
      let Userdata = await response.json();
      console.log("Validation idToken is success", Userdata.uid, Userdata.email);
      }).catch(function(error) {
          // Handle error
          console.log("Validation of idToken is failed", error);
  });

  });



  return (
    <div>
      <h1>Find-the-object-game</h1>
    </div>
  );
}
