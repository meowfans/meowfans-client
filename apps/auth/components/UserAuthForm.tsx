'use client';

import useAPI from '@/hooks/useAPI';
import { configService } from '@/util/config';
import { buildSafeUrl } from '@/util/helpers';
import { useAuthActions } from '@workspace/gql/actions/auth.actions';
import { EmailType } from '@workspace/gql/generated/graphql';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { LoadingButtonV2 } from '@workspace/ui/globals/LoadingButtonV2';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useSuccessHandler } from '@workspace/ui/hooks/useSuccessHandler';
import { AuthUserRoles } from '@workspace/ui/lib/enums';
import { cn } from '@workspace/ui/lib/utils';
import { Github } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useState } from 'react';
import { toast } from 'sonner';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  mode: 'login' | 'signup';
}

export function UserAuthForm({ className, mode, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [step, setStep] = useState<1 | 2>(1);

  const { login, signup } = useAPI();
  const { generateOtpMutation, validateOtpMutation } = useAuthActions();
  const router = useRouter();
  const { errorHandler } = useErrorHandler();
  const { successHandler } = useSuccessHandler();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (mode === 'login') {
        const data = await login({ email, password });
        const role = data.roles?.[0];

        successHandler({ message: 'Logged in successfully' });

        switch (role) {
          case AuthUserRoles.ADMIN:
            router.push(buildSafeUrl({ host: configService.NEXT_PUBLIC_ADMIN_URL, pathname: '/vaults' }));
            break;
          case AuthUserRoles.CREATOR:
            router.push(buildSafeUrl({ host: configService.NEXT_PUBLIC_CREATOR_URL, pathname: '/dashboard' }));
            break;
          case AuthUserRoles.FAN:
            router.push(buildSafeUrl({ host: configService.NEXT_PUBLIC_FAN_URL, pathname: '/dashboard' }));
            break;
          default:
            router.push(buildSafeUrl({ host: configService.NEXT_PUBLIC_FAN_URL, pathname: '/dashboard' }));
        }
      } else {
        if (step === 1) {
          const { data } = await generateOtpMutation({ email, emailType: EmailType.EmailVerification });
          successHandler({ message: data?.generateOtp as string });
          setStep(2);
        } else {
          const { data: validateData } = await validateOtpMutation({ email, otp });
          if (validateData?.validateOtp) {
            await signup({ email, password, fullName });
            successHandler({ message: 'Account created successfully', isEnabledConfetti: true });
            router.push(buildSafeUrl({ host: configService.NEXT_PUBLIC_FAN_URL }));
          } else {
            errorHandler({ msg: 'Invalid OTP. Please try again.' });
          }
        }
      }
    } catch (error) {
      errorHandler({ error });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-6">
          {step === 1 ? (
            <div className="grid gap-4">
              {mode === 'signup' && (
                <div className="grid gap-2">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1" htmlFor="fullName">
                    Full Name
                  </Label>
                  <div className="relative group">
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      type="text"
                      autoCapitalize="words"
                      autoComplete="name"
                      autoCorrect="off"
                      disabled={isLoading}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="h-12 bg-white/[0.03] border-white/5 focus:border-primary/50 focus:ring-primary/20 transition-all rounded-xl"
                    />
                  </div>
                </div>
              )}
              <div className="grid gap-2">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1" htmlFor="email">
                  Email Address
                </Label>
                <div className="relative group">
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 bg-white/[0.03] border-white/5 focus:border-primary/50 focus:ring-primary/20 transition-all rounded-xl"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between ml-1">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60" htmlFor="password">
                    Password
                  </Label>
                  {mode === 'login' && (
                    <a
                      href="/forgot-password"
                      className="text-[10px] font-black uppercase tracking-widest text-primary/60 hover:text-primary transition-colors"
                    >
                      Forgot?
                    </a>
                  )}
                </div>
                <div className="relative group">
                  <Input
                    id="password"
                    placeholder="••••••••"
                    type="password"
                    autoCapitalize="none"
                    autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                    autoCorrect="off"
                    disabled={isLoading}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 bg-white/[0.03] border-white/5 focus:border-primary/50 focus:ring-primary/20 transition-all rounded-xl"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              <div className="grid gap-2 text-center mb-2">
                <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary" htmlFor="otp">
                  Verification Code
                </Label>
                <p className="text-[11px] text-muted-foreground font-medium">We&apos;ve sent a code to your email</p>
              </div>
              <div className="relative group">
                <Input
                  id="otp"
                  placeholder="EX: 123456"
                  type="text"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isLoading}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="h-14 text-center text-2xl font-black tracking-[0.5em] bg-white/[0.03] border-white/5 focus:border-primary/50 focus:ring-primary/20 transition-all rounded-xl"
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors py-2"
                  disabled={isLoading}
                  onClick={async () => {
                    setIsLoading(true);
                    try {
                      await generateOtpMutation({ email, emailType: EmailType.EmailVerification });
                      toast.success('OTP resent');
                    } catch (error) {
                      errorHandler({ error });
                    } finally {
                      setIsLoading(false);
                    }
                  }}
                >
                  Resend Code
                </button>
              </div>
            </div>
          )}

          <div className="pt-2">
            <LoadingButtonV2
              loading={isLoading}
              className="w-full h-12 rounded-xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-primary/10 transition-all hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              {mode === 'login' ? 'Proceed' : step === 1 ? 'Get Code' : 'Verify & Continue'}
            </LoadingButtonV2>
          </div>

          {mode === 'signup' && step === 2 && (
            <button
              type="button"
              className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 hover:text-primary transition-colors text-center"
              onClick={() => {
                setStep(1);
                setOtp('');
              }}
            >
              ← Change Details
            </button>
          )}
        </div>
      </form>

      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-white/5" />
        </div>
        <div className="relative flex justify-center text-[10px] uppercase font-black tracking-[0.3em]">
          <span className="bg-background px-4 text-muted-foreground/30">Auth Gateway</span>
        </div>
      </div>

      <LoadingButtonV2
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={() => {
          toast.info('Github login coming soon');
        }}
        className="h-12 border-white/5 bg-white/[0.02] hover:bg-white/[0.05] rounded-xl font-black uppercase tracking-[0.2em] text-[10px]"
      >
        {!isLoading && <Github className="mr-2 h-4 w-4 opacity-60" />} Sign In with GitHub
      </LoadingButtonV2>
    </div>
  );
}
