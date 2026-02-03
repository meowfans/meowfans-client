'use client';

import { Button } from '@workspace/ui/components/button';
import { Lock, ShieldAlert, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

export const AgeConfirmation = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const isVerified = localStorage.getItem('ageVerified');
    if (!isVerified) setShowConfirmation(true);
  }, []);

  const handleConfirm = () => {
    localStorage.setItem('ageVerified', 'true');
    setShowConfirmation(false);
  };

  const handleExit = () => {
    window.location.href = 'https://www.google.com';
  };

  if (!showConfirmation) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/90 backdrop-blur-sm text-white p-4">
      <div className="bg-neutral-900 border border-neutral-700 p-8 rounded-2xl max-w-2xl w-full text-center shadow-2xl space-y-6 animate-in fade-in duration-300">
        <div className="flex flex-col items-center gap-3">
          <ShieldAlert className="w-12 h-12 text-red-500" />
          <h2 className="text-3xl font-extrabold tracking-tight">Are you 18 or older?</h2>
          <p className="text-gray-300 text-sm max-w-md">This website contains adult content intended for mature audiences only.</p>
        </div>

        <div className="bg-neutral-800/70 border border-neutral-700 rounded-xl p-4 text-gray-300 text-sm text-left max-h-[40vh] overflow-y-auto">
          <p className="mb-3">
            <strong>MeowFans</strong> is an adults-only website. The content available on MeowFans may contain explicit or pornographic
            materials. MeowFans is strictly limited to individuals aged 18 years or older, or of legal age in your jurisdiction, whichever
            is greater.
          </p>
          <p className="mb-3">
            Our core mission includes helping parents restrict access to adult content for minors. MeowFans complies with the
            <strong> RTA (Restricted to Adults) </strong> code, which means access to this site can be blocked easily using standard
            parental control tools or software.
          </p>
          <p>
            If you are a parent or guardian, please take responsibility for ensuring minors in your household cannot access inappropriate
            materials. Use device settings, ISP filters, or parental control software to block access to age-restricted websites.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
          <Button
            onClick={handleExit}
            className="w-full sm:w-auto bg-linear-to-r from-red-600 to-rose-500 hover:from-red-700 hover:to-rose-600 px-6 py-3 rounded-md font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2"
          >
            <XCircle className="w-5 h-5" />
            No, Exit
          </Button>
          <Button
            onClick={handleConfirm}
            className="w-full sm:w-auto bg-linear-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 px-6 py-3 rounded-md font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Lock className="w-5 h-5" />
            I&apos;m 18 or older – Enter MeowFans
          </Button>
        </div>

        <p className="text-xs text-gray-500 mt-3">Your choice will be saved locally for future visits.</p>
      </div>
    </div>
  );
};
