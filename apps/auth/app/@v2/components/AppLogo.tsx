'use client';

import { cn } from '@workspace/ui/lib/utils';
import { motion } from 'framer-motion';

interface AppLogoProps {
  className?: string;
  variant?: 'default' | 'creator';
  size?: number;
}

export function AppLogo({ className, variant = 'default', size = 40 }: AppLogoProps) {
  const isCreator = variant === 'creator';

  // Gradients matching the platform themes
  const gradientId = isCreator ? 'logo-gradient-creator' : 'logo-gradient-default';
  const startColor = isCreator ? '#f97316' : '#6366f1'; // Orange-500 : Indigo-500
  const endColor = isCreator ? '#fbbf24' : '#d946ef'; // Amber-400 : Fuchsia-500

  return (
    <div className={cn('relative flex items-center justify-center', className)} style={{ width: size, height: size }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={startColor} />
            <stop offset="100%" stopColor={endColor} />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Abstract "M" / Cat shape constructed from geometric primitives */}
        <motion.g
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        >
          {/* Left Ear / M stroke */}
          <path
            d="M20 70 V 35 L 50 65 L 80 35 V 70"
            stroke={`url(#${gradientId})`}
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Cat Ears accent - overlaid on top points of M */}
          <path
            d="M20 35 L 20 20 L 40 35"
            stroke={`url(#${gradientId})`}
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-80"
          />
          <path
            d="M80 35 L 80 20 L 60 35"
            stroke={`url(#${gradientId})`}
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-80"
          />
        </motion.g>

        {/* Center dot/nose */}
        <motion.circle
          cx="50"
          cy="50"
          r="4"
          fill="white"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: 'spring' }}
        />
      </svg>
    </div>
  );
}
