'use client';

import { Button } from '@workspace/ui/components/button';
import { useIsMobile } from '@workspace/ui/hooks/useIsMobile';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '../lib/utils';

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  className?: string;
  applyReturn?: boolean;
}

export const ReturnToPreviousPage: React.FC<Props> = ({ className, applyReturn }) => {
  const router = useRouter();
  const isMobile = useIsMobile();

  if (!isMobile && !applyReturn) return null;
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => router.back()}
      className={cn('h-9 w-9 cursor-pointer', className)}
      aria-label="Go back"
    >
      <ArrowLeft className="h-5 w-5" />
    </Button>
  );
};
