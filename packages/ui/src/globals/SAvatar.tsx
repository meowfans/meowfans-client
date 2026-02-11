'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import React from 'react';

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  url?: string | null;
  className?: string;
  fallback?: string;
}

export const SAvatar: React.FC<Props> = ({ url, fallback, className, ...props }) => {
  return (
    <Avatar className={className} {...props}>
      <AvatarImage src={url || 'https://github.com/evilrabbit.png'} alt={fallback || '@evilrabbit'} />
      <AvatarFallback>{fallback || 'MW'}</AvatarFallback>
    </Avatar>
  );
};
