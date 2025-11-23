'use client';

import { useFan } from '@/hooks/context/UserContextWrapper';
import type { ButtonProps } from '@workspace/ui/lib';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AuthAwareButton } from './AuthAwareButton';

interface LikeButtonProps extends ButtonProps {
  isLiked: boolean;
  onLikeDisLike?: () => unknown;
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  isLiked,
  onLikeDisLike,
  variant = 'secondary',
  size = 'icon',
  title = 'Like',
  className
}) => {
  const [liked, setLiked] = useState<boolean>(isLiked);
  useEffect(() => setLiked(isLiked), [isLiked]);
  const { fan } = useFan();

  return liked && fan ? (
    <AuthAwareButton
      variant={variant}
      onClick={() => {
        onLikeDisLike?.();
        setLiked(false);
      }}
      title={title}
      size={size}
      className={className}
    >
      <Heart className="fill-red-600" />
    </AuthAwareButton>
  ) : (
    <AuthAwareButton
      size={size}
      variant={variant}
      onClick={() => {
        onLikeDisLike?.();
        setLiked(true);
      }}
      title={title}
      className={className}
    >
      <Heart />
    </AuthAwareButton>
  );
};
