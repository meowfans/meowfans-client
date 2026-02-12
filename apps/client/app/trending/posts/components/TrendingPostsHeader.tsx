import { Zap } from 'lucide-react';

export const TrendingPostsHeader = () => {
  return (
    <div className="flex flex-col gap-6 px-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 flex-shrink-0">
            <Zap className="h-5 w-5 md:h-6 md:w-6 text-purple-500 fill-purple-500" />
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl md:text-3xl font-black tracking-tighter uppercase italic truncate">The Pulse</h1>
            <p className="text-muted-foreground text-[10px] md:text-sm font-medium uppercase tracking-[0.2em] truncate">
              Live feed of talked-about updates
            </p>
          </div>
        </div>
        <div className="hidden lg:flex items-center bg-secondary/30 rounded-full px-4 py-2 border border-border/50 gap-3">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest leading-none">Live</span>
          </div>
          <div className="h-4 w-1 border-l border-border/50" />
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">3.2k Content pieces / hr</span>
        </div>
      </div>
    </div>
  );
};
