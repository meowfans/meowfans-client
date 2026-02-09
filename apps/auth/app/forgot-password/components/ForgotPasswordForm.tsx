'use client';

import { useAuthActions } from '@workspace/gql/actions/auth.actions';
import { EmailType } from '@workspace/gql/generated/graphql';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { LoadingButtonV2 } from '@workspace/ui/globals/LoadingButtonV2';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useSuccessHandler } from '@workspace/ui/hooks/useSuccessHandler';
import { cn } from '@workspace/ui/lib/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export function ForgotPasswordForm({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [step, setStep] = useState<1 | 2>(1);

  const { generateOtpMutation, validateOtpMutation, forgotAndResetPasswordMutation } = useAuthActions();
  const { successHandler } = useSuccessHandler();
  const { errorHandler } = useErrorHandler();
  const router = useRouter();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (step === 1) {
        const { data } = await generateOtpMutation({ email, emailType: EmailType.ForgotPassword });
        successHandler({ message: data?.generateOtp as string });
        setStep(2);
      } else {
        const { data: validateData } = await validateOtpMutation({ email, otp });
        if (validateData?.validateOtp) {
          await forgotAndResetPasswordMutation({ email, password: newPassword });
          successHandler({ message: 'Password has been reset successfully' });
          router.push('/login');
        } else {
          errorHandler({ msg: 'Invalid OTP. Please try again.' });
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
            <div className="grid gap-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1" htmlFor="email">
                Recovery Email
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
          ) : (
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1" htmlFor="otp">
                  Verification Code
                </Label>
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
                    className="h-12 text-center text-xl font-black tracking-[0.3em] bg-white/[0.03] border-white/5 focus:border-primary/50 focus:ring-primary/20 transition-all rounded-xl"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1" htmlFor="newPassword">
                  New Secure Password
                </Label>
                <div className="relative group">
                  <Input
                    id="newPassword"
                    placeholder="••••••••"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="new-password"
                    autoCorrect="off"
                    disabled={isLoading}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="h-12 bg-white/[0.03] border-white/5 focus:border-primary/50 focus:ring-primary/20 transition-all rounded-xl"
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="button"
                  className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors py-2"
                  disabled={isLoading}
                  onClick={async () => {
                    setIsLoading(true);
                    try {
                      const { data } = await generateOtpMutation({ email, emailType: EmailType.ForgotPassword });
                      toast.success(data?.generateOtp as string);
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
              {step === 1 ? 'Get Recovery Code' : 'Update Password'}
            </LoadingButtonV2>
          </div>

          {step === 2 && (
            <button
              type="button"
              className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 hover:text-primary transition-colors text-center"
              onClick={() => {
                setStep(1);
                setOtp('');
                setNewPassword('');
              }}
            >
              ← Change Details
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
