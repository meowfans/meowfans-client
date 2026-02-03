'use client';

import useAPI from '@/hooks/useAPI';
import { configService } from '@/util/config';
import { buildSafeUrl } from '@/util/helpers';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { Vortex } from '@workspace/ui/components/shadcn-io/vortex';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { AuthUserRoles } from '@workspace/ui/lib/enums';
import { CreatorSignupInput } from '@workspace/ui/lib/types';
import { isValidEmail, isValidPassword } from '@workspace/ui/lib/validators';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon, Loader2Icon, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

export default function CreatorSignupV2Page() {
  const router = useRouter();
  const { errorHandler } = useErrorHandler();
  const { creatorSignup } = useAPI();
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<1 | 2>(1);

  // Input States
  const [input, setInput] = useState<CreatorSignupInput>({
    email: '',
    fullName: '',
    username: '',
    password: ''
  });

  // Error States
  const [errors, setErrors] = useState<Partial<Record<keyof CreatorSignupInput, string>>>({});

  const redirectUrlMap = {
    [AuthUserRoles.CREATOR]: buildSafeUrl({ host: configService.NEXT_PUBLIC_CREATOR_URL, pathname: '/studio' }),
    [AuthUserRoles.ADMIN]: buildSafeUrl({ host: configService.NEXT_PUBLIC_ADMIN_URL, pathname: '/home' }),
    [AuthUserRoles.FAN]: buildSafeUrl({ host: configService.NEXT_PUBLIC_FAN_URL, pathname: '/dashboard' }),
    [AuthUserRoles.SUPER_VIEWER]: buildSafeUrl({ host: configService.NEXT_PUBLIC_FAN_URL, pathname: '/dashboard' })
  };

  const validateStep1 = (): boolean => {
    const newErrors: typeof errors = {};
    if (!input.fullName) newErrors.fullName = 'Full name is required';
    if (!isValidEmail(input.email)) newErrors.email = 'Invalid email format';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: typeof errors = {};
    if (!input.username) newErrors.username = 'Username is required';
    if (!isValidPassword(input.password)) newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateStep2()) return;
    setLoading(true);

    try {
      await creatorSignup(input);
      toast.success('Creator account created! Welcome aboard.');
      return router.push(redirectUrlMap[AuthUserRoles.CREATOR]);
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-black text-white">
      {/* Background Effect - Golden Hue for Creators */}
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={600}
        baseHue={45} // Golden/Orange layout
        className="h-full w-full overflow-y-auto overflow-x-hidden"
      >
        <div className="z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 place-content-center items-center mx-auto min-h-full px-4 py-12 md:px-10 md:py-4">
          {/* Left Side: Brand / Hero Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col gap-8 text-center md:text-left order-2 md:order-1"
          >
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                <Sparkles className="text-white h-6 w-6" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-200 to-amber-100">
                MeowFans Creator
              </h1>
            </div>

            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Turn your passion <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400">
                into profit.
              </span>
            </h2>

            <p className="text-xl text-zinc-400 max-w-lg mx-auto md:mx-0">
              Join the elite creators earning more on MeowFans. Keep 90% of your earnings. No hidden fees.
            </p>

            <div className="flex flex-col gap-4 items-center md:items-start pt-4">
              <div className="grid grid-cols-3 gap-6 w-full max-w-md">
                <div className="flex flex-col gap-1 p-3 bg-zinc-900/50 rounded-xl border border-zinc-800 text-center">
                  <span className="text-2xl font-bold text-white">$45M+</span>
                  <span className="text-xs text-zinc-500">Paid to Creators</span>
                </div>
                <div className="flex flex-col gap-1 p-3 bg-zinc-900/50 rounded-xl border border-zinc-800 text-center">
                  <span className="text-2xl font-bold text-white">0%</span>
                  <span className="text-xs text-zinc-500">Platform Fees*</span>
                </div>
                <div className="flex flex-col gap-1 p-3 bg-zinc-900/50 rounded-xl border border-zinc-800 text-center">
                  <span className="text-2xl font-bold text-white">24/7</span>
                  <span className="text-xs text-zinc-500">Creator Support</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Signup Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="w-full max-w-md mx-auto order-1 md:order-2"
          >
            <Card className="border-zinc-800 bg-black/60 backdrop-blur-2xl shadow-2xl shadow-orange-500/10 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500" />

              <CardContent className="p-8">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white">Join as Creator</h3>
                    <p className="text-zinc-500 text-sm">Step {step} of 2</p>
                  </div>
                  {step === 2 && (
                    <Button variant="ghost" size="sm" onClick={() => setStep(1)} className="text-zinc-400 hover:text-white">
                      <ArrowLeftIcon className="w-4 h-4 mr-1" /> Back
                    </Button>
                  )}
                </div>

                <form onSubmit={handleSignup} className="space-y-6">
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-zinc-300">
                          Full Name
                        </Label>
                        <Input
                          id="fullName"
                          placeholder="Your Real Name"
                          className="bg-zinc-900/50 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-orange-500"
                          value={input.fullName}
                          onChange={(e) => {
                            setInput((prev) => ({ ...prev, fullName: e.target.value }));
                            setErrors((prev) => ({ ...prev, fullName: undefined }));
                          }}
                        />
                        {errors.fullName && <p className="text-xs text-red-400">{errors.fullName}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-zinc-300">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="creator@meowfans.app"
                          className="bg-zinc-900/50 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-orange-500"
                          value={input.email}
                          onChange={(e) => {
                            setInput((prev) => ({ ...prev, email: e.target.value.trim() }));
                            setErrors((prev) => ({ ...prev, email: undefined }));
                          }}
                        />
                        {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
                      </div>

                      <Button
                        type="button"
                        onClick={handleNextStep}
                        className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white h-11"
                      >
                        Continue <ArrowRightIcon className="ml-2 w-4 h-4" />
                      </Button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="username" className="text-zinc-300">
                          Choose Username
                        </Label>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-zinc-500">@</span>
                          <Input
                            id="username"
                            placeholder="username"
                            className="bg-zinc-900/50 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-orange-500 pl-8"
                            value={input.username}
                            onChange={(e) => {
                              setInput((prev) => ({ ...prev, username: e.target.value.trim() }));
                              setErrors((prev) => ({ ...prev, username: undefined }));
                            }}
                          />
                        </div>
                        {errors.username && <p className="text-xs text-red-400">{errors.username}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-zinc-300">
                          Password
                        </Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Create a strong password"
                          className="bg-zinc-900/50 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-orange-500"
                          value={input.password}
                          onChange={(e) => {
                            setInput((prev) => ({ ...prev, password: e.target.value.trim() }));
                            setErrors((prev) => ({ ...prev, password: undefined }));
                          }}
                        />
                        {errors.password && <p className="text-xs text-red-400">{errors.password}</p>}
                      </div>

                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white h-11 shadow-lg shadow-orange-600/20"
                      >
                        {loading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
                        Complete Signup
                      </Button>
                    </motion.div>
                  )}
                </form>

                <div className="mt-8 pt-6 border-t border-zinc-800 text-center">
                  <p className="text-sm text-zinc-500">
                    Already a creator?{' '}
                    <a href="/v2" className="text-orange-400 hover:text-orange-300 hover:underline">
                      Log in to Studio
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Vortex>
    </div>
  );
}
