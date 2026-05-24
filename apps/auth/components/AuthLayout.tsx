'use client';

import { AuthVisual } from '@/components/AuthVisual';
import { AppConfig } from '@/lib/app.config';
import { configService } from '@/util/config';
import { buttonVariants } from '@workspace/ui/components/button';
import { ApplyTheme } from '@workspace/ui/globals/ApplyTheme';
import { Logo } from '@workspace/ui/globals/Logo';
import { buildSafeUrl } from '@workspace/ui/lib/helpers';
import { cn } from '@workspace/ui/lib/utils';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  quote?: string;
  quoteAuthor?: string;
  backButtonLabel: string;
  backButtonHref: string;
  showTerms?: boolean;
  customFooter?: React.ReactNode;
}

export function AuthLayout({
  children,
  title,
  description,
  quote,
  quoteAuthor,
  backButtonLabel,
  backButtonHref,
  showTerms = true,
  customFooter
}: AuthLayoutProps) {
  return (
    <div
      id="auth-layout"
      className="container relative min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
    >
      {/* Top Navigation */}
      <div className="fixed lg:absolute right-4 top-4 md:right-8 md:top-8 z-50 flex items-center gap-2 sm:gap-4">
        <div className="backdrop-blur-lg rounded-full border border-white/10 p-1 flex items-center gap-1">
          <ApplyTheme />
        </div>
        <Link
          href={backButtonHref}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] border border-white/10 backdrop-blur-md rounded-full px-5 sm:px-6 hover:bg-white/10 transition-all h-9 sm:h-10'
          )}
        >
          {backButtonLabel}
        </Link>
      </div>

      {/* Left Panel (Desktop) */}
      <div className="relative hidden h-full flex-col p-12 lg:flex overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full" />
          <div className="absolute bottom-0 right-0 w-full h-full" />
          <div className="absolute inset-0 opacity-[0.02]" />
        </div>

        <div className="relative z-20 flex items-center gap-3">
          <Logo className="h-8 w-8" aria-label='desktop_logo' />
          <span className="text-xl font-black italic uppercase tracking-tighter">{AppConfig.applicationName}</span>
        </div>

        <div className="relative z-20 flex flex-1 items-center justify-center py-20">
          <AuthVisual />
        </div>

        <div className="relative z-20">
          {quote && (
            <div className="space-y-6 max-w-lg">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-1 w-12 bg-primary/50 rounded-full"
              />
              <blockquote className="space-y-4">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-2xl italic uppercase tracking-tight leading-[0.9]"
                >
                  &ldquo;{quote}&rdquo;
                </motion.p>
                {quoteAuthor && (
                  <motion.footer
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-primary"
                  >
                    <span className="h-px w-6 bg-primary/30" />
                    {quoteAuthor}
                  </motion.footer>
                )}
              </blockquote>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel (Content) */}
      <div className="flex min-h-screen items-start lg:items-center justify-center lg:p-8 bg-background relative overflow-hidden pt-32 lg:pt-8">
        {/* Decorative Background for Content Area */}
        <div className="absolute top-0 right-0 w-full h-full" />
        <div className="absolute bottom-0 left-0 w-full h-full" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-100 p-8 sm:p-0 z-10"
        >
          <div className="flex flex-col space-y-6 text-center">
            {/* Logo visible on mobile/tablet */}
            <div className="flex justify-center mb-4 lg:hidden">
              <div className="relative group">
                {/* Glow effect for logo */}
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-40" />
                <div className="relative p-5 rounded-4xl border border-white/10 shadow-2xl">
                  <Logo className="h-12 w-12" aria-label='mobile_logo' />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl italic uppercase tracking-tighter leading-tight text-foreground">{title}</h1>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60">{description}</p>
            </div>
          </div>

          <div className="relative group">
            {/* Subtle card-like container effect for the form if needed */}
            <div className="space-y-6">{children}</div>
          </div>

          {customFooter ? (
            customFooter
          ) : showTerms ? (
            <p className="px-8 text-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40 leading-relaxed">
              By continued access, you agree to our{' '}
              <Link
                target="_blank"
                href={buildSafeUrl({ host: configService.NEXT_PUBLIC_FAN_URL, pathname: '/legal/terms' })}
                className="text-primary/60 hover:text-primary transition-colors underline-offset-4 decoration-primary/20 hover:decoration-primary underline"
              >
                Terms of Service
              </Link>{' '}
              &{' '}
              <Link
                target="_blank"
                href={buildSafeUrl({ host: configService.NEXT_PUBLIC_FAN_URL, pathname: '/legal/privacy' })}
                className="text-primary/60 hover:text-primary transition-colors underline-offset-4 decoration-primary/20 hover:decoration-primary underline"
              >
                Privacy Policy
              </Link>
            </p>
          ) : null}
        </motion.div>
      </div>
    </div>
  );
}
