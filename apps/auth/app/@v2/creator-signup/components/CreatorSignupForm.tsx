'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, AtSign, CheckCircle2, Loader2Icon, Lock, Mail, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

import useAPI from '@/hooks/useAPI';
import { configService } from '@/util/config';
import { buildSafeUrl } from '@/util/helpers';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { AuthUserRoles } from '@workspace/ui/lib/enums';
import { CreatorSignupInput } from '@workspace/ui/lib/types';
import { isValidEmail, isValidPassword } from '@workspace/ui/lib/validators';

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
          <div className="mb-10 flex items-end justify-between">
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-white tracking-tight">BECOME A CREATOR</h3>
              <div className="flex gap-1.5">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className={`h-1.5 w-10 rounded-full transition-all duration-500 ${step >= i ? 'bg-orange-500' : 'bg-zinc-800'}`}
                  />
                ))}
              </div>
            </div>
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest bg-zinc-900 px-2 py-1 rounded">
              Step {step} / 2
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-zinc-400 text-xs font-bold uppercase tracking-wider">
                      Legal Full Name
                    </Label>
                    <div className="relative group">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-orange-400 transition-colors">
                        <User className="w-4 h-4" />
                      </div>
                      <Input
                        id="fullName"
                        placeholder="John Doe"
                        className="bg-zinc-900/40 border-zinc-800 text-white placeholder:text-zinc-700 h-12 pl-10 focus-visible:ring-orange-500/50"
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
                    <Label htmlFor="email" className="text-zinc-400 text-xs font-bold uppercase tracking-wider">
                      Work Email
                    </Label>
                    <div className="relative group">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-orange-400 transition-colors">
                        <Mail className="w-4 h-4" />
                      </div>
                      <Input
                        id="email"
                        type="email"
                        placeholder="creator@brand.com"
                        className="bg-zinc-900/40 border-zinc-800 text-white placeholder:text-zinc-700 h-12 pl-10 focus-visible:ring-orange-500/50"
                        value={input.email}
                        onChange={(e) => {
                          setInput((prev) => ({ ...prev, email: e.target.value.trim() }));
                          setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                      />
                    </div>
                    {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email}</p>}
                  </div>

                  <Button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full bg-linear-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold h-12 rounded-xl"
                  >
                    Continue <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </motion.div>
              ) : (
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
              )}
            </AnimatePresence>
          </form>

          <div className="mt-10 pt-6 border-t border-zinc-900 text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-zinc-500 text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> INSTANT ACTIVATION
              <span className="mx-1">•</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> SECURE BANKING
            </div>
            <p className="text-sm text-zinc-500">
              Already have a creator account?{' '}
              <Link href="/" className="text-orange-400 font-bold hover:text-orange-300 transition-colors">
                Studio Login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>

      <p className="mt-6 text-center text-[10px] text-zinc-600 uppercase tracking-widest font-bold">
        Protected by enterprise-grade 256-bit encryption
      </p>
    </div>
  );
}
