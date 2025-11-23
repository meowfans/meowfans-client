'use client';

import type { ButtonProps } from '@workspace/ui/lib';
import { redirectToAuthApp } from '@/util/helpers';
import { LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@workspace/ui/components/button';

export const LoginButton: React.FC<ButtonProps> = ({ variant = 'outline', size = 'sm', title = 'Login', ...props }) => {
  const router = useRouter();
  return (
    <Button variant={variant} size={size} onClick={() => router.push(redirectToAuthApp({ pathname: '/login' }))} {...props}>
      <LogIn />
      Login
    </Button>
  );
};
