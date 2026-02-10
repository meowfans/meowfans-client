'use client';

import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { ArrowLeft, MoreVertical, Share2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PostDetailHeaderProps {
  unlockPrice?: number | null;
  isPurchased?: boolean;
  onReport: () => void;
}

export const PostDetailHeader = ({ unlockPrice, isPurchased, onReport }: PostDetailHeaderProps) => {
  const router = useRouter();

  return (
    <div className="mb-6 flex items-center justify-between">
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 md:h-12 md:w-12 rounded-[1rem] md:rounded-[1.25rem] bg-secondary/20 hover:bg-secondary/40 border border-white/5 shadow-xl transition-all active:scale-90"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
      </Button>
      <div className="flex gap-2 md:gap-3">
        {unlockPrice && !isPurchased && (
          <Badge className="bg-primary px-3 md:px-5 py-1 md:py-2 rounded-full font-black uppercase italic tracking-tighter shadow-lg shadow-primary/30 text-[10px] md:text-xs">
            Premium Drop
          </Badge>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 md:h-12 md:w-12 rounded-[1rem] md:rounded-[1.25rem] bg-secondary/20 hover:bg-secondary/40 border border-white/5 shadow-xl transition-all"
        >
          <Share2 className="h-4 w-4 md:h-5 md:w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 md:h-12 md:w-12 rounded-[1rem] md:rounded-[1.25rem] bg-secondary/20 hover:bg-secondary/40 border border-white/5 shadow-xl transition-all"
          onClick={onReport}
        >
          <MoreVertical className="h-4 w-4 md:h-5 md:w-5" />
        </Button>
      </div>
    </div>
  );
};
