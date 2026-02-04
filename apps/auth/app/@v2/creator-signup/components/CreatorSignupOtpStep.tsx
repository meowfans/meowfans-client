import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2Icon, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CreatorSignupOtpStepProps {
  email: string;
  otp: string;
  setOtp: (otp: string) => void;
  handleVerify: () => void;
  loading: boolean;
  onBack: () => void;
  onResend: () => void;
}

export const CreatorSignupOtpStep = ({ email, otp, setOtp, handleVerify, loading, onBack, onResend }: CreatorSignupOtpStepProps) => {
  const [timer, setTimer] = useState<number>(30);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResendClick = () => {
    if (timer === 0) {
      onResend();
      setTimer(30);
    }
  };

  return (
    <motion.div
      key="step-otp"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2 mb-6">
        <div className="mx-auto w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center mb-2">
          <Mail className="w-6 h-6 text-orange-500" />
        </div>
        <h3 className="text-xl font-bold text-white">Verify your Email</h3>
        <p className="text-sm text-zinc-400">
          We sent a verification code to <br />
          <span className="text-white font-medium">{email}</span>
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="otp" className="text-zinc-400 text-xs font-bold uppercase tracking-wider">
          Verification Code
        </Label>
        <Input
          id="otp"
          placeholder="Enter 6-digit code"
          className="bg-zinc-900/40 border-zinc-800 text-white placeholder:text-zinc-700 h-12 text-center text-lg tracking-widest focus-visible:ring-orange-500/50"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          autoFocus
        />
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={loading}
          className="border-zinc-800 bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-900 w-24 h-12 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          onClick={handleVerify}
          disabled={loading || otp.length < 4}
          className="grow bg-linear-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold h-12 rounded-xl shadow-xl shadow-orange-600/20"
        >
          {loading ? <Loader2Icon className="h-5 w-5 animate-spin" /> : 'Verify & Launch'}
        </Button>
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={handleResendClick}
          disabled={timer > 0 || loading}
          className={`text-xs font-bold ${timer > 0 ? 'text-zinc-600 cursor-not-allowed' : 'text-orange-500 hover:text-orange-400'}`}
        >
          {timer > 0 ? `Resend code in ${timer}s` : 'Resend Verification Code'}
        </button>
      </div>
    </motion.div>
  );
};
