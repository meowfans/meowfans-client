import { ExoAdProvider, ExoAdZoneTypes } from '@/components/ExoAdProvider';
import { LikeButton } from '@/components/LikeButton';
import { PurchaseSheet } from '@/components/modals/PurchaseSheet';
import { useFan } from '@/hooks/context/UserContextWrapper';
import { useVaultsStore } from '@/hooks/store/vaults.store';
import { useLikes } from '@/hooks/useLikes';
import { PurchaseType } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@workspace/ui/components/card';
import { Separator } from '@workspace/ui/components/separator';
import { SAvatar } from '@workspace/ui/globals/SAvatar';
import { StatItem } from '@workspace/ui/globals/StatItem';
import { Lock, Maximize2, Minimize2, Unlock } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export const SingleVaultInfo = () => {
  const { fan } = useFan();
  const [extended, setExtended] = useState<boolean>(false);
  const { likeVault } = useLikes();
  const { setVault, vault } = useVaultsStore();

  const handleLikeVault = useDebouncedCallback(async (vaultId: string) => {
    const isLiked = await likeVault(vaultId);
    setVault({ ...vault, isLiked: !!isLiked });
  }, 350);

  if (!vault) return null;

  const creator = vault.creatorProfile?.user;

  return (
    <Card className="rounded-xl w-full">
      {vault.preview && (
        <div className="relative w-full overflow-hidden rounded-t-2xl">
          <Image
            src={vault.preview}
            alt="Vault preview"
            height={100}
            width={300}
            className="justify-center content-center mx-auto rounded-2xl"
            priority
          />
          <div className="absolute top-2 right-2">
            {vault.isPurchased ? (
              <Badge className="gap-1">
                <Unlock className="w-3 h-3" /> Unlocked
              </Badge>
            ) : (
              <Badge variant="destructive" className="gap-1">
                <Lock className="w-3 h-3" /> Locked
              </Badge>
            )}
          </div>
        </div>
      )}
      <CardHeader className="flex flex-row items-center gap-3 pt-4">
        <Link href={`/creators/${creator?.username}`}>
          <SAvatar className="h-12 w-12" url={creator?.avatarUrl} />
        </Link>
        <div className="flex flex-col">
          <Link href={`/creators/${creator?.username}`}>
            <p className="font-semibold text-base">{creator?.username}</p>
          </Link>
          <p className="text-xs text-muted-foreground">Created {moment(vault.createdAt).fromNow()}</p>
        </div>

        {vault.isPurchased ? (
          <div className="mt-4 flex gap-2">
            <LikeButton isLiked={!!fan && vault.isLiked} onLikeDisLike={() => handleLikeVault(vault.id)} />
          </div>
        ) : (
          vault.unlockPrice && (
            <div className="mt-4 flex flex-col gap-2 bg-linear-to-r from-purple-50 to-pink-50 dark:from-zinc-800 dark:to-zinc-900 p-4 rounded-xl border border-pink-200 dark:border-zinc-700 shadow-sm">
              <PurchaseSheet entityId={vault.id} amount={vault.unlockPrice} purchaseType={PurchaseType.Vault} creatorId={vault.creatorId} />
              <p className="text-xl text-center text-transparent bg-clip-text bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 font-medium">
                Unlock all exclusive content ({vault.objectCount}) for just ${vault.unlockPrice} — or purchase individual vault items
                anytime!
              </p>
            </div>
          )
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-3 gap-4 text-center py-3">
          <StatItem label="Like" value={vault.likeCount} />
          <StatItem label="Asset" value={vault.objectCount} />
          <div>
            <p className="font-semibold text-sm">{vault.unlockPrice === 0 ? 'Free' : `$${vault.unlockPrice}`}</p>
            <p className="text-xs text-muted-foreground">Price</p>
          </div>
        </div>
        <Separator className="my-3" />
        <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{vault.description}</p>
        {extended ? (
          vault.keywords?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {vault.keywords.map((tag, idx) => (
                <Link key={idx} href={`/categories/${encodeURIComponent(tag.trim())}`}>
                  <Badge variant="secondary">{tag.trim()}</Badge>
                </Link>
              ))}
              <Minimize2 onClick={() => setExtended(false)} />
            </div>
          ) : null
        ) : (
          <Maximize2 onClick={() => setExtended(true)} />
        )}

        <ExoAdProvider zoneId="5769740" zoneType={ExoAdZoneTypes.Gallery} />
      </CardContent>
      <Separator />
      <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
        {fan && <Badge variant={vault.isLiked ? 'destructive' : 'outline'}>{vault.isLiked ? 'Liked' : 'Not liked'}</Badge>}
      </CardFooter>
      <CardContent className="text-xs text-muted-foreground space-y-1">
        <p>Created: {moment(vault.createdAt).format('LLL')}</p>
        <p>Updated: {moment(vault.updatedAt).format('LLL')}</p>
      </CardContent>
    </Card>
  );
};
