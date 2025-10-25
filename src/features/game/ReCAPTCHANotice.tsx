"use client";
import { useEffect, useRef } from 'react';

export default function ReCAPTCHANotice() {
    const recaptchaNoticeRef = useRef<HTMLDivElement | null>(null);
    const PADDING_PX = 5;

    useEffect(() => {
      if (typeof document === 'undefined') return;
      const bodyElement = document.body;
      const noticeElement = recaptchaNoticeRef.current;
      if (!noticeElement) return;

      const observer = new ResizeObserver((entries) => {
          for (const entry of entries) {
              const height = entry.contentRect.height; 
              bodyElement.style.setProperty("--recaptcha-notice-height", `${height + PADDING_PX*2}px`);
          }
      });
      observer.observe(noticeElement);

      return () => {
          observer.unobserve(noticeElement);
          bodyElement.style.removeProperty("--recaptcha-notice-height");
      };
    }, []);

    return (
        <div
            ref={recaptchaNoticeRef} 
            className="fixed inset-x-0 bottom-0 border-t bg-white/90 text-center 
                       text-xs text-gray-600 backdrop-blur-sm"
            style={{
                padding: `${PADDING_PX}px 0`,
            }}
            id="recaptcha-notice"
        >
            This site is protected by reCAPTCHA and the Google
            <a
                href="https://policies.google.com/privacy"
                className="px-1 underline hover:text-blue-600"
            >
                Privacy Policy
            </a>{' '}
            and
            <a
                href="https://policies.google.com/terms"
                className="px-1 underline hover:text-blue-600"
            >
                Terms of Service
            </a>{' '}
            apply.
        </div>
    );
}