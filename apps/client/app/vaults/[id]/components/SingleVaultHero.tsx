'use client';

import { Badge } from '@workspace/ui/components/badge';
import { Heart, Image as ImageIcon, Sparkles } from 'lucide-react';
import Image from 'next/image';

interface SingleVaultHeroProps {
  preview?: string | null;
  description?: string | null;
  objectCount?: number;
  likeCount?: number | null;
  isPurchased?: boolean;
}

export function SingleVaultHero({ preview, description, objectCount, likeCount, isPurchased }: SingleVaultHeroProps) {
  return (
    <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden bg-gradient-to-b from-muted/50 to-background">
      <div className="absolute inset-0">
        {preview && (
          <Image
            width={300}
            height={400}
            src={preview}
            alt={description || 'Vault preview'}
            className="h-full w-full object-cover opacity-100 blur-xs"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      {/* Floating Stats */}
      <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
        <Badge variant="secondary" className="gap-1.5 bg-background/90 backdrop-blur-md">
          <ImageIcon className="h-3.5 w-3.5" />
          {objectCount || 0} items
        </Badge>
        {likeCount
          ? likeCount > 0 && (
              <Badge variant="secondary" className="gap-1.5 bg-background/90 backdrop-blur-md">
                <Heart className="h-3.5 w-3.5" />
                {likeCount}
              </Badge>
            )
          : null}
        {isPurchased && (
          <Badge className="gap-1.5 bg-primary/90 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            Owned
          </Badge>
        )}
      </div>
    </div>
  );
}
