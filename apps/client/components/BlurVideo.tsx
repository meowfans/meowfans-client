'use client';

import { useContentBlur } from '@/hooks/useContentBlur';
import { cn } from '@workspace/ui/lib/utils';
import { Eye } from 'lucide-react';
import React, { forwardRef, useState } from 'react';
import { ContentSafetyDialog } from './ContentSafetyDialog';

interface BlurVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  blur?: boolean;
}

/**
 * A custom video component that applies a blur effect based on user settings.
 */
export const BlurVideo = forwardRef<HTMLVideoElement, BlurVideoProps>(({ src, className, blur, ...props }, ref) => {
  const { isBlurEnabled } = useContentBlur();
  const [showDialog, setShowDialog] = useState(false);

  const shouldBlur = blur !== undefined ? blur : isBlurEnabled;

  return (
    <>
      <div className={cn('relative overflow-hidden w-full h-full', className)}>
        <video
          ref={ref}
          src={src}
          className={cn(
            'transition-all duration-500 w-full h-full object-cover',
            shouldBlur && 'blur-2xl scale-110 saturate-50 brightness-75'
          )}
          {...props}
        />

        {shouldBlur && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/10 backdrop-blur-[2px] transition-all duration-300 group cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowDialog(true);
            }}
          >
            <div className="h-12 w-12 rounded-full bg-black/40 border border-white/20 backdrop-blur-md flex items-center justify-center hover:bg-black/60 transition-transform hover:scale-110 active:scale-95 group/btn">
              <Eye className="h-5 w-5 text-white/90 group-hover/btn:text-white" />
            </div>
            <p className="mt-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/80 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 text-center px-4">
              Sensitive Content
            </p>
          </div>
        )}
      </div>

      <ContentSafetyDialog open={showDialog} onOpenChange={setShowDialog} />
    </>
  );
});

BlurVideo.displayName = 'BlurVideo';
