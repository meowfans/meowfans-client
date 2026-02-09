import { cn } from '@workspace/ui/lib/utils';
import { LucideIcon } from 'lucide-react';
import React from 'react';

export interface IconLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  icon: LucideIcon;
  label: React.ReactNode;
  iconClassName?: string;
  gap?: string;
}

export function IconLabel({ icon: Icon, label, className, iconClassName, gap = 'gap-2', ...props }: IconLabelProps) {
  return (
    <span className={cn('inline-flex items-center justify-center', gap, className)} {...props}>
      <Icon className={cn('h-4 w-4', iconClassName)} />
      {label}
    </span>
  );
}
