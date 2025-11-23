'use client';

import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@workspace/ui/components/empty';
import { Cherry } from 'lucide-react';

export function EmptyElement() {
  return (
    <div className="w-full flex items-center content-center justify-center">
      <Empty className="from-muted/50 to-background bg-gradient-to-b from-30%">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Cherry />
          </EmptyMedia>
          <EmptyTitle>No contents</EmptyTitle>
          <EmptyDescription>Looks like it&apos;s empty here</EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
