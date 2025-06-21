import { AuthGuard } from "@/features/auth/authGuard";

export default function GameSettingsInfoHowToPlay() {
  // TODO: フロントエンド実装
  return (
    <AuthGuard>
      <h1>HowToPlayページ</h1>
    </AuthGuard>
  );
}
