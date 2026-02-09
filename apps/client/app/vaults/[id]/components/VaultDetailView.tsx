'use client';

import { InteractionButton } from '@/components/InteractionButton';
import { PaymentModal } from '@/components/PaymentModal';
import { useLikeMutations } from '@/hooks/useLikeMutations';
import { useSingleVault } from '@/hooks/useVaultObjects';
import { PurchaseType, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent } from '@workspace/ui/components/card';
import { Separator } from '@workspace/ui/components/separator';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import { cn } from '@workspace/ui/lib/utils';
import { Heart, Image as ImageIcon, Lock, ShoppingCart, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface VaultDetailViewProps {
  vaultId: string;
}

export function VaultDetailView({ vaultId }: VaultDetailViewProps) {
  const { vault, loading, hasMore, loadMore } = useSingleVault({
    relatedEntityId: vaultId,
    take: 30,
    sortBy: SortBy.VaultObjectSuffix,
    orderBy: SortOrder.Asc
  });
  const router = useRouter();

  const [paymentData, setPaymentData] = useState<{
    open: boolean;
    amount: number;
    entityId: string;
    purchaseType: PurchaseType;
  }>({
    open: false,
    amount: 0,
    entityId: '',
    purchaseType: PurchaseType.Vault
  });

  const { likeVault } = useLikeMutations();

  const handlePurchase = async () => {
    if (!vault) return;
    setPaymentData({
      open: true,
      amount: vault.unlockPrice || 0,
      entityId: vaultId,
      purchaseType: PurchaseType.Vault
    });
  };

  const handlePurchaseObject = (objId: string, price: number) => {
    setPaymentData({
      open: true,
      amount: price,
      entityId: objId,
      purchaseType: PurchaseType.VaultObject
    });
  };

  const handleLike = async () => {
    if (!vaultId) return;
    await likeVault(vaultId);
  };

  if (loading) {
    return <Loading />;
  }

  if (!vault && !loading) {
    return (
      <div className="flex min-h-[600px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Lock className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="mt-6 text-xl font-semibold">Vault not found</h3>
          <p className="mt-2 text-sm text-muted-foreground">This vault may have been removed or is unavailable</p>
          <Button variant="outline" className="mt-6" asChild>
            <Link href="/vaults">Browse Vaults</Link>
          </Button>
        </div>
      </div>
    );
  }

  const isPurchased = vault?.isPurchased;
  const hasPrice = vault?.unlockPrice && vault.unlockPrice > 0;

  return (
    <div className="flex flex-1 flex-col">
      {/* Hero Section with Preview */}
      <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden bg-gradient-to-b from-muted/50 to-background">
        <div className="absolute inset-0">
          {vault?.preview && (
            <Image
              width={300}
              height={400}
              src={vault.preview}
              alt={vault.description || 'Vault preview'}
              className="h-full w-full object-cover opacity-100 blur-xs"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
          <Badge variant="secondary" className="gap-1.5 bg-background/90 backdrop-blur-md">
            <ImageIcon className="h-3.5 w-3.5" />
            {vault?.objectCount || 0} items
          </Badge>
          {vault?.likeCount && vault.likeCount > 0 && (
            <Badge variant="secondary" className="gap-1.5 bg-background/90 backdrop-blur-md">
              <Heart className="h-3.5 w-3.5" />
              {vault.likeCount}
            </Badge>
          )}
          {isPurchased && (
            <Badge className="gap-1.5 bg-primary/90 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" />
              Owned
            </Badge>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="mx-auto w-full max-w-7xl space-y-8 p-6">
        {/* Header Info */}
        <div className="space-y-6">
          {/* Title & Creator */}
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex-1 space-y-4">
              {/* Title */}
              <div>
                <h1 className="line-clamp-2 text-3xl font-bold tracking-tight md:text-4xl">{vault?.description || 'Untitled Vault'}</h1>
              </div>

              {/* Creator */}
              <Link href={`/creators/${vault?.username}`} className="inline-block">
                <div className="flex items-center gap-3 transition-opacity hover:opacity-70">
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    <AvatarImage src={vault?.avatarUrl} alt={vault?.username} />
                    <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                      {vault?.username?.slice(0, 2).toUpperCase() || 'V'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">@{vault?.username}</p>
                    <p className="text-sm text-muted-foreground">Creator</p>
                  </div>
                </div>
              </Link>

              {/* Keywords */}
              {vault?.keywords && vault.keywords.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {vault.keywords.map((keyword, index) => (
                    <Badge key={`keyword-${index}`} variant="outline" className="rounded-full">
                      #{keyword}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Action Card */}
            <Card className="w-full border-2 md:w-80">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Price Display */}
                  {hasPrice && !isPurchased && (
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Unlock Price</p>
                      <p className="text-3xl font-bold text-primary">${vault.unlockPrice}</p>
                    </div>
                  )}

                  {/* Purchase Button */}
                  {!isPurchased && hasPrice ? (
                    <>
                      <div className="rounded-lg bg-muted/50 p-3">
                        <p className="text-xs text-muted-foreground">
                          💡 <span className="font-medium">Flexible Purchase:</span> Buy the entire vault to unlock all items, or purchase
                          individual items separately as you browse.
                        </p>
                      </div>
                      <InteractionButton onClick={handlePurchase} actionName="purchase this vault" className="w-full gap-2" size="lg">
                        <ShoppingCart className="h-4 w-4" />
                        Purchase Vault
                      </InteractionButton>
                    </>
                  ) : (
                    <InteractionButton
                      onClick={handleLike}
                      actionName="like this vault"
                      variant={vault?.isLiked ? 'default' : 'outline'}
                      className="w-full gap-2"
                      size="lg"
                    >
                      <Heart className={cn('h-4 w-4', vault?.isLiked && 'fill-current')} />
                      {vault?.isLiked ? 'Liked' : 'Like'}
                    </InteractionButton>
                  )}

                  {/* Stats */}
                  <Separator />
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Total Items</span>
                      <span className="font-semibold">{vault?.objectCount || 0}</span>
                    </div>
                    {vault?.likeCount && vault.likeCount > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Likes</span>
                        <span className="font-semibold">{vault.likeCount}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator />

        {/* Vault Objects Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Content</h2>
            {vault?.vaultObjects && vault.vaultObjects.length > 0 && (
              <p className="text-sm text-muted-foreground">
                {vault.vaultObjects.length} of {vault.objectCount} loaded
              </p>
            )}
          </div>

          {vault?.vaultObjects && vault.vaultObjects.length > 0 ? (
            <InfiniteScrollManager dataLength={vault.vaultObjects.length} loading={loading} hasMore={hasMore} onLoadMore={loadMore}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {vault.vaultObjects.map((obj, index) => {
                  const isObjectUnlocked = obj.isPurchased || isPurchased;
                  const objectPrice = obj.unlockPrice;

                  return (
                    <Card
                      key={`vault-object-${obj.id}-${index}`}
                      className="group overflow-hidden border-none bg-secondary/20 shadow-none transition-all hover:bg-secondary/40 hover:shadow-lg hover:shadow-primary/5"
                    >
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
                                      handlePurchaseObject(obj.id, objectPrice || 0);
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
                })}
              </div>

              {loading && <Loading />}
            </InfiniteScrollManager>
          ) : (
            <div className="flex min-h-[300px] items-center justify-center rounded-lg border-2 border-dashed">
              <div className="text-center">
                <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-sm text-muted-foreground">No objects in this vault yet</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <PaymentModal
        open={paymentData.open}
        onOpenChange={(open) => setPaymentData((prev) => ({ ...prev, open }))}
        amount={paymentData.amount}
        entityId={paymentData.entityId}
        creatorId={vault?.creatorId || ''}
        purchaseType={paymentData.purchaseType}
        title={paymentData.purchaseType === PurchaseType.Vault ? 'Unlock Vault' : 'Unlock Content'}
        description={
          paymentData.purchaseType === PurchaseType.Vault
            ? `Get full access to all ${vault?.objectCount || 0} items in this vault.`
            : 'Unlock this specific item to view it in full resolution.'
        }
      />
    </div>
  );
}
