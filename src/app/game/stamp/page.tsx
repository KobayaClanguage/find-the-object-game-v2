import NavigationFooter from "@/features/game/NavigationFooter";
import Image from "next/image";
import Link from "next/link";

type Stamp = {
  id: number;
  name: string;
  isCollected: boolean;
  mapUrl: string;
};

// TODO: ダミーデータ
const stamps: Stamp[] = [];
for (let i = 0; i < 30; i++) {
  stamps.push({
    id: i,
    name: "駐車場",
    // アイコン画像(publicディレクトリからのパス)
    isCollected: i % 3 === 0,
    // マップ画像
    mapUrl: "/images/game/stamp-map-sample.png",
  });
}

export default function GamePage() {
  const pageTitle = "ホーム";
  const completeIconUrl = "/game/stamp/stamp-complete.png";
  const uncompleteIconUrl = "/game/stamp/stamp-uncomplete.png";

  return (
    <div className="relative h-full">
      <h1 className="fixed inset-x-0 top-0 bg-[#0094f4] p-4 pt-7 text-center text-3xl text-white">
        {pageTitle}
      </h1>
      <div className="pb-16 pt-24">
        <div className="flex items-center justify-around p-4">
          <Image
            src={"/images/nukaLogo.png"}
            alt="額のロゴ"
            width={158}
            height={51}
          />
          <Image
            src="/images/cross.png"
            alt="☓アイコン"
            width={30}
            height={30}
          />
          <Image
            src="/images/KITimage.png"
            alt="KITロゴ"
            width={150}
            height={75}
          />
        </div>
        <h2 className="w-full text-center text-lg font-bold">オブジェ一覧</h2>
        {/* スタンプ一覧 */}
        <div className="grid grid-cols-2 gap-2 p-4">
          {stamps.map((item) => (
            <div key={item.id} className="flex flex-col items-center">
              <Link href={`/game/stamp/${item.id}`}>
                <Image
                  src={item.isCollected ? completeIconUrl : uncompleteIconUrl}
                  alt={item.name}
                  width={120}
                  height={120}
                  className="object-contain"
                />
                <p className="text-center">{item.name}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 flex items-center justify-around border bg-white p-4 shadow-md">
        <NavigationFooter />
      </div>
    </div>
  );
}
