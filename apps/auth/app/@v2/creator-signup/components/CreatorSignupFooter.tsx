import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const CreatorSignupFooter = () => {
  return (
    <div className="mt-10 pt-6 border-t border-zinc-900 text-center space-y-4">
      <div className="flex items-center justify-center gap-2 text-zinc-500 text-xs font-bold">
        <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> INSTANT ACTIVATION
        <span className="mx-1">•</span>
        <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> SECURE BANKING
      </div>
      <p className="text-sm text-zinc-500">
        Already have a creator account?{' '}
        <Link href="/" className="text-orange-400 font-bold hover:text-orange-300 transition-colors">
          Studio Login
        </Link>
      </p>
    </div>
  );
};
