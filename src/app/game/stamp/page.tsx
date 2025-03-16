import NavigationFooter from "@/features/game/NavigationFooter";
import Image from "next/image";
import Link from "next/link";

type Stamp = {
  id: number;
  name: string;
  iconUrl: string;
  isCollected: boolean;
  mapUrl: string;
};

// ダミーデータ
const stamps: Stamp[] = [];
for (let i = 0; i < 30; i++) {
  stamps.push({
    id: i,
    // TODO: スタンプ名を実際のスタンプ名に変更
    name: "駐車場",
    // TODO: 画像URLを実際の画像に変更
    iconUrl: "/images/stampIcon/stamp-icon-sample.png",
    isCollected: false,
    mapUrl: "/images/game/stamp-map-sample.png",
  });
}

export default function GamePage() {
  const pageTitle = "ホーム";

  return (
    <div className="relative h-full">
      <h1 className="fixed top-0 left-0 right-0 text-center text-white bg-[#0094f4] p-4">
        {pageTitle}
      </h1>
      <div className="pt-16 pb-16">
        <h2 className="w-full text-center font-bold text-lg">オブジェ一覧</h2>
        {/* スタンプ一覧 */}
        <div className="grid grid-cols-2 gap-2 p-4">
          {stamps.map((item) => (
            <div key={item.id} className="flex flex-col items-center">
              <Link href={`/game/stamp/${item.id}`}>
                <Image
                  src={item.iconUrl}
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
      <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center bg-white p-4 shadow-md">
        <NavigationFooter />
      </div>
    </div>
  );
}
