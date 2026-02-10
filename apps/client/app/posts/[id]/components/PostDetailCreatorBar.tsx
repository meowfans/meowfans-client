'use client';

import { SAvatar } from '@workspace/ui/globals/SAvatar';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

interface PostDetailCreatorBarProps {
  creatorUsername: string;
  creatorAvatarUrl?: string | null;
  createdAt: string;
}

export const PostDetailCreatorBar = ({ creatorUsername, creatorAvatarUrl, createdAt }: PostDetailCreatorBarProps) => {
  return (
    <div className="flex items-center p-4 md:p-6 md:px-8 border-b border-white/5 bg-white/[0.02]">
      <Link href={`/creators/${creatorUsername}`} className="group flex items-center gap-3 md:gap-4">
        <div className="border-2 border-primary/20 rounded-full p-0.5 shadow-2xl transition-transform group-hover:scale-105 flex-shrink-0">
          <SAvatar url={creatorAvatarUrl} className="h-10 w-10 md:h-12 md:w-12" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm md:text-base text-foreground group-hover:text-primary transition-colors truncate">
            {creatorUsername}
          </span>
          <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 truncate">
            {createdAt && formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </span>
        </div>
      </Link>
    </div>
  );
};
