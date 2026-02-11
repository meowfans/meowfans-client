'use client';

import { configService } from '@/util/config';
import { Button } from '@workspace/ui/components/button';
import { WarpBackground } from '@workspace/ui/components/shadcn-io/warp-background';
import { AnimatedLogo } from '@workspace/ui/globals/AnimatedLogo';
import { buildSafeUrl } from '@workspace/ui/lib/helpers';
import { motion } from 'framer-motion';
import { ArrowLeft, LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const NoProfile = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push(buildSafeUrl({ host: configService.NEXT_PUBLIC_AUTH_URL, pathname: '/login' }));
  };

  const handleGoBack = () => {
    router.push('/');
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-background">
      <WarpBackground className="max-w-md w-full p-0 overflow-hidden border-none bg-transparent">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 p-8 md:p-12 flex flex-col items-center text-center space-y-8 backdrop-blur-xl bg-card/30 rounded-3xl border border-border/50 shadow-2xl"
        >
          <motion.div variants={itemVariants} className="w-24 h-24 mb-2">
            <AnimatedLogo />
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Welcome Back</h1>
            <p className="text-muted-foreground text-lg max-w-[280px] mx-auto leading-relaxed">
              Please sign in to access your profile and personalized experience.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col w-full gap-4">
            <Button
              size="lg"
              className="w-full h-14 text-lg font-semibold rounded-2xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
              onClick={handleLogin}
            >
              <LogIn className="mr-2 h-5 w-5" />
              Sign In Now
            </Button>

            <Button
              variant="ghost"
              size="lg"
              className="w-full h-12 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-xl transition-all"
              onClick={handleGoBack}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Button>
          </motion.div>

          <motion.div variants={itemVariants} className="pt-4 border-t border-border/20 w-full flex justify-center gap-6">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-primary">2.5M+</span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Assets</span>
            </div>
            <div className="w-[1px] bg-border/20 h-10" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-primary">4.9/5</span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Rating</span>
            </div>
          </motion.div>
        </motion.div>
      </WarpBackground>
    </div>
  );
};
