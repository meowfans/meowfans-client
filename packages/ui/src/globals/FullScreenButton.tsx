'use client';

import { Button } from '@workspace/ui/components/button';
import { ButtonSize, ButtonVariant, handleFullScreen } from '@workspace/ui/lib';
import { MEOW_FANS_BANNER } from '@workspace/ui/lib/constants';
import { Fullscreen } from 'lucide-react';
import { ButtonHTMLAttributes } from 'react';

export interface FullScreenButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  currentUrl?: string;
  currentIdx: number;
  urls: string[];
  className?: string;
  size?: ButtonSize;
  filetype?: 'img' | 'video';
  variant?: ButtonVariant;
}

export const FullScreenButton: React.FC<FullScreenButtonProps> = ({
  currentIdx,
  currentUrl = MEOW_FANS_BANNER,
  urls,
  className = 'hover:text-red-500 rounded-xl hidden md:flex',
  size = 'icon',
  variant = 'default',
  title = 'Full Screen',
  filetype = 'img',
  ...props
}) => {
  return (
    <Button
      className={className}
      size={size}
      variant={variant}
      title={title}
      onClick={(e) => {
        e.preventDefault();
        handleFullScreen(
          currentUrl,
          currentIdx,
          urls.filter((url): url is string => !!url),
          filetype
        );
      }}
      {...props}
    >
      <Fullscreen />
    </Button>
  );
};
