'use client';
import { House, ScanQrCode, Settings } from "lucide-react";
import Link from "next/link";

export default function NavigationFooter() {
  const buttonSize = { x: 40, y: 40 };
  const footerHeight = '5rem';
  return (
    <>
      <style jsx global>{`
        #recaptcha-notice {
          bottom: ${footerHeight} !important;
        }
      `}</style>

      <div 
        className="fixed inset-x-0 bottom-0 flex items-center justify-around border bg-white p-4 shadow-md"
        style={{
          height: footerHeight,
        }}
      >
        <Link href="/game/scan" aria-label="Scan QR Code">
          <ScanQrCode width={buttonSize.x} height={buttonSize.y} />
        </Link>
        <Link href="/game/stamp" aria-label="Home">
          <House width={buttonSize.x} height={buttonSize.y} />
        </Link>
        <Link href="/game/settings" aria-label="Settings">
          <Settings width={buttonSize.x} height={buttonSize.y} />
        </Link>
      </div>
    </>
  );
}