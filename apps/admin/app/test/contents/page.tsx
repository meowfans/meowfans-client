'use client';

import imagesData from '../images.json';
import { Card } from '@workspace/ui/components/card';

export default function TestContentsPage() {
  return (
    <div className="p-8 space-y-8 container mx-auto">
      <div className="space-y-2 border-b border-primary/10 pb-6">
        <h1 className="text-4xl font-black uppercase tracking-tighter">
          Test <span className="text-primary">Contents</span>
        </h1>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <p className="text-muted-foreground uppercase text-[10px] font-black tracking-[0.2em]">
              Previewing {imagesData.length} entries from images.json
            </p>
          </div>
          <div className="flex flex-col gap-0.5 text-[8px] font-mono text-muted-foreground/40 uppercase tracking-widest">
            <p>Source: apps/admin/app/test/images.json</p>
            <p>Directory: apps/admin/app/test</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {imagesData.map((item, index) => {
          const isVideo =
            item.raw_url.toLowerCase().endsWith('.mp4') ||
            item.raw_url.toLowerCase().endsWith('.m4v') ||
            item.raw_url.toLowerCase().endsWith('.mov');

          return (
            <Card
              key={item.id || index}
              className="overflow-hidden border-primary/5 hover:border-primary/20 transition-all duration-500 bg-secondary/10 group relative aspect-[9/16] flex flex-col"
            >
              <div className="flex-1 relative overflow-hidden bg-black/40">
                {isVideo ? (
                  <video src={item.raw_url} controls playsInline className="h-full w-full object-contain" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.raw_url} alt="" className="h-full w-full object-contain" />
                )}
              </div>
              <div className="p-4 bg-background/80 backdrop-blur-md border-t border-primary/5 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-black uppercase text-primary/60 tracking-widest">#{index + 1}</span>
                  <span className="text-[8px] font-mono text-muted-foreground/40 break-all truncate max-w-[100px]">{item.id}</span>
                </div>
                <div className="relative">
                  <p className="text-[10px] font-bold text-foreground/80 break-all line-clamp-2 group-hover:line-clamp-none transition-all cursor-text select-all">
                    {item.raw_url}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
