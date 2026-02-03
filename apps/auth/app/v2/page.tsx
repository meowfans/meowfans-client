'use client';

import useAPI from '@/hooks/useAPI';
import { configService } from '@/util/config';
import { buildSafeUrl } from '@/util/helpers';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { Vortex } from '@workspace/ui/components/shadcn-io/vortex';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { AuthUserRoles, LoginInput, SignupInput } from '@workspace/ui/lib/enums';
import { isValidEmail, isValidPassword } from '@workspace/ui/lib/validators';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRightIcon, Loader2Icon, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

export default function AuthV2Page() {
  const router = useRouter();
  const { errorHandler } = useErrorHandler();
  const { login, signup } = useAPI();
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('login');

  // Input States
  const [loginInput, setLoginInput] = useState<LoginInput>({ email: '', password: '' });
  const [signupInput, setSignupInput] = useState<SignupInput>({ email: '', fullName: '', password: '' });

  // Error States
  const [loginErrors, setLoginErrors] = useState<{ email?: string; password?: string }>({});
  const [signupErrors, setSignupErrors] = useState<Partial<Record<keyof SignupInput, string>>>({});

  const redirectUrlMap = {
    [AuthUserRoles.CREATOR]: buildSafeUrl({ host: configService.NEXT_PUBLIC_CREATOR_URL, pathname: '/studio' }),
    [AuthUserRoles.ADMIN]: buildSafeUrl({ host: configService.NEXT_PUBLIC_ADMIN_URL, pathname: '/home' }),
    [AuthUserRoles.FAN]: buildSafeUrl({ host: configService.NEXT_PUBLIC_FAN_URL, pathname: '/dashboard' }),
    [AuthUserRoles.SUPER_VIEWER]: buildSafeUrl({ host: configService.NEXT_PUBLIC_FAN_URL, pathname: '/dashboard' })
  };

  const validateLogin = (): boolean => {
    const newErrors: typeof loginErrors = {};
    if (!isValidEmail(loginInput.email)) newErrors.email = 'Invalid email format';
    if (!isValidPassword(loginInput.password)) newErrors.password = 'Password must be at least 6 characters';
    setLoginErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignup = (): boolean => {
    const newErrors: Partial<Record<keyof SignupInput, string>> = {};
    if (!signupInput.fullName) newErrors.fullName = 'Full name is required';
    if (!isValidEmail(signupInput.email)) newErrors.email = 'Invalid email format';
    if (!isValidPassword(signupInput.password)) newErrors.password = 'Password must be at least 6 characters';
    setSignupErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateLogin()) return;
    setLoading(true);

    try {
      const { roles } = await login(loginInput);
      const role = roles?.at(0) as AuthUserRoles;
      toast.success('Logged in successfully');
      return router.push(redirectUrlMap[role] || '/');
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateSignup()) return;
    setLoading(true);

    try {
      await signup(signupInput);
      toast.success('Account created! Logging you in...');
      // Usually signup logs you in or you redirect to login, but based on existing flow it redirects to FAN dashboard
      return router.push(redirectUrlMap[AuthUserRoles.FAN]);
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-black text-white">
      {/* Background Effect */}
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        baseHue={260} // Purple/Blueish hue
        className="h-full w-full overflow-y-auto overflow-x-hidden"
      >
        <div className="z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 place-content-center items-center mx-auto min-h-full px-4 py-12 md:px-10 md:py-4">
          {/* Left Side: Brand / Hero Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col gap-6 text-center md:text-left"
          >
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="h-12 w-12 rounded-xl bg-linear-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Sparkles className="text-white h-6 w-6" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-white to-white/70">
                MeowFans
              </h1>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              A premium space for <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400">
                creators & fans.
              </span>
            </h2>

            <p className="text-lg text-zinc-400 max-w-md mx-auto md:mx-0">
              Join the community redefining connection. Experience exclusive content like never before.
            </p>

            <div className="flex gap-4 justify-center md:justify-start pt-4">
              <div className="flex -space-x-4 rtl:space-x-reverse">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center text-xs text-zinc-500"
                  >
                    User
                  </div>
                ))}
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-sm font-semibold text-white">10k+ Creators</span>
                <span className="text-xs text-zinc-500">Joined this week</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Auth Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="w-full max-w-md mx-auto"
          >
            <Card className="border-zinc-800 bg-black/40 backdrop-blur-xl shadow-2xl shadow-indigo-500/10">
              <CardContent className="p-8">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-8 bg-zinc-900/50 p-1">
                    <TabsTrigger value="login" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white">
                      Login
                    </TabsTrigger>
                    <TabsTrigger value="signup" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white">
                      Sign Up
                    </TabsTrigger>
                  </TabsList>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <TabsContent value="login" className="mt-0">
                        <form onSubmit={handleLogin} className="space-y-5">
                          <div className="space-y-2">
                            <Label htmlFor="login-email" className="text-zinc-300">
                              Email
                            </Label>
                            <Input
                              id="login-email"
                              type="email"
                              placeholder="you@example.com"
                              className="bg-zinc-900/50 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-indigo-500"
                              value={loginInput.email}
                              onChange={(e) => {
                                setLoginInput((prev) => ({ ...prev, email: e.target.value.trim() }));
                                setLoginErrors((prev) => ({ ...prev, email: undefined }));
                              }}
                            />
                            {loginErrors.email && <p className="text-xs text-red-400">{loginErrors.email}</p>}
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="login-password" className="text-zinc-300">
                                Password
                              </Label>
                              <Link href="/forgot-password" className="text-xs text-indigo-400 hover:text-indigo-300">
                                Forgot?
                              </Link>
                            </div>
                            <Input
                              id="login-password"
                              type="password"
                              placeholder="••••••••"
                              className="bg-zinc-900/50 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-indigo-500"
                              value={loginInput.password}
                              onChange={(e) => {
                                setLoginInput((prev) => ({ ...prev, password: e.target.value.trim() }));
                                setLoginErrors((prev) => ({ ...prev, password: undefined }));
                              }}
                            />
                            {loginErrors.password && <p className="text-xs text-red-400">{loginErrors.password}</p>}
                          </div>

                          <Button
                            type="submit"
                            className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white transition-all duration-300 shadow-lg shadow-indigo-600/20"
                            disabled={loading}
                          >
                            {loading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
                            Log In
                          </Button>
                        </form>
                      </TabsContent>

                      <TabsContent value="signup" className="mt-0">
                        <form onSubmit={handleSignup} className="space-y-5">
                          <div className="space-y-2">
                            <Label htmlFor="signup-name" className="text-zinc-300">
                              Full name
                            </Label>
                            <Input
                              id="signup-name"
                              placeholder="John"
                              className="bg-zinc-900/50 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-indigo-500"
                              value={signupInput.fullName}
                              onChange={(e) => {
                                setSignupInput((prev) => ({ ...prev, fullName: e.target.value }));
                                setSignupErrors((prev) => ({ ...prev, fullName: undefined }));
                              }}
                            />
                            {signupErrors.fullName && <p className="text-xs text-red-400">{signupErrors.fullName}</p>}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="signup-email" className="text-zinc-300">
                              Email
                            </Label>
                            <Input
                              id="signup-email"
                              type="email"
                              placeholder="you@example.com"
                              className="bg-zinc-900/50 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-indigo-500"
                              value={signupInput.email}
                              onChange={(e) => {
                                setSignupInput((prev) => ({ ...prev, email: e.target.value.trim() }));
                                setSignupErrors((prev) => ({ ...prev, email: undefined }));
                              }}
                            />
                            {signupErrors.email && <p className="text-xs text-red-400">{signupErrors.email}</p>}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="signup-password" className="text-zinc-300">
                              Password
                            </Label>
                            <Input
                              id="signup-password"
                              type="password"
                              placeholder="Create a password"
                              className="bg-zinc-900/50 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-indigo-500"
                              value={signupInput.password}
                              onChange={(e) => {
                                setSignupInput((prev) => ({ ...prev, password: e.target.value.trim() }));
                                setSignupErrors((prev) => ({ ...prev, password: undefined }));
                              }}
                            />
                            {signupErrors.password && <p className="text-xs text-red-400">{signupErrors.password}</p>}
                          </div>

                          <Button
                            type="submit"
                            className="w-full bg-linear-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white transition-all duration-300 shadow-lg shadow-pink-600/20"
                            disabled={loading}
                          >
                            {loading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
                            Create Account <ArrowRightIcon className="ml-2 h-4 w-4" />
                          </Button>
                        </form>
                      </TabsContent>
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-6 text-center text-sm text-zinc-500">
                    <p>
                      By continuing, you agree to our{' '}
                      <Link href="/terms" className="underline hover:text-zinc-300" target='_blank'>
                        Terms
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="underline hover:text-zinc-300">
                        Privacy Policy
                      </Link>
                      .
                    </p>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Vortex>
    </div>
  );
}
