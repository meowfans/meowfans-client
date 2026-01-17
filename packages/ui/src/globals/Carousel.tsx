'use client';

import { Button } from '@workspace/ui/components/button';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

enum FileType {
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
}

export const Carousel = <T,>({ getUrl, getKey, items, getFileType }: CarouselProps<T>) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    axis: 'x',
    dragFree: false
  });

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [canScrollPrev, setCanScrollPrev] = useState<boolean>(false);
  const [canScrollNext, setCanScrollNext] = useState<boolean>(false);

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
      <div className="w-full aspect-square rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
        No media available
      </div>
    );
  }

  return (
    <div className="relative w-full group">
      <div ref={emblaRef} className="overflow-hidden rounded-xl border bg-black shadow-sm">
        <div className="flex touch-pan-y">
          {items.map((item, idx) => (
            <div key={getKey(item) ?? idx} className="relative min-w-full aspect-square flex items-center justify-center bg-black">
              {getFileType(item) === FileType.Image ? (
                <img src={getUrl(item)} alt="Post content" draggable={false} className="h-full w-full object-contain select-none" />
              ) : (
                <div className="relative w-full h-full">
                  <video src={getUrl(item)} controls playsInline className="h-full w-full object-contain" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {items.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className={`hidden md:absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full hover:bg-black/70 backdrop-blur-sm transition-opacity ${!canScrollPrev ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            onClick={() => emblaApi?.scrollPrev()}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={`hidden md:absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full hover:bg-black/70 backdrop-blur-sm transition-opacity ${!canScrollNext ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            onClick={() => emblaApi?.scrollNext()}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </>
      )}

      {items.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 pointer-events-none">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-2 w-2 rounded-full transition-all pointer-events-auto ${
                selectedIndex === index ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
