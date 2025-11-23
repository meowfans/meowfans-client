'use client';

import type { ButtonProps } from '@workspace/ui/lib';
import { Telescope } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@workspace/ui/components/button';

export const ExploreButton: React.FC<ButtonProps> = ({ variant = 'outline', size = 'sm', title = 'Explore', ...props }) => {
  const router = useRouter();
  return (
    <Button variant={variant} size={size} onClick={() => router.push('/explore')} {...props}>
      <Telescope />
      Explore
    </Button>
  );
};
