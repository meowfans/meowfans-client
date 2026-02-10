'use client';

interface ShortsOverlayProps {
  activeIndex: number;
  totalShorts: number;
}

export function ShortsOverlay({ activeIndex, totalShorts }: ShortsOverlayProps) {
  return (
    <div className="hidden md:block absolute bottom-12 right-[calc(50%-320px)] pointer-events-none z-50">
      <div className="flex flex-col gap-3">
        <div className="bg-background/80 backdrop-blur-xl px-4 py-3 rounded-2xl border border-border shadow-2xl">
          <div className="flex flex-col">
            <span className="text-[8px] font-black uppercase text-muted-foreground tracking-widest mb-1">Active Reels</span>
            <span className="text-xs font-bold">
              {activeIndex + 1} <span className="text-muted-foreground/30">/</span> {totalShorts}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
