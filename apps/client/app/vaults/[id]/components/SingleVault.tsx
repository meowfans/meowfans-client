'use client';

import { PageHandler } from '@/components/PageHandler';
import { PaymentModal } from '@/components/PaymentModal';
import { useLikeMutations } from '@/hooks/client/useLikeMutations';
import { useServerSingleVault } from '@/hooks/server/useServerSingleVault';
import { GetPublicSingleVaultOutput, PurchaseType, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { Separator } from '@workspace/ui/components/separator';
import { useState } from 'react';
import { SingleVaultActionCard } from './SingleVaultActionCard';
import { SingleVaultContent } from './SingleVaultContent';
import { SingleVaultHeader } from './SingleVaultHeader';
import { SingleVaultHero } from './SingleVaultHero';

interface SingleVaultProps {
  initialVault: GetPublicSingleVaultOutput | null;
}

export function SingleVault({ initialVault }: SingleVaultProps) {
  const { likeVault } = useLikeMutations();
  const { vault, loading, hasMore, loadMore } = useServerSingleVault(
    {
      relatedEntityId: initialVault?.id,
      take: 30,
      sortBy: SortBy.VaultObjectSuffix,
      orderBy: SortOrder.Asc
    },
    initialVault
  );

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

  const handlePurchase = async () => {
    if (!vault) return;
    setPaymentData({
      open: true,
      amount: vault.unlockPrice || 0,
      entityId: vault.id,
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
    if (!vault?.id) return;
    await likeVault(vault.id);
  };

  const isPurchased = vault?.isPurchased || false;
  const hasPrice = (vault?.unlockPrice || 0) > 0;

  return (
    <PageHandler isLoading={loading && !vault} isEmpty={!vault && !loading}>
      <div className="flex flex-1 flex-col">
        <SingleVaultHero
          preview={vault?.preview}
          description={vault?.description}
          objectCount={vault?.objectCount}
          likeCount={vault?.likeCount}
          isPurchased={isPurchased}
          vaultObjects={vault?.vaultObjects || []}
          loadMore={loadMore}
          hasMore={hasMore}
          loading={loading}
        />

        <div className="mx-auto w-full max-w-7xl space-y-8 p-6">
          <div className="space-y-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <SingleVaultHeader
                description={vault?.description}
                username={vault?.username}
                avatarUrl={vault?.avatarUrl}
                keywords={vault?.keywords}
                creatorId={vault?.creatorId}
              />

              <SingleVaultActionCard
                hasPrice={hasPrice}
                isPurchased={isPurchased}
                unlockPrice={vault?.unlockPrice}
                isLiked={vault?.isLiked}
                objectCount={vault?.objectCount}
                likeCount={vault?.likeCount}
                onPurchase={handlePurchase}
                onLike={handleLike}
              />
            </div>
          </div>

          <Separator />

          <SingleVaultContent
            vaultObjects={vault?.vaultObjects || []}
            objectCount={vault?.objectCount}
            isVaultPurchased={isPurchased}
            loading={loading}
            hasMore={hasMore}
            loadMore={loadMore}
            onPurchaseObject={handlePurchaseObject}
          />
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
    </PageHandler>
  );
}
