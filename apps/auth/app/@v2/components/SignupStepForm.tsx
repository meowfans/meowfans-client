import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { SignupInput } from '@workspace/ui/lib/enums';
import { ArrowRight, Loader2Icon, Lock, Mail, User } from 'lucide-react';

interface SignupStepFormProps {
  input: SignupInput;
  setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof SignupInput, string>>>>;
  setInput: React.Dispatch<React.SetStateAction<SignupInput>>;
  loading: boolean;
  errors: { [key: string]: string | undefined };
}

export function SignupStepForm({ input, setErrors, setInput, loading, errors }: SignupStepFormProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
      <div className="space-y-2">
        <Label htmlFor="signup-name" className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">
          Full Name
        </Label>
        <div className="relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-pink-400 transition-colors">
            <User className="w-4 h-4" />
          </div>
          <Input
            id="signup-name"
            placeholder="John Doe"
            className="bg-zinc-900/40 border-zinc-800 text-white placeholder:text-zinc-700 focus-visible:ring-pink-500/50 focus-visible:border-pink-500/50 h-12 pl-10 transition-all"
            value={input.fullName}
            onChange={(e) => {
              setInput((prev) => ({ ...prev, fullName: e.target.value }));
              setErrors((prev) => ({ ...prev, fullName: undefined }));
            }}
          />
        </div>
        {errors.fullName && <p className="text-xs text-red-500 font-medium">{errors.fullName}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-email" className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">
          Email Address
        </Label>
        <div className="relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-pink-400 transition-colors">
            <Mail className="w-4 h-4" />
          </div>
          <Input
            id="signup-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="bg-zinc-900/40 border-zinc-800 text-white placeholder:text-zinc-700 focus-visible:ring-pink-500/50 focus-visible:border-pink-500/50 h-12 pl-10 transition-all"
            value={input.email}
            onChange={(e) => {
              setInput((prev) => ({ ...prev, email: e.target.value.trim() }));
              setErrors((prev) => ({ ...prev, email: undefined }));
            }}
          />
        </div>
        {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-password" className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">
          Password
        </Label>
        <div className="relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-pink-400 transition-colors">
            <Lock className="w-4 h-4" />
          </div>
          <Input
            id="signup-password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            className="bg-zinc-900/40 border-zinc-800 text-white placeholder:text-zinc-700 focus-visible:ring-pink-500/50 focus-visible:border-pink-500/50 h-12 pl-10 transition-all"
            value={input.password}
            onChange={(e) => {
              setInput((prev) => ({ ...prev, password: e.target.value.trim() }));
              setErrors((prev) => ({ ...prev, password: undefined }));
            }}
          />
        </div>
        {errors.password && <p className="text-xs text-red-500 font-medium">{errors.password}</p>}
      </div>

      <Button
        type="submit"
        className="w-full bg-linear-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold h-12 rounded-xl transition-all duration-300 shadow-xl shadow-pink-600/20 active:scale-[0.98] disabled:opacity-70"
        disabled={loading}
      >
        {loading ? (
          <Loader2Icon className="h-5 w-5 animate-spin" />
        ) : (
          <span className="flex items-center gap-2">
            Create Account <ArrowRight className="w-4 h-4" />
          </span>
        )}
      </Button>
    </div>
  );
}
