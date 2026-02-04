'use client';

import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

import useAPI from '@/hooks/useAPI';
import { configService } from '@/util/config';
import { buildSafeUrl } from '@/util/helpers';
import { Card, CardContent } from '@workspace/ui/components/card';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useSuccessHandler } from '@workspace/ui/hooks/useSuccessHandler';
import { AuthUserRoles } from '@workspace/ui/lib/enums';
import { CreatorSignupInput } from '@workspace/ui/lib/types';
import { isValidEmail, isValidPassword } from '@workspace/ui/lib/validators';
import { CreatorSignupFirstStep } from './CreatorSignupFirstStep';
import { CreatorSignupFooter } from './CreatorSignupFooter';
import { CreatorSignupHeader } from './CreatorSignupHeader';
import { CreatorSignupLastStep } from './CreatorSignupLastStep';
import { CreatorSignupOtpStep } from './CreatorSignupOtpStep';

const redirectUrlMap = {
  [AuthUserRoles.CREATOR]: buildSafeUrl({ host: configService.NEXT_PUBLIC_CREATOR_URL, pathname: '/studio' })
};

const emptyInput: CreatorSignupInput = {
  email: '',
  fullName: '',
  username: '',
  password: ''
};

export function CreatorSignupForm() {
  const router = useRouter();
  const { errorHandler } = useErrorHandler();
  const [otp, setOtp] = useState<string>('');
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const { successHandler } = useSuccessHandler();
  const [loading, setLoading] = useState<boolean>(false);
  const { creatorSignup, generateOtp, validateOtp } = useAPI();
  const [input, setInput] = useState<CreatorSignupInput>(emptyInput);

  const [errors, setErrors] = useState<Partial<Record<keyof CreatorSignupInput, string>>>({});

  const validateStep1 = (): boolean => {
    const newErrors: typeof errors = {};
    if (!input.fullName) newErrors.fullName = 'Please enter your legal name';
    if (!isValidEmail(input.email)) newErrors.email = 'Please enter a valid business email';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: typeof errors = {};
    if (!input.username) newErrors.username = 'Please choose a unique username';
    if (!isValidPassword(input.password)) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleResendOtp = async () => {
    try {
      await generateOtp({ email: input.email });
      successHandler({ message: 'Verification code resent' });
    } catch (error) {
      errorHandler({ error });
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    try {
      const isValid = await validateOtp({ email: input.email, otp });

      if (isValid) {
        await creatorSignup(input);
        successHandler({ message: 'Your creator journey begins now!' });
        return router.push(redirectUrlMap[AuthUserRoles.CREATOR]);
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
    if (!validateStep2()) return;

    setLoading(true);
    try {
      await generateOtp({ email: input.email });
      setStep(3);
      successHandler({ message: 'Verification code sent to your email' });
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  const currentHeaderStep = step === 3 ? 2 : step;

  return (
    <div className="w-full max-w-md mx-auto order-1 lg:order-2">
      <Card className="border-zinc-800 bg-black/60 backdrop-blur-3xl shadow-2xl shadow-orange-500/10 overflow-hidden relative border-t-orange-500/20">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-orange-500 via-amber-500 to-yellow-500" />

        <CardContent className="p-8">
          <CreatorSignupHeader step={currentHeaderStep as 1 | 2} />
          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <CreatorSignupFirstStep
                  key="step1"
                  input={input}
                  errors={errors}
                  setInput={setInput}
                  setErrors={setErrors}
                  handleNextStep={handleNextStep}
                />
              )}
              {step === 2 && (
                <CreatorSignupLastStep
                  key="step2"
                  input={input}
                  errors={errors}
                  setInput={setInput}
                  setErrors={setErrors}
                  loading={loading}
                  setStep={setStep}
                />
              )}
              {step === 3 && (
                <CreatorSignupOtpStep
                  key="step3"
                  email={input.email}
                  otp={otp}
                  setOtp={setOtp}
                  handleVerify={handleVerify}
                  loading={loading}
                  onBack={() => setStep(2)}
                  onResend={handleResendOtp}
                />
              )}
            </AnimatePresence>
          </form>
          <CreatorSignupFooter />
        </CardContent>
      </Card>

      <p className="mt-6 text-center text-[10px] text-zinc-600 uppercase tracking-widest font-bold">
        Protected by enterprise-grade 256-bit encryption
      </p>
    </div>
  );
}
