'use client';

import { Button } from '@workspace/ui/components/button';
import { AnimatePresence } from 'framer-motion';
import { Maximize2 } from 'lucide-react';
import { ButtonHTMLAttributes, useState } from 'react';
import { FullscreenViewer } from './FullscreenViewer';

export interface FullScreenButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  currentIdx: number;
  urls: string[];
  className?: string;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  setCurrentlyViewingIndex: React.Dispatch<React.SetStateAction<number>>;
  loadMore?: () => void;
  hasMore?: boolean;
  loading?: boolean;
}

export const FullScreenButton: React.FC<FullScreenButtonProps> = ({
  currentIdx,
  urls,
  className = 'hover:text-primary rounded-xl hidden md:flex',
  size = 'icon',
  variant = 'default',
  loadMore,
  hasMore,
  loading,
  setCurrentlyViewingIndex,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Filter out any undefined or empty URLs and map to the format FullscreenViewer expects
  const validItems = urls
    .filter((url): url is string => !!url)
    .map((url) => ({
      url,
      type: url.endsWith('.mp4') ? 'VIDEO' : 'IMAGE' // Basic detection, can be refined
    }));

  return (
    <>
      <Button
        className={className}
        size={size}
        variant={variant}
        title="Full Screen"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(true);
        }}
        {...props}
      >
        <Maximize2 className="w-5 h-5 cursor-pointer" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <FullscreenViewer
            setCurrentlyViewingIndex={setCurrentlyViewingIndex}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            items={validItems}
            initialIndex={currentIdx}
            loadMore={loadMore}
            hasMore={hasMore}
            loading={loading}
          />
        )}
      </AnimatePresence>
    </>
  );
};
