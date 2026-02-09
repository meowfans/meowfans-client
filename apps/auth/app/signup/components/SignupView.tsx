'use client';

import { AuthLayout } from '@/components/AuthLayout';
import { UserAuthForm } from '@/components/UserAuthForm';

export function SignupView() {
  return (
    <AuthLayout
      title="Create an account"
      description="Enter your email below to create your account"
      quote="Discover a world of exclusive content and connect with your favorite creators like never before."
      quoteAuthor="MeowFans Team"
      backButtonLabel="Login"
      backButtonHref="/login"
    >
      <UserAuthForm mode="signup" />
      <div className="text-center pt-4">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-2">Want to become a creator?</p>
        <a
          href="/creator-signup"
          className="text-[11px] font-black uppercase tracking-widest text-primary hover:text-primary/80 transition-colors"
        >
          Start your journey here →
        </a>
      </div>
    </AuthLayout>
  );
}
