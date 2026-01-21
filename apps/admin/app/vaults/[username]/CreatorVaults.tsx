'use client';

import { UploadVaultsModal } from '@/components/modals/UploadVaultsModal';
import { useVaultObjects } from '@/hooks/useVaults';
import { DownloadStates, FileType, GetUserQuery, VaultObjectsEntity } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { CreatorVaultUrls } from './CreatorVaultUrls';
import { CreatorVaultsHeader } from './CreatorVaultsHeader';

interface Props {
  data?: GetUserQuery;
}

export default function CreatorVaults({ data: creatorData }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedUrls, setSelectedUrls] = useState<string[]>([]);
  const [uploadVaultModal, setUploadVaultModal] = useState<boolean>(false);
  const [hasSelectedThirty, setHasSelectedThirty] = useState<boolean>(false);
  const [take, setTake] = useState<number>(50);
  const [fileType, setFileType] = useState<FileType>((searchParams.get('fileType') as FileType) || FileType.Image);
  const [status, setStatus] = useState<DownloadStates>((searchParams.get('status') as DownloadStates) || DownloadStates.Pending);
  const { loading, vaultObjects, hasNext, handleLoadMore } = useVaultObjects({
    take,
    relatedUserId: creatorData!.getUser.id,
    status: status ?? DownloadStates.Pending,
    fileType
  });

  const handleToggle = (id: string) => {
    setSelectedUrls((prev) => {
      const hasSelected = prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id];
      return hasSelected;
    });
  };

  const handleSelectThirty = async (hasSelected: boolean, length: number) => {
    setHasSelectedThirty(hasSelected);

    if (length > vaultObjects.length) setTake(length);

    setSelectedUrls(
      !hasSelectedThirty
        ? (vaultObjects
            .filter((vault) => vault.status !== DownloadStates.Fulfilled && vault.status !== DownloadStates.Processing)
            .map((v) => v.id)
            .slice(0, length) ?? [])
        : []
    );
  };

  const handleSetStatus = (stat: DownloadStates) => {
    setStatus(stat);

    const params = new URLSearchParams(window.location.search);
    params.set('status', stat);

    router.push(`?${params.toString()}`);
  };

  const handleSetFileType = (fileType: FileType) => {
    setFileType(fileType);

    const params = new URLSearchParams(window.location.search);
    params.set('fileType', fileType);

    router.push(`?${params.toString()}`);
  };

  const handleCancelUploadVaultModal = () => {
    setHasSelectedThirty(false);
    setSelectedUrls([]);
  };

  return (
    <PageManager>
      <CreatorVaultsHeader
        creatorData={creatorData as GetUserQuery}
        vaultObjects={vaultObjects}
        vaultObjectsCount={vaultObjects.length ?? 0}
        hasSelectedThirty={hasSelectedThirty}
        isLoading={loading}
        onRefetch={() => null}
        onSelectThirty={(selected, count) => handleSelectThirty(selected, count)}
        onSetStatus={(stat) => handleSetStatus(stat)}
        onUploadVaultModal={() => setUploadVaultModal(true)}
        selectedUrls={selectedUrls}
        status={status}
        fileType={fileType}
        onSetFileType={(f) => handleSetFileType(f)}
      />

      {vaultObjects.length ? (
        <InfiniteScrollManager dataLength={vaultObjects.length} hasMore={hasNext} loading={loading} onLoadMore={handleLoadMore}>
          {vaultObjects.map((vaultObject, idx) => (
            <CreatorVaultUrls
              idx={idx}
              key={idx}
              isLoading={loading}
              onToggle={(id) => handleToggle(id)}
              selectedUrls={selectedUrls}
              vaultObject={vaultObject as VaultObjectsEntity}
            />
          ))}
        </InfiniteScrollManager>
      ) : (
        <div className="text-center">
          <p>Looks like there is nothing here</p>
        </div>
      )}

      <UploadVaultsModal
        creatorData={creatorData}
        onJobAdded={() => setHasSelectedThirty(false)}
        isOpen={uploadVaultModal}
        onCancel={handleCancelUploadVaultModal}
        setOpen={setUploadVaultModal}
        vaultObjectIds={selectedUrls}
      />
    </PageManager>
  );
}
