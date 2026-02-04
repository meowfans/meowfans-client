'use client';

import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

import useAPI from '@/hooks/useAPI';
import { configService } from '@/util/config';
import { buildSafeUrl } from '@/util/helpers';
import { Card, CardContent } from '@workspace/ui/components/card';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { AuthUserRoles } from '@workspace/ui/lib/enums';
import { CreatorSignupInput } from '@workspace/ui/lib/types';
import { isValidEmail, isValidPassword } from '@workspace/ui/lib/validators';
import { CreatorSignupFirstStep } from './CreatorSignupFirstStep';
import { CreatorSignupFooter } from './CreatorSignupFooter';
import { CreatorSignupHeader } from './CreatorSignupHeader';
import { CreatorSignupLastStep } from './CreatorSignupLastStep';

const redirectUrlMap = {
  [AuthUserRoles.CREATOR]: buildSafeUrl({ host: configService.NEXT_PUBLIC_CREATOR_URL, pathname: '/studio' })
};

export function CreatorSignupForm() {
  const router = useRouter();
  const { errorHandler } = useErrorHandler();
  const { creatorSignup } = useAPI();
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [input, setInput] = useState<CreatorSignupInput>({
    email: '',
    fullName: '',
    username: '',
    password: ''
  });

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateStep2()) return;
    setLoading(true);

    try {
      await creatorSignup(input);
      toast.success('Your creator journey begins now!');
      return router.push(redirectUrlMap[AuthUserRoles.CREATOR]);
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto order-1 lg:order-2">
      <Card className="border-zinc-800 bg-black/60 backdrop-blur-3xl shadow-2xl shadow-orange-500/10 overflow-hidden relative border-t-orange-500/20">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-orange-500 via-amber-500 to-yellow-500" />

        <CardContent className="p-8">
          <CreatorSignupHeader step={step} />
          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <CreatorSignupFirstStep
                  input={input}
                  errors={errors}
                  setInput={setInput}
                  setErrors={setErrors}
                  handleNextStep={handleNextStep}
                />
              ) : (
                <CreatorSignupLastStep
                  input={input}
                  errors={errors}
                  setInput={setInput}
                  setErrors={setErrors}
                  handleSubmit={handleSubmit}
                  loading={loading}
                  setStep={setStep}
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
