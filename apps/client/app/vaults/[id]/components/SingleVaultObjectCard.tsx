'use client';

import { InteractionButton } from '@/components/InteractionButton';
import { Badge } from '@workspace/ui/components/badge';
import { Card, CardContent } from '@workspace/ui/components/card';
import { Heart, Image as ImageIcon, Lock, ShoppingCart } from 'lucide-react';
import Image from 'next/image';

interface SingleVaultObjectCardProps {
  obj: {
    id: string;
    rawUrl?: string | null;
    unlockPrice?: number | null;
    isLiked?: boolean;
    isPurchased?: boolean;
  };
  index: number;
  isVaultPurchased: boolean;
  onPurchase: (id: string, price: number) => void;
}

export function SingleVaultObjectCard({ obj, index, isVaultPurchased, onPurchase }: SingleVaultObjectCardProps) {
  const isObjectUnlocked = obj.isPurchased || isVaultPurchased;
  const objectPrice = obj.unlockPrice;

  return (
    <Card className="group overflow-hidden border-none bg-secondary/20 shadow-none transition-all hover:bg-secondary/40 hover:shadow-lg hover:shadow-primary/5">
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden bg-muted">
          {isObjectUnlocked ? (
            obj.rawUrl ? (
              <Image
                width={300}
                height={400}
                src={obj.rawUrl}
                alt={`Content ${index + 1}`}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted">
                <ImageIcon className="h-8 w-8 text-muted-foreground/30" />
              </div>
            )
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-muted/50">
              <Lock className="h-12 w-12 text-muted-foreground/30" />
            </div>
          )}

          {/* Locked Overlay */}
          {!isObjectUnlocked && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/70 backdrop-blur-sm transition-all group-hover:bg-black/80">
              <Lock className="h-8 w-8 text-white/90" />
              {objectPrice && objectPrice > 0 ? (
                <div className="flex flex-col items-center gap-2">
                  <Badge variant="secondary" className="bg-white/90 text-sm font-semibold">
                    ${objectPrice}
                  </Badge>
                  <InteractionButton
                    onClick={(e) => {
                      e.stopPropagation();
                      onPurchase(obj.id, objectPrice || 0);
                    }}
                    actionName="purchase this item"
                    size="sm"
                    className="gap-1.5 bg-primary/90 text-xs hover:bg-primary"
                  >
                    <ShoppingCart className="h-3 w-3" />
                    Buy Now
                  </InteractionButton>
                </div>
              ) : (
                <p className="text-xs text-white/80">Unlock vault to view</p>
              )}
            </div>
          )}

          {/* Liked Badge */}
          {obj.isLiked && isObjectUnlocked && (
            <div className="absolute right-2 top-2">
              <div className="rounded-full bg-background/80 p-1.5 backdrop-blur-sm">
                <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
