"use client";

import { Anonymously } from "@/features/auth/auth";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  async function anonymously() {
    await Anonymously();
    router.push("/game/stamp");
  }

  return (
    <div>
      {/* ランディングページ */}
      <h1>オブジェを探せゲーム</h1>
      <div>
        <h2>遊び方</h2>
        <p>額地区に隠されたオブジェを見つける</p>
        <p>オブジェのQRコードを読み取る</p>
        <p>すべて見つけたらゲームクリア</p>
        <button onClick={anonymously}>匿名アカウント作成</button>
      </div>
    </div>
  );
}
