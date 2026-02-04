'use client';

import { Loader2Icon, Lock, LogIn, Mail } from 'lucide-react';
import Link from 'next/link';
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
import { AuthUserRoles, LoginInput } from '@workspace/ui/lib/enums';
import { isValidEmail, isValidPassword } from '@workspace/ui/lib/validators';

const redirectUrlMap = {
  [AuthUserRoles.CREATOR]: buildSafeUrl({ host: configService.NEXT_PUBLIC_CREATOR_URL, pathname: '/studio' }),
  [AuthUserRoles.ADMIN]: buildSafeUrl({ host: configService.NEXT_PUBLIC_ADMIN_URL, pathname: '/home' }),
  [AuthUserRoles.FAN]: buildSafeUrl({ host: configService.NEXT_PUBLIC_FAN_URL, pathname: '/dashboard' }),
  [AuthUserRoles.SUPER_VIEWER]: buildSafeUrl({ host: configService.NEXT_PUBLIC_FAN_URL, pathname: '/dashboard' })
};

export function LoginForm() {
  const router = useRouter();
  const { errorHandler } = useErrorHandler();
  const { login } = useAPI();
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<LoginInput>({ email: '', password: '' });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    if (!isValidEmail(input.email)) newErrors.email = 'Please enter a valid email address';
    if (!isValidPassword(input.password)) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      const { roles } = await login(input);
      const role = roles?.at(0) as AuthUserRoles;
      toast.success('Welcome back!');
      return router.push(redirectUrlMap[role] || '/');
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="login-email" className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">
          Email Address
        </Label>
        <div className="relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-400 transition-colors">
            <Mail className="w-4 h-4" />
          </div>
          <Input
            id="login-email"
            type="email"
            placeholder="you@example.com"
            className="bg-zinc-900/40 border-zinc-800 text-white placeholder:text-zinc-700 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500/50 h-12 pl-10 transition-all"
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
        <div className="flex items-center justify-between">
          <Label htmlFor="login-password" className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">
            Password
          </Label>
          <Link href="/forgot-password" title="Forgot password" className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">
            Forgot password?
          </Link>
        </div>
        <div className="relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-400 transition-colors">
            <Lock className="w-4 h-4" />
          </div>
          <Input
            id="login-password"
            type="password"
            placeholder="••••••••"
            className="bg-zinc-900/40 border-zinc-800 text-white placeholder:text-zinc-700 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500/50 h-12 pl-10 transition-all"
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
        className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold h-12 rounded-xl transition-all duration-300 shadow-xl shadow-indigo-600/20 active:scale-[0.98] disabled:opacity-70"
        disabled={loading}
      >
        {loading ? (
          <Loader2Icon className="h-5 w-5 animate-spin" />
        ) : (
          <span className="flex items-center gap-2">
            Sign In <LogIn className="w-4 h-4" />
          </span>
        )}
      </Button>
    </form>
  );
}
