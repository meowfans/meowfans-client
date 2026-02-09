'use client';

import { useFan } from '@/hooks/context/UserContextWrapper';
import { configService } from '@/util/config';
import { Button } from '@workspace/ui/components/button';
import { buildSafeUrl } from '@workspace/ui/lib/helpers';
import { cn } from '@workspace/ui/lib/utils';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

type ButtonType = typeof Button;
type InteractionButtonProps = React.ComponentProps<ButtonType> & {
  isLoading?: boolean;
  actionName?: string;
  loadingText?: string;
  requireAuth?: boolean;
};

export function InteractionButton({
  children,
  onClick,
  isLoading = false,
  actionName = 'perform this action',
  className,
  disabled,
  loadingText,
  requireAuth = true,
  ...props
}: InteractionButtonProps) {
  const { fan } = useFan();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (requireAuth && !fan) {
      e.preventDefault();
      e.stopPropagation();
      toast.error(`Please login to ${actionName.toLowerCase()}`, {
        description: 'You need a fan account to interact.',
        action: {
          label: 'Login',
          onClick: () => router.push(buildSafeUrl({ host: configService.NEXT_PUBLIC_AUTH_URL, pathname: '/login' }))
        }
      });
      return;
    }

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Button className={cn(className)} disabled={disabled || isLoading} onClick={handleClick} {...props}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText || children}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
