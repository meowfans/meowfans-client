'use client';

import { AuthLayout } from '@/components/AuthLayout';
import { UserAuthForm } from '@/components/UserAuthForm';

export function LoginView() {
  return (
    <AuthLayout
      title="Login to your account"
      description="Enter your email below to login"
      quote="Your gateway to exclusive interactions and premium content from the creators you admire."
      quoteAuthor="MeowFans Team"
      backButtonLabel="Sign Up"
      backButtonHref="/signup"
    >
      <UserAuthForm mode="login" />
      <div className="text-center pt-4">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-2">Are you a creator?</p>
        <a
          href="/creator-signup"
          className="text-[11px] font-black uppercase tracking-widest text-primary hover:text-primary/80 transition-colors"
        >
          Join the spotlight →
        </a>
      </div>
    </AuthLayout>
  );
}
