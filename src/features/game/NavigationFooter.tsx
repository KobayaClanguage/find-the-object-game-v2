import { House, ScanQrCode, Settings } from 'lucide-react';
import Link from 'next/link';

export default function NavigationFooter() {
  const buttonSize = { x: 40, y: 40 };
  return (
    <>
      <Link href="/game/scan" aria-label="Scan QR Code">
        <ScanQrCode width={buttonSize.x} height={buttonSize.y} />
      </Link>
      <Link href="/game/stamp" aria-label="Home">
        <House width={buttonSize.x} height={buttonSize.y} />
      </Link>
      <Link href="/game/settings" aria-label="Settings">
        <Settings width={buttonSize.x} height={buttonSize.y} />
      </Link>
    </>
  );
}
