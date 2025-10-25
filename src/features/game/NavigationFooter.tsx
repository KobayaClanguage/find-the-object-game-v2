'use client';
import { House, ScanQrCode, Settings } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function NavigationFooter() {
  const buttonSize = { x: 40, y: 40 };
  const NAVIGATION_FOOTER_HEIGHT_PX = 80;

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const bodyElement = document.body;
    bodyElement.style.setProperty('--navigation-footer-height', `${NAVIGATION_FOOTER_HEIGHT_PX}px`);

    return () => {
      bodyElement.style.removeProperty('--navigation-footer-height');
    };
  }, [])

  return (
    <>
      <div
        className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border bg-white p-4 shadow-md"
        style={{
          bottom: `var(--recaptcha-notice-height, 16px)`,
          height: `${NAVIGATION_FOOTER_HEIGHT_PX}px`
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