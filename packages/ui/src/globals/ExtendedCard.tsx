'use client';

import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { cn } from '@workspace/ui/lib/utils';
import { LucideIcon } from 'lucide-react';
import React from 'react';
import { useBackground } from '../hooks/useBackground';

interface ExtendedCardProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string;
  description?: string;
  icon?: LucideIcon;
  iconClassName?: string;
  headerExtra?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  children?: React.ReactNode;
  footerClassName?: string;
  footer?: React.ReactNode;
  titleClassName?: string;
  descriptionClassName?: string;
  actionClassName?: string;
  action?: React.ReactNode;
}

export const ExtendedCard: React.FC<ExtendedCardProps> = ({
  title,
  description,
  icon: Icon,
  iconClassName,
  headerExtra,
  className,
  headerClassName,
  contentClassName,
  children,
  footerClassName,
  titleClassName,
  footer,
  descriptionClassName,
  action,
  actionClassName,
  ...props
}) => {
  const { bgColor } = useBackground();
  return (
    <Card className={cn(className, bgColor)} {...props}>
      <CardHeader className={headerClassName}>
        {Icon && (
          <div className={cn('p-2 rounded-lg', iconClassName)}>
            <Icon className="h-5 w-5" />
          </div>
        )}
        {headerExtra}
        <CardTitle className={titleClassName}>{title}</CardTitle>
        <CardDescription className={descriptionClassName}>{description}</CardDescription>
        {action && <CardAction className={actionClassName}>{action}</CardAction>}
      </CardHeader>
      {children && <CardContent className={contentClassName}>{children}</CardContent>}
      {footer && <CardFooter className={footerClassName}>{footer}</CardFooter>}
    </Card>
  );
};
