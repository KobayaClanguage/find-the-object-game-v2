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

    <div className="mx-auto justify-center pb-24 pt-28">
        <div className="mx-auto mb-5 flex w-[90%] items-center">
            <Image
                src={"/images/diamond.png"}
                alt="ダイヤモンド"
                width={50}
                height={50}
                className="mr-5"
            />
            <span className="text-3xl">ユーザー設定</span>
        </div>

        <div className="mx-auto w-3/4">
            <div className="mb-5 flex items-center">
                <Image
                    src={"/images/mail.png"}
                    alt="メール"
                    width={30}
                    height={30}
                    className="mr-5"
                />

                <Link href={`/game/settings/account/change/email`}>
                    <span className="text-2xl">メールアドレス変更</span>
                </Link>

                <Image
                    src={"/images/right.png"}
                    alt="右"
                    width={30}
                    height={30}
                    className="ml-auto"
                />
            </div>

            <div className="mb-5 flex items-center">
                <Image
                    src={"/images/key.png"}
                    alt="かぎ"
                    width={30}
                    height={30}
                    className="mr-5"
                />
                <Link href={`/game/settings/account/change/password`}>
                    <span className="text-2xl">パスワード変更</span>
                </Link>

                <Image
                    src={"/images/right.png"}
                    alt="右"
                    width={30}
                    height={30}
                    className="ml-auto"
                />
            </div>

            <div className="mb-5 flex items-center">
                <Image
                    src={"/images/logout.png"}
                    alt="ログアウト"
                    width={30}
                    height={30}
                    className="mr-5"
                />
                <Link href={`/game/settings/account/logout`}>
                    <span className="text-2xl">ログアウト</span>
                </Link>

                <Image
                    src={"/images/right.png"}
                    alt="右"
                    width={30}
                    height={30}
                    className="ml-auto"

                />
            </div>

            <div className="mb-5 flex items-center">
                <Image
                    src={"/images/delete.png"}
                    alt="削除"
                    width={30}
                    height={30}
                    className="mr-5"
                />
                <Link href={`/game/settings/account/delete`}>
                    <span className="text-2xl">アカウント削除</span>
                </Link>

                <Image
                    src={"/images/right.png"}
                    alt="右"
                    width={30}
                    height={30}
                    className="ml-auto"
                />
            </div>

        </div>


        <div className="mx-auto mb-5 flex w-[90%] items-center">
            <Image
                src={"/images/diamond.png"}
                alt="ダイヤモンド"
                width={50}
                height={50}
                className="mr-5"
            />
            <span className="text-3xl">サイト情報</span>
        </div>

        <div className="mx-auto w-3/4">
            <div className="mb-5 flex items-center">
                <Image
                    src={"/images/game.png"}
                    alt="ゲーム"
                    width={30}
                    height={30}
                    className="mr-5"
                />
                <Link href={`/game/settings/info/howToPlay`}>
                    <span className="text-2xl">遊び方</span>
                </Link>

                <Image
                    src={"/images/right.png"}
                    alt="右"
                    width={30}
                    height={30}
                    className="ml-auto"
                />
            </div>

            <div className="mb-5 flex items-center">
                <Image
                    src={"/images/info.png"}
                    alt="インフォメーション"
                    width={30}
                    height={30}
                    className="mr-5"
                />
                <Link href={`/game/settings/info/aboutUs`}>
                    <span className="text-2xl">本webサイトについて</span>
                </Link>

                <Image
                    src={"/images/right.png"}
                    alt="右"
                    width={30}
                    height={30}
                    className="ml-auto"
                />
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
                    <span className="text-2xl">利用規約</span>
                </Link>

                <Image
                    src={"/images/right.png"}
                    alt="右"
                    width={30}
                    height={30}
                    className="ml-auto"
                />
            </div>
        </div>
    </div>

      <div className="fixed inset-x-0 bottom-0 flex items-center justify-around border bg-white p-4 shadow-md">
        <NavigationFooter />
      </div>
    </div>
  );
}
