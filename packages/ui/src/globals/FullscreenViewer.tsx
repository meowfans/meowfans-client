'use client';

import { Button } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface FullscreenViewerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Array<{ url: string; type: 'IMAGE' | 'VIDEO' | string }>;
  initialIndex: number;
}

export const FullscreenViewer = ({ isOpen, onClose, items, initialIndex }: FullscreenViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, currentIndex]);

  if (items.length === 0 || typeof document === 'undefined') return null;

  const currentItem = items[currentIndex];
  if (!currentItem) return null;

  const isVideo = currentItem.type.toUpperCase() === 'VIDEO' || currentItem.url.endsWith('.mp4');

  const content = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'fixed inset-0 z-[10000] flex items-center justify-center bg-black/98 backdrop-blur-2xl',
        !isOpen && 'pointer-events-none'
      )}
    >
      {/* Decorative Background Blur */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`feat-bg-${currentIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 pointer-events-none blur-[120px] saturate-200 scale-150"
        >
          {currentItem.url && <img src={currentItem.url} alt="" className="h-full w-full object-cover" />}
        </motion.div>
      </AnimatePresence>

      {/* Top Controls */}
      <div className="absolute top-0 left-0 right-0 z-[110] flex items-center justify-between p-6 md:p-10 pointer-events-none">
        <div className="px-5 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-3xl pointer-events-auto">
          <span className="text-[10px] md:text-xs font-black tracking-[0.3em] text-white/90 uppercase">
            {currentIndex + 1} <span className="text-white/30 mx-2">/</span> {items.length}
          </span>
        </div>

        <div className="flex gap-4 pointer-events-auto">
          {isVideo && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsPlaying(!isPlaying)}
              className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-3xl text-white hover:bg-white/10 transition-all font-bold"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-3xl text-white hover:bg-white/10 hover:scale-110 active:scale-95 transition-all"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Main Media Preview */}
      <div className="relative w-full h-full flex items-center justify-center p-4 md:p-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {isVideo ? (
              currentItem.url ? (
                <video
                  ref={videoRef}
                  src={currentItem.url}
                  className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                  controls={false}
                  playsInline
                  loop
                  muted={false}
                />
              ) : (
                <div className="flex flex-col items-center gap-4 text-white/20">
                  <Sparkles className="h-20 w-20" />
                  <p className="text-[10px] font-black uppercase tracking-[0.3em]">Video URL Missing</p>
                </div>
              )
            ) : currentItem.url ? (
              <img
                src={currentItem.url}
                alt="Fullscreen Preview"
                className="max-w-full max-h-full object-contain shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] rounded-sm"
                draggable={false}
              />
            ) : (
              <div className="flex flex-col items-center gap-4 text-white/20">
                <Sparkles className="h-20 w-20" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em]">Image URL Missing</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {items.length > 1 && (
        <>
          <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-[110]">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="h-16 w-16 md:h-20 md:w-20 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-3xl text-white hover:bg-white/10 hover:scale-110 active:scale-90 transition-all shadow-2xl group"
            >
              <ChevronLeft className="h-8 w-8 md:h-10 md:w-10 group-hover:-translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-[110]">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="h-16 w-16 md:h-20 md:w-20 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-3xl text-white hover:bg-white/10 hover:scale-110 active:scale-90 transition-all shadow-2xl group"
            >
              <ChevronRight className="h-8 w-8 md:h-10 md:w-10 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </>
      )}

      {/* Thumbnails Strip */}
      {items.length > 1 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[110] flex gap-3 p-3 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-3xl max-w-[90vw] overflow-x-auto no-scrollbar pointer-events-auto">
          {items.map((item, idx) => (
            <button
              key={`${item.url}-${idx}`}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
              className={cn(
                'relative h-14 w-14 md:h-16 md:w-16 rounded-2xl overflow-hidden transition-all duration-300 flex-shrink-0 border-2',
                currentIndex === idx
                  ? 'border-primary scale-110 shadow-[0_15px_30px_-5px_rgba(var(--primary),0.3)]'
                  : 'border-transparent opacity-30 hover:opacity-100 hover:scale-105'
              )}
            >
              {item.url && <img src={item.url} alt="" className="h-full w-full object-cover" />}
              {item.type.toUpperCase() === 'VIDEO' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Play className="h-4 w-4 text-white fill-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );

  return createPortal(content, document.body);
};
