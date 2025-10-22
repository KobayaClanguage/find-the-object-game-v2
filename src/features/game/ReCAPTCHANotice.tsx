export default function ReCAPTCHANotice() {
  return (
    <div
      className="border-t bg-white/90 text-center text-xs text-gray-600 backdrop-blur-sm"
      id="recaptcha-notice"
      style={{
        position: 'fixed',
        bottom: '0',
        left: 0,
        right: 0,
        padding: '5px 0',
      }}
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
  )
}