/* eslint-disable @next/next/no-img-element */
'use client';

import { GetPublicVaultsOutput } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Card, CardContent } from '@workspace/ui/components/card';
import { Heart, Lock, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface VaultCardProps {
  vault: GetPublicVaultsOutput;
}

export function VaultCard({ vault }: VaultCardProps) {
  return (
    <Link href={`/vaults/${vault.id}`}>
      <Card className="group overflow-hidden border-none bg-secondary/20 shadow-none transition-all hover:bg-secondary/40 hover:shadow-lg hover:shadow-primary/5">
        {/* Preview Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            width={300}
            height={400}
            src={vault.preview as string}
            alt={vault.description || 'Vault preview'}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Overlay badges */}
          <div className="absolute left-2 top-2 flex flex-wrap gap-2">
            {vault.unlockPrice && (
              <Badge variant="secondary" className="gap-1 bg-background/80 backdrop-blur-sm">
                <Lock className="h-3 w-3" />${vault.unlockPrice}
              </Badge>
            )}
            {vault.isPurchased && (
              <Badge variant="default" className="gap-1 bg-primary/80 backdrop-blur-sm">
                <ShoppingCart className="h-3 w-3" />
                Owned
              </Badge>
            )}
          </div>

          {/* Object count badge */}
          <div className="absolute bottom-2 right-2">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
              {vault.objectCount} {vault.objectCount === 1 ? 'item' : 'items'}
            </Badge>
          </div>
        </div>

        {/* Vault Details */}
        <CardContent className="p-4">
          {/* Description */}
          {vault.description && <p className="mb-2 line-clamp-2 text-sm text-foreground">{vault.description}</p>}

          {/* Like indicator */}
          {vault.isLiked && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Heart className="h-3 w-3 fill-red-500 text-red-500" />
              <span>Liked</span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
