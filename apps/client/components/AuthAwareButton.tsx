'use client';

import { useFan } from '@/hooks/context/UserContextWrapper';
import { Button } from '@workspace/ui/components/button';
import type { ButtonSize, ButtonVariant } from '@workspace/ui/lib';
import type { ButtonHTMLAttributes } from 'react';
import { ClassAttributes } from 'react';
import { toast } from 'sonner';

export interface AuthAwareButtonProps extends ClassAttributes<HTMLButtonElement>, ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  title?: string;
  allowPropagation?: boolean;
}

export const AuthAwareButton = ({
  children,
  variant = 'default',
  size = 'default',
  className = '',
  title = '',
  onClick,
  allowPropagation = false,
  ...props
}: AuthAwareButtonProps) => {
  const { fan } = useFan();

  console.log(fan);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!allowPropagation) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!fan) {
      toast.warning('Signup or login to access seamless benefits', {
        description: 'Create an account on MeowFans or continue with an existing account'
      });
      console.log('toast');
      return;
    }

    if (onClick) onClick(e);
  };

  return (
    <Button {...props} variant={variant} size={size} onClick={handleClick} className={className} title={title}>
      {children}
    </Button>
  );
};
