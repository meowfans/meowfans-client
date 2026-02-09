'use client';

import { Button } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';
import useEmblaCarousel from 'embla-carousel-react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { FullScreenButton } from './FullScreenButton';

export enum FileType {
  Audio = 'AUDIO',
  Document = 'DOCUMENT',
  Image = 'IMAGE',
  Video = 'VIDEO'
}

interface CarouselProps<T> {
  items: T[];
  getKey: (item: T) => string | number;
  getUrl: (item: T) => string | undefined;
  getFileType: (item: T) => FileType;
  urls?: string[];
  className?: string;
  aspectRatio?: 'square' | 'video' | 'auto';
}

export const Carousel = <T,>({ getUrl, getKey, items, getFileType, urls, className, aspectRatio = 'square' }: CarouselProps<T>) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    axis: 'x',
    dragFree: false,
    duration: 30
  });

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [canScrollPrev, setCanScrollPrev] = useState<boolean>(false);
  const [canScrollNext, setCanScrollNext] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  if (!items?.length) {
    return (
      <div
        className={cn(
          'w-full rounded-[2rem] bg-secondary/10 flex flex-col items-center justify-center border border-dashed border-white/5',
          aspectRatio === 'square' ? 'aspect-square' : 'aspect-video',
          className
        )}
      >
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/30">No Media Available</p>
      </div>
    );
  }

  return (
    <div
      className={cn('relative w-full group select-none overflow-hidden rounded-[2rem] md:rounded-[3rem]', className)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Immersive Background Blur for current slide */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={`bg-blur-${selectedIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 pointer-events-none scale-125 blur-[100px] saturate-200"
        >
          {items[selectedIndex] && getUrl(items[selectedIndex]) && (
            <img src={getUrl(items[selectedIndex])} alt="" className="h-full w-full object-cover" />
          )}
        </motion.div>
      </AnimatePresence>

      <div ref={emblaRef} className="relative z-10 w-full h-full overflow-hidden">
        <div className="flex h-full">
          {items.map((item, idx) => (
            <div
              key={getKey(item) ?? idx}
              className={cn(
                'relative min-w-full flex items-center justify-center transition-transform duration-500',
                aspectRatio === 'square' ? 'aspect-square' : 'aspect-video'
              )}
            >
              <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
                {getFileType(item).toUpperCase() === FileType.Image ? (
                  getUrl(item) ? (
                    <motion.img
                      initial={{ scale: 1.1, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      src={getUrl(item)}
                      alt="Content Media"
                      draggable={false}
                      className="h-full w-full object-contain pointer-events-none"
                    />
                  ) : (
                    <div className="h-full w-full bg-secondary/10 flex items-center justify-center">
                      <Sparkles className="h-10 w-10 text-muted-foreground/20" />
                    </div>
                  )
                ) : (
                  getUrl(item) && <video src={getUrl(item)} controls playsInline className="h-full w-full object-contain" />
                )}
              </div>

              <div className="absolute top-6 right-6 z-20">
                <FullScreenButton
                  currentIdx={idx}
                  urls={urls || []}
                  className="rounded-2xl border-white/10 bg-black/20 backdrop-blur-3xl hover:bg-black/40 transition-all"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modern Navigation Controls */}
      {items.length > 1 && (
        <AnimatePresence>
          {(isHovering || isMobile) && (
            <>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-30 pointer-events-auto"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    'h-12 w-12 rounded-[1.25rem] bg-black/20 hover:bg-black/40 border border-white/5 backdrop-blur-2xl text-white shadow-2xl transition-all active:scale-90',
                    !canScrollPrev && 'opacity-20 pointer-events-none'
                  )}
                  onClick={() => emblaApi?.scrollPrev()}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-30 pointer-events-auto"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    'h-12 w-12 rounded-[1.25rem] bg-black/20 hover:bg-black/40 border border-white/10 backdrop-blur-2xl text-white shadow-2xl transition-all active:scale-90',
                    !canScrollNext && 'opacity-20 pointer-events-none'
                  )}
                  onClick={() => emblaApi?.scrollNext()}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      )}

      {/* Modern Pagination Bar */}
      {items.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center p-2 rounded-full bg-black/10 backdrop-blur-xl border border-white/5">
          <div className="flex gap-1.5 px-1">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className="relative h-1.5 flex items-center justify-center transition-all group/dot"
                aria-label={`Go to slide ${index + 1}`}
              >
                <div
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-500',
                    selectedIndex === index ? 'bg-primary w-8' : 'bg-white/20 w-1.5 group-hover/dot:bg-white/40'
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Slide Counter for Mobile */}
      {items.length > 1 && (
        <div className="absolute top-6 left-6 z-20 px-4 py-1.5 rounded-full bg-black/20 backdrop-blur-2xl border border-white/5 md:hidden">
          <span className="text-[10px] font-black tracking-widest text-white/80">
            {selectedIndex + 1} / {items.length}
          </span>
        </div>
      )}
    </div>
  );
};
