'use client';

import { BlurImage } from '@/components/BlurImage';
import { InteractionButton } from '@/components/InteractionButton';
import { Carousel, FileType } from '@workspace/ui/globals/Carousel';
import { Lock, ShoppingCart, Sparkles } from 'lucide-react';

interface PostAsset {
  assetId: string;
  rawUrl: string;
  fileType: string;
}

interface PostDetailMediaProps {
  isPurchased: boolean;
  unlockPrice?: number | null;
  postAssets: PostAsset[];
  preview?: string | null;
  caption?: string | null;
  onUnlock: () => void;
}

export const PostDetailMedia = ({ isPurchased, unlockPrice, postAssets, preview, caption, onUnlock }: PostDetailMediaProps) => {
  if (isPurchased || !unlockPrice) {
    return (
      <div className="relative w-full bg-black/40">
        <Carousel
          items={postAssets}
          getKey={(item) => item.assetId}
          getUrl={(item) => item.rawUrl}
          getFileType={(item) => item.fileType as FileType}
          urls={postAssets?.map((a) => a.rawUrl) || (preview ? [preview] : [])}
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/5] md:aspect-video w-full overflow-hidden bg-black/40">
      {preview ? (
        <BlurImage src={preview} alt={caption || 'Post media'} className="h-full w-full object-contain" loading="eager" />
      ) : (
        <div className="h-full w-full bg-secondary/10 flex items-center justify-center">
          <Sparkles className="h-10 w-10 text-muted-foreground/20" />
        </div>
      )}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-8 bg-black/60 backdrop-blur-xl">
        <div className="mb-4 md:mb-6 rounded-[1.5rem] md:rounded-[2.5rem] bg-white/5 p-6 md:p-8 border border-white/10 shadow-2xl rotate-3">
          <Lock className="h-10 w-10 md:h-16 md:w-16 text-primary" />
        </div>
        <h3 className="text-xl md:text-3xl font-[900] italic uppercase tracking-tighter text-white mb-2 text-center">Content Locked</h3>
        <p className="text-xs md:text-sm font-medium text-white/50 mb-6 md:mb-8 max-w-xs text-center px-4">
          Unlock this drop for full access to {postAssets.length} exclusive items.
        </p>

        <InteractionButton
          onClick={onUnlock}
          actionName="Unlock Post"
          className="h-12 md:h-16 px-6 md:px-10 rounded-[1rem] md:rounded-[2rem] bg-primary text-primary-foreground font-black uppercase italic tracking-widest shadow-[0_15px_30px_-5px_rgba(var(--primary),0.4)] hover:scale-105 transition-all text-xs md:text-base w-full md:w-auto"
        >
          <ShoppingCart className="mr-2 md:mr-3 h-4 w-4 md:h-5 md:w-5" />
          Unlock for ${unlockPrice}
        </InteractionButton>
      </div>
    </div>
  );
};
