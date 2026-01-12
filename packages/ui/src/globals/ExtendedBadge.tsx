'use client';

import { LucideIcon } from 'lucide-react';
import { Badge, ReactBadgeProps } from '../components/badge';
import { cn } from '../lib/utils';

interface ExtendedBadgeProps extends ReactBadgeProps {
  iconClassName?: string;
  Icon: LucideIcon;
  label?: string | number;
}

export const ExtendedBadge = ({ iconClassName, Icon, label, ...props }: ExtendedBadgeProps) => {
  return (
    <Badge {...props}>
      {Icon && (
        <div className={cn('rounded-lg', iconClassName)}>
          <Icon className="h-3 w-3" />
        </div>
      )}
      {label}
    </Badge>
  );
};
