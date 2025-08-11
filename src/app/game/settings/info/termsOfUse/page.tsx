import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { AuthGuard } from '@/features/auth/authGuard';
import NavigationFooter from '@/features/game/NavigationFooter';
import TermsOfUse from '@/features/game/settings/info/TermsOfUse';

export default function GameSettingsInfoTermsOfUse() {
  const pageTitle = '利用規約';
  return (
    <AuthGuard>
      <div className="relative h-full">
        <div className="fixed inset-x-0 top-0 z-10">
          <h1 className="bg-[#0094f4] p-4 pt-7 text-center text-3xl text-white">
            {pageTitle}
          </h1>
          <div className="absolute top-4 left-4">
            <Link href="/game/settings" className="p-0">
              <ChevronLeft color="#000000" size={50} />
            </Link>
          </div>
        </div>
        <div className="pt-20 pb-16">
          <TermsOfUse />
        </div>
        <div className="fixed inset-x-0 bottom-0 flex items-center justify-around border bg-white p-4 shadow-md">
          <NavigationFooter />
        </div>
      </div>
    </AuthGuard>
  );
}
