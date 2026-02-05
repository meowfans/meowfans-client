'use client';

import { configService } from '@/util/config';
import { Card, CardContent } from '@workspace/ui/components/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { buildSafeUrl } from '@workspace/ui/lib/helpers';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

export function AuthCard() {
  const [activeTab, setActiveTab] = useState<string>('login');

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="border-zinc-800 bg-black/40 backdrop-blur-3xl shadow-2xl shadow-indigo-500/10 border-t-indigo-500/20 overflow-hidden">
        <CardContent className="p-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-zinc-900/60 p-1.5 rounded-xl border border-zinc-800/50">
              <TabsTrigger
                value="login"
                className="rounded-lg transition-all data-[state=active]:bg-zinc-800 data-[state=active]:text-white data-[state=active]:shadow-lg"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="rounded-lg transition-all data-[state=active]:bg-zinc-800 data-[state=active]:text-white data-[state=active]:shadow-lg"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              >
                <TabsContent value="login" className="mt-0 focus-visible:outline-none">
                  <LoginForm />
                </TabsContent>

                <TabsContent value="signup" className="mt-0 focus-visible:outline-none">
                  <SignupForm />
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>

          <div className="mt-8 pt-6 border-t border-zinc-900 text-center space-y-4">
            <p className="text-sm text-zinc-500">
              By continuing, you agree to our{' '}
              <Link
                href={buildSafeUrl({ host: configService.NEXT_PUBLIC_APP_URL, pathname: '/terms' })}
                className="text-zinc-400 underline decoration-zinc-800 underline-offset-4 hover:text-white transition-colors"
                target="_blank"
              >
                Terms
              </Link>{' '}
              and{' '}
              <Link
                href={buildSafeUrl({ host: configService.NEXT_PUBLIC_APP_URL, pathname: '/privacy' })}
                className="text-zinc-400 underline decoration-zinc-800 underline-offset-4 hover:text-white transition-colors"
                target="_blank"
              >
                Privacy
              </Link>
              .
            </p>
            <div className="h-px w-full bg-linear-to-r from-transparent via-zinc-800 to-transparent" />
            <p className="text-sm text-zinc-500">
              Are you a creator?{' '}
              <Link href="/creator-signup" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors">
                Join as Creator
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Decorative elements */}
      <div className="mt-8 flex justify-center gap-8 opacity-20 grayscale hover:grayscale-0 transition-all duration-700">
        <div className="h-6 w-20 bg-zinc-700 rounded-full" />
        <div className="h-6 w-20 bg-zinc-700 rounded-full" />
        <div className="h-6 w-20 bg-zinc-700 rounded-full" />
      </div>
    </div>
  );
}
