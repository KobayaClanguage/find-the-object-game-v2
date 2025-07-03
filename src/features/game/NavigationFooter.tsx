import Link from "next/link";
import { ScanQrCode, House, Settings } from "lucide-react";

export default function NavigationFooter() {
  const buttonSize = { x: 40, y: 40 };
  return (
    <>
      <Link href="/game/scan">
        <ScanQrCode width={buttonSize.x} height={buttonSize.y} />
      </Link>
      <Link href="/game/stamp">
        <House width={buttonSize.x} height={buttonSize.y} />
      </Link>
      <Link href="/game/settings">
        <Settings width={buttonSize.x} height={buttonSize.y} />
      </Link>
    </>
  );
}
