'use client';

import { ArrowRight, Loader2Icon, Lock, Mail, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';
import useAPI from '@/hooks/useAPI';
import { configService } from '@/util/config';
import { buildSafeUrl } from '@/util/helpers';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { AuthUserRoles, SignupInput } from '@workspace/ui/lib/enums';
import { isValidEmail, isValidPassword } from '@workspace/ui/lib/validators';

const redirectUrlMap = {
  [AuthUserRoles.CREATOR]: buildSafeUrl({ host: configService.NEXT_PUBLIC_CREATOR_URL, pathname: '/studio' }),
  [AuthUserRoles.ADMIN]: buildSafeUrl({ host: configService.NEXT_PUBLIC_ADMIN_URL, pathname: '/home' }),
  [AuthUserRoles.FAN]: buildSafeUrl({ host: configService.NEXT_PUBLIC_FAN_URL, pathname: '/dashboard' }),
  [AuthUserRoles.SUPER_VIEWER]: buildSafeUrl({ host: configService.NEXT_PUBLIC_FAN_URL, pathname: '/dashboard' })
};

export function SignupForm() {
  const router = useRouter();
  const { errorHandler } = useErrorHandler();
  const { signup } = useAPI();
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<SignupInput>({ email: '', fullName: '', password: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof SignupInput, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof SignupInput, string>> = {};
    if (!input.fullName) newErrors.fullName = 'Full name is required';
    if (!isValidEmail(input.email)) newErrors.email = 'Invalid email address';
    if (!isValidPassword(input.password)) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      await signup(input);
      toast.success('Account created! Welcome to MeowFans.');
      return router.push(redirectUrlMap[AuthUserRoles.FAN]);
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
            autoComplete="new-password"
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
    </form>
  );
}
