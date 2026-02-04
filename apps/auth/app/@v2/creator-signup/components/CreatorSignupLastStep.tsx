import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { CreatorSignupInput } from '@workspace/ui/lib/types';
import { motion } from 'framer-motion';
import { ArrowLeft, AtSign, Loader2Icon, Lock } from 'lucide-react';

interface CreatorSignupLastStepProps {
  input: CreatorSignupInput;
  errors: Partial<Record<keyof CreatorSignupInput, string>>;
  setInput: React.Dispatch<React.SetStateAction<CreatorSignupInput>>;
  setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof CreatorSignupInput, string>>>>;
  loading: boolean;
  setStep: React.Dispatch<React.SetStateAction<1 | 2 | 3>>;
}

export const CreatorSignupLastStep = ({
  input,
  errors,
  setInput,
  setErrors,
  loading,
  setStep
}: CreatorSignupLastStepProps) => {
  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <Label htmlFor="username" className="text-zinc-400 text-xs font-bold uppercase tracking-wider">
          Platform Username
        </Label>
        <div className="relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-orange-400 transition-colors">
            <AtSign className="w-4 h-4" />
          </div>
          <Input
            id="username"
            placeholder="yourname"
            autoComplete='username'
            className="bg-zinc-900/40 border-zinc-800 text-white placeholder:text-zinc-700 h-12 pl-10 focus-visible:ring-orange-500/50"
            value={input.username}
            onChange={(e) => {
              setInput((prev) => ({ ...prev, username: e.target.value.trim() }));
              setErrors((prev) => ({ ...prev, username: undefined }));
            }}
          />
        </div>
        {errors.username && <p className="text-xs text-red-500 font-medium">{errors.username}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-zinc-400 text-xs font-bold uppercase tracking-wider">
          Secure Password
        </Label>
        <div className="relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-orange-400 transition-colors">
            <Lock className="w-4 h-4" />
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            className="bg-zinc-900/40 border-zinc-800 text-white placeholder:text-zinc-700 h-12 pl-10 focus-visible:ring-orange-500/50"
            value={input.password}
            onChange={(e) => {
              setInput((prev) => ({ ...prev, password: e.target.value.trim() }));
              setErrors((prev) => ({ ...prev, password: undefined }));
            }}
          />
        </div>
        {errors.password && <p className="text-xs text-red-500 font-medium">{errors.password}</p>}
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => setStep(1)}
          className="border-zinc-800 bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-900 w-24 h-12 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="grow bg-linear-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold h-12 rounded-xl shadow-xl shadow-orange-600/20"
        >
          {loading ? <Loader2Icon className="h-5 w-5 animate-spin" /> : 'Launch Studio'}
        </Button>
      </div>
    </motion.div>
  );
};
