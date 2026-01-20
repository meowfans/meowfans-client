'use client';

import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@workspace/ui/components/empty';
import { Cherry } from 'lucide-react';

interface EmptyProps {
  title?: string;
  description?: string;
}

export function EmptyElement({ title = 'No contents', description = "Looks like it's empty here" }: EmptyProps) {
  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center">
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
