'use client';

import { InteractionButton } from '@/components/InteractionButton';
import { Card, CardContent } from '@workspace/ui/components/card';
import { Separator } from '@workspace/ui/components/separator';
import { cn } from '@workspace/ui/lib/utils';
import { Heart, ShoppingCart } from 'lucide-react';

interface SingleVaultActionCardProps {
  hasPrice: boolean;
  isPurchased: boolean;
  unlockPrice?: number | null;
  isLiked?: boolean;
  objectCount?: number;
  likeCount?: number | null;
  onPurchase: () => void;
  onLike: () => void;
}

export function SingleVaultActionCard({
  hasPrice,
  isPurchased,
  unlockPrice,
  isLiked,
  objectCount,
  likeCount,
  onPurchase,
  onLike
}: SingleVaultActionCardProps) {
  return (
    <Card className="w-full border-2 md:w-80">
      <CardContent className="p-6">
        <div className="space-y-4">
          {hasPrice && !isPurchased && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Unlock Price</p>
              <p className="text-3xl font-bold text-primary">${unlockPrice}</p>
            </div>
          )}

          {!isPurchased && hasPrice ? (
            <>
              <div className="rounded-lg bg-muted/50 p-3">
                <p className="text-xs text-muted-foreground">
                  💡 <span className="font-medium">Flexible Purchase:</span> Buy the entire vault to unlock all items, or purchase
                  individual items separately as you browse.
                </p>
              </div>
              <InteractionButton onClick={onPurchase} actionName="purchase this vault" className="w-full gap-2" size="lg">
                <ShoppingCart className="h-4 w-4" />
                Purchase Vault
              </InteractionButton>
            </>
          ) : (
            <InteractionButton
              onClick={onLike}
              actionName="like this vault"
              variant={isLiked ? 'default' : 'outline'}
              className="w-full gap-2"
              size="lg"
            >
              <Heart className={cn('h-4 w-4', isLiked && 'fill-current')} />
              {isLiked ? 'Liked' : 'Like'}
            </InteractionButton>
          )}

          <Separator />
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total Items</span>
              <span className="font-semibold">{objectCount || 0}</span>
            </div>
            {likeCount
              ? likeCount > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Likes</span>
                    <span className="font-semibold">{likeCount}</span>
                  </div>
                )
              : null}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
