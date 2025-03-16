import Link from "next/link";
import Image from "next/image";

export default function NavigationFooter() {
  const buttonSize = { x: 40, y: 40 };
  return (
    <>
      <Link href="/game/scan">
        <Image
          src={"/game/navigationBarIcons/scan.png"}
          alt="home"
          width={buttonSize.x}
          height={buttonSize.y}
        />
      </Link>
      <Link href="/game/stamp">
        <Image
          src={"/game/navigationBarIcons/home.png"}
          alt="home"
          width={buttonSize.x}
          height={buttonSize.y}
        />
      </Link>
      <Link href="/game/settings">
        <Image
          src={"/game/navigationBarIcons/settings.png"}
          alt="home"
          width={buttonSize.x}
          height={buttonSize.y}
        />
      </Link>
    </>
  );
}
