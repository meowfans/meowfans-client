'use client';

import { Button } from '@workspace/ui/components/button';
import { ButtonSize, ButtonVariant } from '@workspace/ui/lib/types';
import clsx from 'clsx';
import { Loader2Icon } from 'lucide-react';
import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface LoadingButtonV2Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: ReactNode;
}

export const LoadingButtonV2: React.FC<LoadingButtonV2Props> = ({
  size = 'default',
  variant,
  loading = false,
  children,
  disabled,
  type = 'submit',
  className,
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <Button
      {...props}
      type={type}
      variant={variant}
      size={size}
      disabled={isDisabled}
      aria-busy={loading}
      aria-disabled={isDisabled}
      className={clsx('transition-all duration-300 active:scale-[0.98]', loading && 'pointer-events-none', className)}
    >
      {loading ? <Loader2Icon className="h-5 w-5 animate-spin" /> : children}
    </Button>
  );
};
