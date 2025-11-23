'use client';

import { redirectToAuthApp } from '@/util/helpers';
import { Button } from '@workspace/ui/components/button';
import type { ButtonProps } from '@workspace/ui/lib';
import { UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const SignUpButton: React.FC<ButtonProps> = ({ variant = 'outline', size = 'sm', title = 'Login', ...props }) => {
  const router = useRouter();
  return (
    <Button variant={variant} size={size} onClick={() => router.push(redirectToAuthApp({ pathname: '/signup' }))} {...props}>
      <UserPlus />
      Signup
    </Button>
  );
};
