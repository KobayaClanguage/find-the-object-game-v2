import NavigationFooter from "@/features/game/NavigationFooter";
import Image from "next/image";
import Link from "next/link";

export default function GamePage() {
  const pageTitle = "設定";

  return (
    <div className="relative h-full">
      <h1 className="fixed inset-x-0 top-0 bg-[#0094f4] p-4 pt-7 text-center text-3xl text-white">
        {pageTitle}
      </h1>

    <div className="pb-24 pt-28 justify-center mx-auto">
        <div className="flex items-center mb-3 w-[70%] mx-auto">
            <Image
                src={"/images/diamond.png"}
                alt="ダイヤモンド"
                width={50}
                height={50}
                className="mr-5"
            />
            <h2>ユーザー設定</h2>
        </div>

        <div className="w-[50%] mx-auto">
            <div className="flex items-center mb-3">
                <Image
                    src={"/images/mail.png"}
                    alt="メール"
                    width={30}
                    height={30}
                    className="mr-5"
                />

                <Link href={`/game/settings/account/change/email`}>
                    <h2>メールアドレス変更</h2>
                </Link>

            </div>

            <div className="flex items-center mb-3">
                <Image
                    src={"/images/key.png"}
                    alt="かぎ"
                    width={30}
                    height={30}
                    className="mr-5"
                />
                <Link href={`/game/settings/account/change/password`}>
                    <h2>パスワード変更</h2>
                </Link>
            </div>

            <div className="flex items-center mb-3">
                <Image
                    src={"/images/logout.png"}
                    alt="ログアウト"
                    width={30}
                    height={30}
                    className="mr-5"
                />
                <Link href={`/game/settings/account/logout`}>
                    <h2>ログアウト</h2>
                </Link>
            </div>

            <div className="flex items-center mb-3">
                <Image
                    src={"/images/delete.png"}
                    alt="削除"
                    width={30}
                    height={30}
                    className="mr-5"
                />
                <Link href={`/game/settings/account/delete`}>
                    <h2>アカウント削除</h2>
                </Link>
            </div>

        </div>


        <div className="flex items-center mb-3 w-[70%] mx-auto">
            <Image
                src={"/images/diamond.png"}
                alt="ダイヤモンド"
                width={50}
                height={50}
                className="mr-5"
            />
            <h2>サイト情報</h2>
        </div>

        <div className="w-[50%] mx-auto">
            <div className="flex items-center mb-3">
                <Image
                    src={"/images/game.png"}
                    alt="ゲーム"
                    width={30}
                    height={30}
                    className="mr-5"
                />
                <Link href={`/game/settings/info/howToPlay`}>
                    <h2>遊び方</h2>
                </Link>
            </div>

            <div className="flex items-center mb-3">
                <Image
                    src={"/images/info.png"}
                    alt="インフォメーション"
                    width={30}
                    height={30}
                    className="mr-5"
                />
                <Link href={`/game/settings/info/aboutUs`}>
                    <h2>本ウェブサイトについて</h2>
                </Link>
            </div>

            <div className="flex items-center">
                <Image
                    src={"/images/description.png"}
                    alt="説明"
                    width={30}
                    height={30}
                    className="mr-5"
                />
                <Link href={`/game/settings/info/termsOfUse`}>
                    <h2>利用規約</h2>
                </Link>
            </div>
        </div>

    </div>

      <div className="fixed inset-x-0 bottom-0 flex items-center justify-around border bg-white p-4 shadow-md">
        <NavigationFooter />
      </div>
    </div>
  );
}
