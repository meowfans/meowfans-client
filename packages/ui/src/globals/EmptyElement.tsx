'use client';

import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@workspace/ui/components/empty';
import { Cherry } from 'lucide-react';

interface EmptyProps {
  title?: string;
  description?: string;
}

export function EmptyElement({ description = "Looks like it's empty here", title = 'No contents' }: EmptyProps) {
  return (
    <div className="w-full flex items-center content-center justify-center">
      <Empty className="from-muted/50 to-background bg-linear-to-b from-30%">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Cherry />
          </EmptyMedia>
          <EmptyTitle>{title}</EmptyTitle>
          <EmptyDescription>{description}</EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
