'use client';

import { LikeButton } from '@/components/LikeButton';
import { PurchaseSheet } from '@/components/modals/PurchaseSheet';
import { NextImage } from '@/components/NextImage';
import { useFan } from '@/hooks/context/UserContextWrapper';
import { useVaultsStore } from '@/hooks/store/vaults.store';
import { useLikes } from '@/hooks/useLikes';
import { PurchaseType, VaultsEntity } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@workspace/ui/components/card';
import { Separator } from '@workspace/ui/components/separator';
import { SAvatar } from '@workspace/ui/globals/SAvatar';
import { StatItem } from '@workspace/ui/globals/StatItem';
import { normalizePath } from '@workspace/ui/lib/helpers';
import { Lock, Maximize2, Minimize2, Unlock } from 'lucide-react';
import moment from 'moment';
import Link from 'next/link';
import { useState } from 'react';

interface SingleVaultInfoProps {
  vault: VaultsEntity;
}

export const SingleVaultInfo: React.FC<SingleVaultInfoProps> = ({ vault }) => {
  const { fan } = useFan();
  const { setVault } = useVaultsStore();
  const { likeVault } = useLikes();
  const [extended, setExtended] = useState<boolean>(true);

  if (!vault) return null;

  const handleLikeVault = async (vaultId: string) => {
    const liked = await likeVault(vaultId);
    setVault({ ...vault, isLiked: !!liked });
  };

  return (
    <Card className="w-full rounded-2xl overflow-hidden">
      {vault.preview && (
        <div className="relative w-full">
          <NextImage
            imageUrl={vault.preview}
            alt="Vault preview"
            width={800}
            height={400}
            priority
            className="w-full max-h-90 object-cover"
          />

          <Badge className="absolute top-3 right-3 gap-1" variant={vault.isPurchased ? 'default' : 'destructive'}>
            {vault.isPurchased ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
            {vault.isPurchased ? 'Unlocked' : 'Locked'}
          </Badge>
        </div>
      )}

      <CardHeader className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Link href={normalizePath('creators', vault.creatorProfile?.user?.username)}>
          <SAvatar className="h-14 w-14 shrink-0" url={vault.creatorProfile?.user?.avatarUrl} />
        </Link>

        <div className="flex-1 space-y-1">
          <Link href={normalizePath('creators', vault.creatorProfile?.user?.username)}>
            <p className="text-base font-semibold hover:underline">{vault.creatorProfile?.user?.username}</p>
          </Link>

          <p className="text-xs text-muted-foreground">Created {moment(vault.createdAt).fromNow()}</p>
          {!vault.isPurchased && vault.unlockPrice && (
            <p className="text-xs leading-relaxed text-muted-foreground">
              Unlock all exclusive content ({vault.objectCount}) for just ${vault.unlockPrice}— or purchase individual items anytime.
            </p>
          )}
        </div>

        <div className="flex gap-2 self-start sm:self-center">
          {vault.isPurchased ? (
            <LikeButton isLiked={!!fan && vault.isLiked} onLikeDisLike={() => handleLikeVault(vault.id)} />
          ) : (
            vault.unlockPrice && (
              <PurchaseSheet entityId={vault.id} amount={vault.unlockPrice} purchaseType={PurchaseType.Vault} creatorId={vault.creatorId} />
            )
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="grid grid-cols-3 gap-4 py-4 text-center">
          <StatItem label="Likes" value={vault.likeCount} />
          <StatItem label="Assets" value={vault.objectCount} />
          {<StatItem label="Price" value={vault.unlockPrice ?? 0} />}
        </div>

        <Separator />

        {vault.keywords && vault.keywords?.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {extended ? (
              <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">{vault.description?.slice(0, 100)}</p>
            ) : (
              <div className="py-4 space-y-3">
                <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">{vault.description}</p>
                {vault.keywords.slice(0, 5).map((k, idx) => (
                  <Link key={idx} href={`/categories/${encodeURIComponent(k.trim())}`}>
                    <Badge variant="secondary" className="cursor-pointer">
                      {k.trim()}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}

            <button type="button" onClick={() => setExtended(!extended)} className="text-muted-foreground hover:text-foreground transition">
              {extended ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
          </div>
        )}
      </CardContent>

      <Separator />

      <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
        {fan && <Badge variant={vault.isLiked ? 'destructive' : 'outline'}>{vault.isLiked ? 'Liked' : 'Not liked'}</Badge>}
      </CardFooter>

      <CardContent className="pt-0 text-xs text-muted-foreground space-y-1">
        <p>Created: {moment(vault.createdAt).format('LLL')}</p>
        <p>Updated: {moment(vault.updatedAt).format('LLL')}</p>
      </CardContent>
    </Card>
  );
};
