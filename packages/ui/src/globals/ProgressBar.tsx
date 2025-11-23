'use client';

import { Progress as ProgressPrimitive } from 'radix-ui';
import * as React from 'react';

interface ProgressBarProps {
  isLoading: boolean;
}

export default function ProgressBar({ isLoading }: ProgressBarProps) {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isLoading) {
      setProgress(13);
      timer = setTimeout(() => setProgress(66), 300);
    } else {
      timer = setTimeout(() => setProgress(100), 300);
    }
    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <div className="w-[100%]">
      <style>
        {`@keyframes progress {
            to {
              left: calc(100% - 2rem);
            }
          }
          .progress {
            transform-origin: center;
            animation: progress 1.25s ease-in-out infinite;
          }
          `}
      </style>
      <ProgressPrimitive.Root className="relative h-2 w-full overflow-hidden rounded-full bg-primary/20">
        <ProgressPrimitive.Indicator
          className="relative h-full w-full flex-1 bg-primary transition-all"
          style={{ transform: `translateX(-${100 - (progress || 0)}%)` }}
        >
          <div className="absolute left-0 w-6 h-full bg-primary-foreground blur-[10px] inset-y-0 progress" />
        </ProgressPrimitive.Indicator>
      </ProgressPrimitive.Root>
    </div>
  );
}
