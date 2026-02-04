'use client';

import useAPI from '@/hooks/useAPI';
import { configService } from '@/util/config';
import { buildSafeUrl } from '@/util/helpers';
import { useAuthActions } from '@workspace/gql/actions/auth.actions';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useSuccessHandler } from '@workspace/ui/hooks/useSuccessHandler';
import { AuthUserRoles, SignupInput } from '@workspace/ui/lib/enums';
import { isValidEmail, isValidPassword } from '@workspace/ui/lib/validators';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { SignupStepForm } from './SignupStepForm';
import { SignupStepOtp } from './SignupStepOtp';

const redirectUrlMap = {
  [AuthUserRoles.CREATOR]: buildSafeUrl({ host: configService.NEXT_PUBLIC_CREATOR_URL, pathname: '/studio' }),
  [AuthUserRoles.ADMIN]: buildSafeUrl({ host: configService.NEXT_PUBLIC_ADMIN_URL, pathname: '/home' }),
  [AuthUserRoles.FAN]: buildSafeUrl({ host: configService.NEXT_PUBLIC_FAN_URL, pathname: '/dashboard' }),
  [AuthUserRoles.SUPER_VIEWER]: buildSafeUrl({ host: configService.NEXT_PUBLIC_FAN_URL, pathname: '/dashboard' })
};

export function SignupForm() {
  const router = useRouter();
  const { errorHandler } = useErrorHandler();
  const [otp, setOtp] = useState<string>('');
  const { successHandler } = useSuccessHandler();
  const { signup } = useAPI();
  const { generateOtpMutation, validateOtpMutation } = useAuthActions();
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<'FORM' | 'OTP'>('FORM');
  const [errors, setErrors] = useState<Partial<Record<keyof SignupInput, string>>>({});
  const [input, setInput] = useState<SignupInput>({ email: '', fullName: '', password: '' });

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof SignupInput, string>> = {};
    if (!input.fullName) newErrors.fullName = 'Full name is required';
    if (!isValidEmail(input.email)) newErrors.email = 'Invalid email address';
    if (!isValidPassword(input.password)) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResendOtp = async () => {
    try {
      await generateOtpMutation(input.email);
      successHandler({ message: 'Verification code resent' });
    } catch (error) {
      errorHandler({ error });
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    try {
      const isValid = await validateOtpMutation({ email: input.email, otp });
      if (isValid) {
        await signup(input);
        successHandler({ message: 'Account created! Welcome to MeowFans.' });
        return router.push(redirectUrlMap[AuthUserRoles.FAN]);
      } else {
        errorHandler({ msg: 'Invalid verification code' });
      }
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      await generateOtpMutation(input.email);
      setStep('OTP');
      successHandler({ message: 'Verification code sent to your email' });
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {step === 'FORM' ? (
        <SignupStepForm input={input} setErrors={setErrors} setInput={setInput} loading={loading} errors={errors} />
      ) : (
        <SignupStepOtp
          input={input}
          setStep={setStep}
          loading={loading}
          otp={otp}
          setOtp={setOtp}
          handleVerify={handleVerify}
          handleResendOtp={handleResendOtp}
        />
      )}
    </form>
  );
}
