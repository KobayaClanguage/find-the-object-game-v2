import Image from "next/image";

export default function PreparationPage() {
  return (
    <div className="flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-white px-4 md:max-w-full md:px-8">
      <div className="mb-8 flex flex-col items-center space-y-4 text-center">
        <Image
          src="/images/commentLogo.png"
          alt="角ロゴの吹き出し"
          width={120}
          height={49}
        />
        <Image
          src="/images/nukaLogo.png"
          alt="角のロゴ"
          width={198}
          height={64}
        />
        <Image src="/images/cross.png" alt="Xアイコン" width={29} height={29} />
        <Image
          src="/images/KITimage.png"
          alt="KITロゴ"
          width={150}
          height={75}
        />
      </div>
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          オブジェを探せゲーム
        </h1>
      </div>
      <div className="text-center text-3xl text-red-500">
        <strong>
          準備中です
          <br />
          来春リリース予定
        </strong>
      </div>
    </div>
  );
}
