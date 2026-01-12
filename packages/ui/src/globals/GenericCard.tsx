'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { cn } from '@workspace/ui/lib/utils';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import React from 'react';

type CardVariant = 'default' | 'danger' | 'custom';

interface GenericCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  iconClassName?: string;
  headerExtra?: React.ReactNode;
  variant?: CardVariant;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  animationDelay?: number;
  children: React.ReactNode;
  footerClassName?: string;
  footer?: React.ReactNode;
}

const VARIANT_STYLES: Record<CardVariant, string> = {
  default: 'border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300',
  danger: 'border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-950/10 shadow-sm hover:shadow-md transition-shadow duration-300',
  custom: ''
};

export const GenericCard: React.FC<GenericCardProps> = ({
  title,
  description,
  icon: Icon,
  iconClassName,
  headerExtra,
  variant = 'default',
  className,
  headerClassName,
  contentClassName,
  animationDelay = 0.2,
  children,
  footerClassName,
  footer
}) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: animationDelay }}>
      <Card className={cn(VARIANT_STYLES[variant], className)}>
        <CardHeader className={cn('space-y-2', headerClassName)}>
          <div className="flex items-start gap-3">
            {Icon && (
              <div className={cn('p-2 rounded-lg', iconClassName)}>
                <Icon className="h-5 w-5" />
              </div>
            )}

            <div className="flex-1 space-y-1">
              <CardTitle className="text-xl">{title}</CardTitle>
              {description && <CardDescription>{description}</CardDescription>}
            </div>

            {headerExtra}
          </div>
        </CardHeader>

        <CardContent className={cn('space-y-6', contentClassName)}>{children}</CardContent>
        {footer && <CardFooter className={footerClassName}>{footer}</CardFooter>}
      </Card>
    </motion.div>
  );
};
