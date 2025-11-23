import { Button } from '@workspace/ui/components/button';
import { useIsMobile } from '@/hooks/useIsMobile';
import type { ButtonSize, ButtonVariant } from '@workspace/ui/lib';
import { ArrowBigLeftDash } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  className?: string;
  applyReturn?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const ReturnToPreviousPage: React.FC<Props> = ({ className, applyReturn, size = 'sm', variant = 'outline' }) => {
  const router = useRouter();
  const isMobile = useIsMobile();

  if (!isMobile && !applyReturn) return null;
  return (
    <Button variant={variant} size={size} onClick={() => router.back()} className={className}>
      <ArrowBigLeftDash />
    </Button>
  );
};
