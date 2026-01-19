import React from 'react';
import { cn } from '../lib/utils';

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const PageManager: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <main className={cn('w-full p-0.5 mb-16 md:mb-0', className)} {...props}>
      {children}
    </main>
  );
};
