import { Input } from '@workspace/ui/components/input';
import { cn } from '@workspace/ui/lib/utils';
import * as React from 'react';

export function Search({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('', className)} {...props}>
      <Input type="search" placeholder="Search..." className="md:w-[100px] lg:w-[300px]" />
    </div>
  );
}
