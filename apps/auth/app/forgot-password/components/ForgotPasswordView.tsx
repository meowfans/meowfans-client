'use client';

import { AuthLayout } from '@/components/AuthLayout';
import Link from 'next/link';
import { ForgotPasswordForm } from './ForgotPasswordForm';

export function ForgotPasswordView() {
  return (
    <AuthLayout
      title="Forgot Password"
      description="Enter your email address and we'll send you a link to reset your password."
      quote="Security is our top priority. We'll help you get back into your account safely."
      quoteAuthor="MeowFans Security Team"
      backButtonLabel="Login"
      backButtonHref="/login"
      showTerms={false}
      customFooter={
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link href="/login" className="underline underline-offset-4 hover:text-primary">
            Back to Login
          </Link>
        </p>
      }
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
