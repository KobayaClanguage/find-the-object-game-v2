import { ChevronLeft, Diamond, MapPin, ScanQrCode, Trophy } from 'lucide-react';
import Link from 'next/link';
import { AuthGuard } from '@/features/auth/authGuard';
import NavigationFooter from '@/features/game/NavigationFooter';

export default function GameSettingsInfoHowToPlay() {
  const pageTitle = '設定';
  const pageSubTitle = '遊び方';

  return (
    <AuthGuard>
      <div className="relative h-full">
        <h1 className="fixed inset-x-0 top-0 bg-[#0094f4] p-4 pt-7 text-center text-3xl text-white">
          {pageTitle}
        </h1>
        <div className="pt-20 pb-16">
          <div className="relative mx-6 flex h-[80px] items-center justify-around">
            <div className="absolute left-0">
              <Link href="/game/settings" className="p-0">
                <ChevronLeft color="#000000" size={50} />
              </Link>
            </div>
            <h2 className="text-2xl">{pageSubTitle}</h2>
          </div>
          <div className="px-5">
            <div className="w-full space-x-6 space-y-2 text-left">
              <h1 className="font-bold text-2xl">ゲームの概要</h1>
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
              <h1 className="mb-4 font-bold text-2xl">ゲームの進め方</h1>
              <ul className="space-y-6">
                <li className="flex items-center space-x-4">
                  <div className="inline-flex size-16 shrink-0 items-center justify-center rounded-lg bg-gray-200 p-3">
                    <MapPin />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">オブジェを探す</h2>
                    <p className="text-base">
                      ホーム画面のオブジェアイコンをタップしてマップを確認します.
                      マップをもとに額地区をめぐって,オブジェを探しましょう
                      &#33;
                    </p>
                  </div>
                </li>
                <li className="flex items-center space-x-4">
                  <div className="inline-flex size-16 shrink-0 items-center justify-center rounded-lg bg-gray-200 p-3">
                    <ScanQrCode />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">QRコードを読み取る</h2>
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
                    <h2 className="font-bold text-lg">ゲームクリア</h2>
                    <p className="text-base">
                      オブジェをすべて見つけるとゲームクリアです.
                      コンプリートを目指して頑張ってください &#33;
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="fixed inset-x-0 bottom-0 flex items-center justify-around border bg-white p-4 shadow-md">
          <NavigationFooter />
        </div>
      </div>
    </AuthGuard>
  );
}
