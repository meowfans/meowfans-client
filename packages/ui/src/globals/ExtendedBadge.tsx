'use client';

import { LucideIcon } from 'lucide-react';
import { Badge, ReactBadgeProps } from '../components/badge';
import { cn } from '../lib/utils';

interface ExtendedBadgeProps extends ReactBadgeProps {
  iconClassName?: string;
  Icon?: LucideIcon;
  label?: string | number;
}

/**
 * @param iconClassName is for the className wrapper of icon
 * @param Icon is for providing the icon
 * @param label is for the text inside the badge
 */
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
