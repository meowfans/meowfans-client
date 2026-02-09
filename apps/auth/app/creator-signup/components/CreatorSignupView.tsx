'use client';

import { AuthLayout } from '@/components/AuthLayout';
import { CreatorAuthForm } from './CreatorAuthForm';

export function CreatorSignupView() {
  return (
    <AuthLayout
      title="Create a creator account"
      description="Enter your details below to create your creator account"
      quote="Empowering creators to own their content, engage their fans, and monetize their passion directly."
      quoteAuthor="MeowFans Team"
      backButtonLabel="Login"
      backButtonHref="/login"
    >
      <CreatorAuthForm />
    </AuthLayout>
  );
}
