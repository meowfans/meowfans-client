'use client';

import { UploadVaultsModal } from '@/components/modals/UploadVaultsModal';
import { useVaultObjects } from '@/hooks/useVaults';
import { DownloadStates, FileType, UsersEntity } from '@workspace/gql/generated/graphql';
import { EmptyElement } from '@workspace/ui/globals/EmptyElement';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { CreatorVaultUrls } from './CreatorVaultUrls';
import { CreatorVaultsHeader } from './CreatorVaultsHeader';

interface Props {
  user?: UsersEntity;
}

const parseEnumArray = <T extends string>(value: string | null, allowed: readonly T[], fallback: T[]): T[] => {
  if (!value) return fallback;
  return value.split(',').filter((v): v is T => allowed.includes(v as T));
};

export default function CreatorVaults({ user }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedUrls, setSelectedUrls] = useState<string[]>([]);
  const [uploadVaultModal, setUploadVaultModal] = useState(false);
  const [hasSelectedThirty, setHasSelectedThirty] = useState(false);
  const [take, setTake] = useState(50);

  const fileType = useMemo(
    () => parseEnumArray(searchParams.get('fileType'), Object.values(FileType), [FileType.Image, FileType.Video]),
    [searchParams]
  );

  const status = useMemo(() => (searchParams.get('status') as DownloadStates) ?? DownloadStates.Pending, [searchParams]);

  const { loading, vaultObjects, hasNext, handleLoadMore } = useVaultObjects({
    take,
    relatedUserId: user?.id,
    status,
    fileType
  });

  const handleToggle = (id: string) => {
    setSelectedUrls((prev) => (prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id]));
  };

  const handleSelectThirty = (select: boolean, count: number) => {
    setHasSelectedThirty(select);

    if (!select) {
      setSelectedUrls([]);
      return;
    }

    if (count > vaultObjects.length) setTake(count);

    const selectable = vaultObjects
      .filter((v) => ![DownloadStates.Fulfilled, DownloadStates.Processing].includes(v.status))
      .slice(0, count)
      .map((v) => v.id);

    setSelectedUrls(selectable);
  };

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`?${params.toString()}`);
  };

  return (
    <PageManager>
      <CreatorVaultsHeader
        user={user as UsersEntity}
        vaultObjects={vaultObjects}
        vaultObjectsCount={vaultObjects.length}
        hasSelectedThirty={hasSelectedThirty}
        isLoading={loading}
        onRefetch={() => null}
        onSelectThirty={handleSelectThirty}
        onSetStatus={(s) => updateQuery('status', s)}
        onUploadVaultModal={() => setUploadVaultModal(true)}
        selectedUrls={selectedUrls}
        status={status}
        fileType={fileType}
        onSetFileType={(f) => updateQuery('fileType', f.join(','))}
      />

      {vaultObjects.length ? (
        <InfiniteScrollManager dataLength={vaultObjects.length} hasMore={hasNext} loading={loading} onLoadMore={handleLoadMore}>
          <CreatorVaultUrls isLoading={loading} onToggle={handleToggle} selectedUrls={selectedUrls} vaultObjects={vaultObjects} />
        </InfiniteScrollManager>
      ) : (
        <EmptyElement
          title={`Import ${fileType.join(', ').toLowerCase()}s`}
          description={`No ${status.toLowerCase()} ${fileType.join(', ').toLowerCase()} found`}
        />
      )}

      <UploadVaultsModal
        user={user}
        isOpen={uploadVaultModal}
        setOpen={setUploadVaultModal}
        vaultObjectIds={selectedUrls}
        onCancel={() => {
          setHasSelectedThirty(false);
          setSelectedUrls([]);
        }}
        onJobAdded={() => setHasSelectedThirty(false)}
      />
    </PageManager>
  );
}
