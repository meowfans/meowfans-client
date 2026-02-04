import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { SignupInput } from '@workspace/ui/lib/enums';
import { Loader2Icon, Mail } from 'lucide-react';

interface SignupStepOtpProps {
  input: SignupInput;
  setStep: React.Dispatch<React.SetStateAction<'FORM' | 'OTP'>>;
  loading: boolean;
  otp: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
  handleVerify: () => Promise<void>;
  handleResendOtp: () => Promise<void>;
}

export function SignupStepOtp({ input, setStep, loading, otp, setOtp, handleVerify, handleResendOtp }: SignupStepOtpProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="text-center space-y-2 mb-4">
        <div className="mx-auto w-12 h-12 bg-pink-500/10 rounded-full flex items-center justify-center mb-2">
          <Mail className="w-6 h-6 text-pink-500" />
        </div>
        <h3 className="text-xl font-bold text-white">Verify Email</h3>
        <p className="text-sm text-zinc-400">
          Enter code sent to <span className="text-white font-medium">{input.email}</span>
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="otp-input" className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">
          Verification Code
        </Label>
        <Input
          id="otp-input"
          placeholder="000000"
          className="bg-zinc-900/40 border-zinc-800 text-white placeholder:text-zinc-700 focus-visible:ring-pink-500/50 focus-visible:border-pink-500/50 h-12 text-center text-lg tracking-widest transition-all"
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
          onClick={() => setStep('FORM')}
          disabled={loading}
          className="border-zinc-800 bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-900 w-24 h-12 rounded-xl"
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={handleVerify}
          className="grow bg-linear-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold h-12 rounded-xl transition-all duration-300 shadow-xl shadow-pink-600/20 active:scale-[0.98] disabled:opacity-70"
          disabled={loading || otp.length < 4}
        >
          {loading ? <Loader2Icon className="h-5 w-5 animate-spin" /> : <span className="flex items-center gap-2">Verify & Create</span>}
        </Button>
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={handleResendOtp}
          disabled={loading}
          className="text-xs font-bold text-pink-500 hover:text-pink-400 hover:underline"
        >
          Resend Verification Code
        </button>
      </div>
    </div>
  );
}
