'use client';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/config";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/config";

export default function Stamp() {
  const [object_1, setObject_1] = useState("False");
  const [object_2, setObject_2] = useState("False");
  const [object_3, setObject_3] = useState("False");
  const [object_4, setObject_4] = useState("False");
  const [object_5, setObject_5] = useState("False");
  const [object_6, setObject_6] = useState("False");
  const router = useRouter();
  
  useEffect(() => {
    (() => {
      onAuthStateChanged(auth, async(user) => {
        if (user) {
          const docRef = doc(db, "game_progress", user.uid);
          const docSnap = await getDoc(docRef);
          if(docSnap.exists()){
            if (docSnap.data().object_1) {
              setObject_1("True");
            }
            if (docSnap.data().object_2) {
              setObject_2("True");
            }
            if (docSnap.data().object_3) {
              setObject_3("True");
            }
            if (docSnap.data().object_4) {
              setObject_4("True");
            }
            if (docSnap.data().object_5) {
              setObject_5("True");
            }
            if (docSnap.data().object_6) {
              setObject_6("True");
            }
          }
    
        } else {
          router.push("/auth/login");
        }
      })
    })();
  }, [router])
  

  return (
    <div>
      <h1>Find-the-object-game</h1>
      <table>
        <thead>
          <tr>
            <th>オブジェ名</th>
            <th>発見状況</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th>object_1</th>
            <th>{object_1}</th>
          </tr>

          <tr>
            <th>object_2</th>
            <th>{object_2}</th>
          </tr>

          <tr>
            <th>object_3</th>
            <th>{object_3}</th>
          </tr>

          <tr>
            <th>object_4</th>
            <th>{object_4}</th>
          </tr>

          <tr>
            <th>object_5</th>
            <th>{object_5}</th>
          </tr>

          <tr>
            <th>object_6</th>
            <th>{object_6}</th>
          </tr>

        </tbody>
      </table>
    </div>
  );
}
