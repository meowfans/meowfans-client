'use client';

import { Heart, Lock, MessageSquare } from 'lucide-react';

interface PostDetailEngagementProps {
  isLiked: boolean;
  onLike: (e: React.MouseEvent) => void;
  isLocked: boolean;
  itemCount: number;
  viewCount?: number;
}

export const PostDetailEngagement = ({ isLiked, onLike, isLocked, itemCount, viewCount }: PostDetailEngagementProps) => {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between pt-6 md:pt-8 border-t border-white/5">
      <div className="flex items-center gap-4 md:gap-6">
        <button
          onClick={onLike}
          className={`flex items-center gap-2 md:gap-3 group transition-transform active:scale-90 text-left ${isLocked ? 'cursor-not-allowed opacity-40' : ''}`}
          disabled={isLocked}
        >
          <div
            className={`flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-[0.75rem] md:rounded-[1.25rem] border border-white/5 transition-all ${isLiked ? 'bg-red-500/10 border-red-500/20' : 'bg-secondary/20 group-hover:bg-secondary/40'}`}
          >
            {isLocked ? (
              <Lock className="h-4 w-4 md:h-6 md:w-6 text-muted-foreground/60" />
            ) : (
              <Heart
                className={`h-4 w-4 md:h-6 md:w-6 transition-all ${isLiked ? 'fill-red-500 text-red-500' : 'text-muted-foreground/60 group-hover:text-foreground'}`}
              />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 italic">
              Appreciation
            </span>
            <span className="text-xs md:text-sm font-black italic tracking-tighter uppercase">
              {isLocked ? 'Locked' : isLiked ? 'Loved' : 'Love'}
            </span>
          </div>
        </button>

        <button
          className={`flex items-center gap-2 md:gap-3 group transition-transform active:scale-90 text-left ${isLocked ? 'cursor-not-allowed opacity-40' : ''}`}
          disabled={isLocked}
        >
          <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-[0.75rem] md:rounded-[1.25rem] border border-white/5 bg-secondary/20 group-hover:bg-secondary/40 transition-all">
            {isLocked ? (
              <Lock className="h-4 w-4 md:h-6 md:w-6 text-muted-foreground/60" />
            ) : (
              <MessageSquare className="h-4 w-4 md:h-6 md:w-6 text-muted-foreground/60 group-hover:text-foreground" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 italic">
              Join Chat
            </span>
            <span className="text-xs md:text-sm font-black italic tracking-tighter uppercase">{isLocked ? 'Locked' : 'Discuss'}</span>
          </div>
        </button>
      </div>

      {/* Post Stats */}
      <div className="flex items-center justify-center gap-6 md:gap-8 px-4 md:px-6 py-2 md:py-3 rounded-full bg-secondary/10 border border-white/5 w-fit self-center md:self-auto">
        <div className="flex flex-col items-center">
          <span className="text-[8px] md:text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest leading-none mb-1">
            Items
          </span>
          <span className="text-sm md:text-base font-black italic tracking-tighter leading-none">{itemCount}</span>
        </div>
        <div className="h-4 md:h-6 w-[1px] bg-white/5" />
        <div className="flex flex-col items-center">
          <span className="text-[8px] md:text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest leading-none mb-1">
            Views
          </span>
          <span className="text-sm md:text-base font-black italic tracking-tighter leading-none">{viewCount || 0}</span>
        </div>
      </div>
    </div>
  );
};
