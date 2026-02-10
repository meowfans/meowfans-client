import { Heart } from 'lucide-react';

export const LikedHeader = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 md:gap-4">
        <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/20 shrink-0">
          <Heart className="h-5 w-5 md:h-6 md:w-6 text-red-500 fill-red-500" />
        </div>
        <div className="min-w-0">
          <h1 className="text-2xl md:text-3xl font-black tracking-tight uppercase italic truncate">My Favorites</h1>
          <p className="text-muted-foreground text-[10px] md:text-sm font-medium uppercase tracking-[0.15em] md:tracking-[0.2em] truncate">
            Your personal treasure trove
          </p>
        </div>
      </div>
    </div>
  );
};
