'use client';
import { BlurImage } from '@/components/BlurImage';
import { Badge } from '@workspace/ui/components/badge';
import { Carousel, FileType } from '@workspace/ui/globals/Carousel';
import { useIsMobile } from '@workspace/ui/hooks/useIsMobile';
import { Heart, Image as ImageIcon, Sparkles } from 'lucide-react';

interface SingleVaultHeroProps {
  preview?: string | null;
  description?: string | null;
  objectCount?: number;
  likeCount?: number | null;
  isPurchased?: boolean;
  vaultObjects?: any[];
  loadMore?: () => void;
  hasMore?: boolean;
  loading?: boolean;
}

export function SingleVaultHero({
  preview,
  description,
  objectCount,
  likeCount,
  isPurchased,
  vaultObjects = [],
  loadMore,
  hasMore,
  loading
}: SingleVaultHeroProps) {
  const isMobile = useIsMobile();
  const showCarousel = isPurchased && vaultObjects.length > 0 && !isMobile;

  return (
    <div className="relative w-full overflow-hidden bg-black/40">
      <div className="mx-auto max-w-4xl px-0 md:px-6 py-4 md:py-8">
        <div className="relative aspect-[4/5] md:aspect-video w-full overflow-hidden rounded-[1.5rem] md:rounded-[3rem] shadow-2xl ring-1 ring-white/10">
          {showCarousel ? (
            <Carousel
              items={vaultObjects}
              getKey={(item) => item.id}
              getUrl={(item) => item.rawUrl}
              getFileType={() => FileType.Image}
              urls={vaultObjects.map((o) => o.rawUrl)}
              className="h-full w-full"
              loadMore={loadMore}
              hasMore={hasMore}
              loading={loading}
            />
          ) : (
            <div className="relative h-full w-full">
              {preview ? (
                <BlurImage src={preview} alt={description || 'Vault preview'} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-secondary/10">
                  <Sparkles className="h-12 w-12 text-muted-foreground/20" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>
          )}

          <div className="absolute bottom-6 left-6 z-40 flex flex-wrap gap-2">
            <Badge variant="secondary" className="gap-1.5 bg-black/40 backdrop-blur-md border-white/10 text-white">
              <ImageIcon className="h-3.5 w-3.5" />
              {objectCount || 0} items
            </Badge>
            {likeCount
              ? likeCount > 0 && (
                  <Badge variant="secondary" className="gap-1.5 bg-black/40 backdrop-blur-md border-white/10 text-white">
                    <Heart className="h-3.5 w-3.5" />
                    {likeCount}
                  </Badge>
                )
              : null}
            {isPurchased && (
              <Badge className="gap-1.5 bg-primary/90 backdrop-blur-md border-none text-primary-foreground shadow-lg">
                <Sparkles className="h-3.5 w-3.5" />
                Vault Unlocked
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
