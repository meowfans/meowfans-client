import { cn } from '@workspace/ui/lib/utils';
import * as React from 'react';

export function Logo({ className, ...props }: React.ComponentProps<'svg'>) {
  const g1 = `g1-left-vertical`;
  const g2 = `g2-left-diagonal`;
  const g3 = `g3-right-diagonal`;
  const g4 = `g4-right-vertical`;

  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn('h-10 w-10', className)} {...props}>
      <defs>
        {/* Left vertical */}
        <linearGradient id={g1} gradientUnits="userSpaceOnUse" x1="18" y1="20" x2="18" y2="80">
          <stop offset="0%" stopColor={'#FF3131'} />
          <stop offset="100%" stopColor={'#FF914D'} />
        </linearGradient>

        {/* Left diagonal */}
        <linearGradient id={g2} gradientUnits="userSpaceOnUse" x1="18" y1="35" x2="50" y2="65">
          <stop offset="0%" stopColor={'#f97316'} />
          <stop offset="100%" stopColor={'#fbbf24'} />
        </linearGradient>

        {/* Right diagonal */}
        <linearGradient id={g3} gradientUnits="userSpaceOnUse" x1="50" y1="65" x2="82" y2="35">
          <stop offset="0%" stopColor={'#FF3131'} />
          <stop offset="100%" stopColor={'#FF914D'} />
        </linearGradient>

        {/* Right vertical */}
        <linearGradient id={g4} gradientUnits="userSpaceOnUse" x1="82" y1="20" x2="82" y2="80">
          <stop offset="0%" stopColor={'#f97316'} />
          <stop offset="100%" stopColor={'#fbbf24'} />
        </linearGradient>
      </defs>

      {/* Left Vertical */}
      <path d="M18 80 V 35" stroke={`url(#${g1})`} strokeWidth="12" strokeLinecap="round" />

      {/* Left Diagonal */}
      <path d="M18 35 L 50 65" stroke={`url(#${g2})`} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />

      {/* Right Diagonal */}
      <path d="M50 65 L 82 35" stroke={`url(#${g3})`} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />

      {/* Right Vertical */}
      <path d="M82 35 V 80" stroke={`url(#${g4})`} strokeWidth="12" strokeLinecap="round" />

      {/* LEFT TICK */}
      <path d="M18 35 L 18 20 L 40 35" stroke={`url(#${g1})`} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />

      {/* RIGHT TICK */}
      <path d="M82 35 L 82 20 L 60 35" stroke={`url(#${g4})`} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
