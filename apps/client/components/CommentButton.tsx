import type { ButtonProps } from '@workspace/ui/lib';
import { MessageCircle } from 'lucide-react';
import { AuthAwareButton } from './AuthAwareButton';

interface CommentButtonProps<T> extends ButtonProps {
  titleEnabled?: boolean;
}

export const CommentButton = <T,>({
  titleEnabled,
  variant = 'secondary',
  size = 'sm',
  title = 'Comment',
  className = 'hover:text-blue-400 rounded-xl transition pointer-events-auto',
  ...props
}: CommentButtonProps<T>) => {
  return (
    <AuthAwareButton className={className} variant={variant} size={size} title={title} {...props}>
      <MessageCircle className="w-4 h-4" />
      {titleEnabled && <span>Comment</span>}
    </AuthAwareButton>
  );
};
