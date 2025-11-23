'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';

interface Props {
  url?: string | null;
  className?: string;
  fallback?: string;
  onClick?: () => unknown;
}

export const SAvatar: React.FC<Props> = ({ url, fallback, className, onClick }) => {
  return (
    <Avatar className={className} onClick={onClick}>
      <AvatarImage src={url || 'https://github.com/evilrabbit.png'} alt={fallback || '@evilrabbit'} />
      <AvatarFallback>{fallback || 'MW'}</AvatarFallback>
    </Avatar>
  );
};
