/* eslint-disable @next/next/no-img-element */
'use client';

import { useContentBlur } from '@/hooks/client/useContentBlur';
import { cn } from '@workspace/ui/lib/utils';
import { Eye } from 'lucide-react';
import { useState } from 'react';
import { ContentSafetyDialog } from './ContentSafetyDialog';

interface BlurImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  // Option to manually override the blur behavior
  blur?: boolean;
}

/**
 * A custom image component that applies a blur effect based on the environment and user settings.
 */
export function BlurImage({ src, alt, className, blur, ...props }: BlurImageProps) {
  const { isBlurEnabled } = useContentBlur();
  const [showDialog, setShowDialog] = useState(false);

  // Logic:
  // 1. If 'blur' prop is provided, it handles manual blurring (e.g. dev mode), ignoring global toggle for simplicity if true,
  //    BUT if the user wants to global off, they toggle global.
  //    Actually, strict interpretation: existing 'blur' prop was for dev/manual overrides.
  //    The prompt says "blur should be turned off from clicking... globally".
  //    If 'blur' is TRUE (manual), we might still want to respect it, but typically standard content uses global.
  //    Let's stick to: if global is on, we blur. (Unless manual 'blur' prop overrides to false? The prop is `blur?: boolean`).
  //    Refined logic:
  //    If `blur` is strictly provided as TRUE, it forces blur.
  //    If `blur` is undefined, we fallback to `isBlurEnabled`.
  //    If `blur` is FALSE, we don't blur.

  //    Prompt context: "nope the blur should be turned off from clicking... globally".
  //    So clicking the overlay triggers the global disable modal.

  const shouldBlur = blur !== undefined ? blur : isBlurEnabled;

  return (
    <>
      <div className={cn('relative overflow-hidden', className)}>
        <img
          src={src || '/placeholder-content.png'}
          alt={alt}
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
              // Must stop propagation to prevent parent link clicks or other handlers
              e.preventDefault();
              e.stopPropagation();
              setShowDialog(true);
            }}
          >
            <div className="h-12 w-12 rounded-full bg-black/40 border border-white/20 backdrop-blur-md flex items-center justify-center hover:bg-black/60 transition-transform hover:scale-110 active:scale-95 group/btn">
              <Eye className="h-5 w-5 text-white/90 group-hover/btn:text-white" />
            </div>
            <p className="mt-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/80 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
              Sensitive Content
            </p>
          </div>
        )}
      </div>

      <ContentSafetyDialog open={showDialog} onOpenChange={setShowDialog} />
    </>
  );
}
