import { AuthGuard } from "@/features/auth/authGuard";
import TermsOfUse from "@/features/game/settings/info/TermsOfUse";

export default function GameSettingsInfoTermsOfUse() {
  return (
    <AuthGuard>
      <TermsOfUse />
    </AuthGuard>
  );
}
