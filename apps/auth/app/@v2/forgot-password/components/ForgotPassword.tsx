import { useAuthActions } from '@workspace/gql/actions/auth.actions';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useSuccessHandler } from '@workspace/ui/hooks/useSuccessHandler';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Loader2Icon, Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export const ForgotPassword = () => {
  const router = useRouter();
  const [otp, setOtp] = useState<string>('');
  const { errorHandler } = useErrorHandler();
  const { successHandler } = useSuccessHandler();
  const [email, setEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const { forgotAndResetPasswordMutation, validateOtpMutation, generateOtpMutation } = useAuthActions();
  const [errors, setErrors] = useState<{ email?: string; password?: string; otp?: string }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<'EMAIL' | 'VERIFY'>('EMAIL');

  const handleResendOtp = async () => {
    try {
      await generateOtpMutation(email);
      successHandler({ message: 'Verification code resent' });
    } catch (error) {
      errorHandler({ error });
    }
  };

  const handleVerify = async () => {
    if (!otp) {
      setErrors((prev) => ({ ...prev, otp: 'Please enter verification code' }));
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setErrors((prev) => ({ ...prev, password: 'Password must be at least 6 characters' }));
      return;
    }

    setLoading(true);
    try {
      const { data: validData } = await validateOtpMutation({ email, otp });

      if (validData?.validateOtp) {
        const { data } = await forgotAndResetPasswordMutation({ email, password: newPassword });
        if (data?.forgotAndResetPassword) {
          successHandler({ message: 'Password reset successfully' });
          return router.push('/');
        }
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
    if (!email) {
      setErrors((prev) => ({ ...prev, email: 'Email is required' }));
      return;
    }

    setLoading(true);
    try {
      await generateOtpMutation(email);
      successHandler({ message: 'Verification code sent to your email' });
      setStep('VERIFY');
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="border-zinc-800 bg-black/40 backdrop-blur-3xl shadow-2xl shadow-indigo-500/10 border-t-indigo-500/20 overflow-hidden">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {step === 'EMAIL' ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="text-center space-y-2 mb-6">
                    <h3 className="text-2xl font-black text-white tracking-tight">RESET PASSWORD</h3>
                    <p className="text-sm text-zinc-400 font-medium">Enter your email to receive a verification code</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="forgot-email" className="text-zinc-400 text-xs font-bold uppercase tracking-wider">
                      Email Address
                    </Label>
                    <div className="relative group">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-400 transition-colors">
                        <Mail className="w-4 h-4" />
                      </div>
                      <Input
                        id="forgot-email"
                        type="email"
                        placeholder="you@example.com"
                        className="bg-zinc-900/40 border-zinc-800 text-white placeholder:text-zinc-700 h-12 pl-10 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500/50 transition-all font-medium"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value.trim());
                          setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                      />
                    </div>
                    {errors.email && <p className="text-xs text-red-500 font-bold">{errors.email}</p>}
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
                        Send Verification Code <ArrowRight className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    asChild
                    className="w-full text-zinc-500 hover:text-white hover:bg-zinc-900/50 font-medium h-12 rounded-xl"
                  >
                    <Link href={'/'}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Login
                    </Link>
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
                  <div className="text-center space-y-2 mb-6">
                    <div className="mx-auto w-14 h-14 bg-indigo-500/10 rounded-full flex items-center justify-center mb-4 border border-indigo-500/20">
                      <Mail className="w-6 h-6 text-indigo-400" />
                    </div>
                    <h3 className="text-2xl font-black text-white tracking-tight">CHECK YOUR EMAIL</h3>
                    <p className="text-sm text-zinc-400">
                      We sent a code to <span className="text-white font-bold">{email}</span>
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="otp-input" className="text-zinc-400 text-xs font-bold uppercase tracking-wider">
                      Verification Code
                    </Label>
                    <Input
                      id="otp-input"
                      placeholder="000000"
                      className="bg-zinc-900/40 border-zinc-800 text-white placeholder:text-zinc-700 h-12 text-center text-lg tracking-[0.5em] font-bold focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500/50 transition-all"
                      value={otp}
                      onChange={(e) => {
                        setOtp(e.target.value);
                        setErrors((prev) => ({ ...prev, otp: undefined }));
                      }}
                      maxLength={6}
                      autoFocus
                    />
                    {errors.otp && <p className="text-xs text-red-500 font-bold">{errors.otp}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-password" className="text-zinc-400 text-xs font-bold uppercase tracking-wider">
                      New Password
                    </Label>
                    <div className="relative group">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-400 transition-colors">
                        <Lock className="w-4 h-4" />
                      </div>
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="••••••••"
                        className="bg-zinc-900/40 border-zinc-800 text-white placeholder:text-zinc-700 h-12 pl-10 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500/50 transition-all"
                        value={newPassword}
                        onChange={(e) => {
                          setNewPassword(e.target.value.trim());
                          setErrors((prev) => ({ ...prev, password: undefined }));
                        }}
                      />
                    </div>
                    {errors.password && <p className="text-xs text-red-500 font-bold">{errors.password}</p>}
                  </div>

                  <Button
                    type="button"
                    className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold h-12 rounded-xl transition-all duration-300 shadow-xl shadow-indigo-600/20 active:scale-[0.98] disabled:opacity-70"
                    disabled={loading}
                    onClick={handleVerify}
                  >
                    {loading ? (
                      <Loader2Icon className="h-5 w-5 animate-spin" />
                    ) : (
                      <span className="flex items-center gap-2">
                        Reset & Login <ArrowRight className="w-4 h-4" />
                      </span>
                    )}
                  </Button>

                  <div className="flex flex-col items-center gap-3 mt-2">
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={loading}
                      className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-wider"
                    >
                      Resend Verification Code
                    </button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-zinc-500 hover:text-white h-8 text-xs"
                      onClick={() => setStep('EMAIL')}
                    >
                      Change Email Address
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </CardContent>
      </Card>

      {/* Footer Decoration */}
      <div className="mt-8 flex justify-center gap-8 opacity-20 grayscale hover:grayscale-0 transition-all duration-700">
        <div className="h-1 w-12 bg-indigo-500 rounded-full" />
        <div className="h-1 w-12 bg-purple-500 rounded-full" />
        <div className="h-1 w-12 bg-pink-500 rounded-full" />
      </div>
    </div>
  );
};
