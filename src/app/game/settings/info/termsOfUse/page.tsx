import { AuthGuard } from "@/features/auth/authGuard";

export default function GameSettingsInfoTermsOfUse() {
  // TODO: フロントエンド実装
  return (
    <AuthGuard>
      <h1>TermsOfUseページ</h1>
    </AuthGuard>
  );
}
