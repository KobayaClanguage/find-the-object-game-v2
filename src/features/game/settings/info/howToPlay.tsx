import { Diamond, MapPin, ScanQrCode, Trophy } from "lucide-react";

export default function HowToPlay() {
  return (
    <div className="px-5">
      <div className="w-full space-x-6 space-y-2 text-left">
        <h1 className="text-2xl font-bold">ゲームの概要</h1>
        <ul className="space-y-6">
          <li className="flex items-center space-x-2">
            <Diamond size={20} />
            <p className="text-lg">額地区に隠されたオブジェを見つける</p>
          </li>
          <li className="flex items-center space-x-2">
            <Diamond size={20} />
            <p className="text-lg">オブジェのQRコードを読み取る</p>
          </li>
          <li className="flex items-center space-x-2">
            <Diamond size={20} />
            <p className="text-lg">すべて見つけたらゲームクリア &#33;</p>
          </li>
        </ul>
      </div>
      <div className="mt-5">
        <h1 className="mb-4 text-2xl font-bold">ゲームの進め方</h1>
        <ul className="space-y-6">
          <li className="flex items-center space-x-4">
            <div className="inline-flex size-16 shrink-0 items-center justify-center rounded-lg bg-gray-200 p-3">
              <MapPin />
            </div>
            <div>
              <h2 className="text-lg font-bold">オブジェを探す</h2>
              <p className="text-base">
                ホーム画面のオブジェアイコンをタップしてマップを確認します.
                マップをもとに額地区をめぐって,オブジェを探しましょう &#33;
              </p>
            </div>
          </li>
          <li className="flex items-center space-x-4">
            <div className="inline-flex size-16 shrink-0 items-center justify-center rounded-lg bg-gray-200 p-3">
              <ScanQrCode />
            </div>
            <div>
              <h2 className="text-lg font-bold">QRコードを読み取る</h2>
              <p className="text-base">
                オブジェを発見したら,画面下のナビゲーションバーのQRコードアイコンをタップしてカメラを起動します.
                オブジェに取り付けられたQRコードを読み取りましょう &#33;
              </p>
            </div>
          </li>
          <li className="flex items-center space-x-4">
            <div className="inline-flex size-16 shrink-0 items-center justify-center rounded-lg bg-gray-200 p-3">
              <Trophy />
            </div>
            <div>
              <h2 className="text-lg font-bold">ゲームクリア</h2>
              <p className="text-base">
                オブジェをすべて見つけるとゲームクリアです.
                コンプリートを目指して頑張ってください &#33;
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div>
        <p>QRコードは(株)デンソーウェーブの登録商標です。</p>
      </div>
    </div>
  );
}
