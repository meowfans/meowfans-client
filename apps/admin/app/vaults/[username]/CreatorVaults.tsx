'use client';

import { UploadVaultsModal } from '@/components/modals/UploadVaultsModal';
import { useVaultObjects } from '@/hooks/useVaults';
import { DownloadStates, FileType, GetUserQuery, VaultObjectsEntity } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { ScrollArea } from '@workspace/ui/components/scroll-area';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { ArrowBigDown, ArrowBigUp } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { CreatorVaultUrls } from './CreatorVaultUrls';
import { CreatorVaultsHeader } from './CreatorVaultsHeader';

interface Props {
  data?: GetUserQuery;
}

export default function CreatorVaults({ data: creatorData }: Props) {
  const LIMIT = 500;
  const router = useRouter();
  const searchParams = useSearchParams();
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [selectedUrls, setSelectedUrls] = useState<string[]>([]);
  const [uploadVaultModal, setUploadVaultModal] = useState<boolean>(false);
  const [hasSelectedThirty, setHasSelectedThirty] = useState<boolean>(false);
  const [fileType, setFileType] = useState<FileType>(FileType.Image);
  const [status, setStatus] = useState<DownloadStates>((searchParams.get('status') as DownloadStates) || DownloadStates.Pending);
  const { handleRefetch, loading, vaultObjects, onFetchMore, setHasNext, hasNext } = useVaultObjects({
    creatorId: creatorData!.getUser.id,
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
    let vaultObjectData = vaultObjects || [];

    if (length > vaultObjects.length) {
      const newVaultObjects = await onFetchMore(length - vaultObjects.length);
      vaultObjectData = [...(vaultObjects || []), ...(newVaultObjects || [])];
    }

    setSelectedUrls(
      !hasSelectedThirty
        ? (vaultObjectData
            .filter((vault) => vault.status !== DownloadStates.Fulfilled && vault.status !== DownloadStates.Processing)
            .map((v) => v.id)
            .slice(0, length) ?? [])
        : []
    );
  };

  const handleScrollToTheBottom = () => {
    requestAnimationFrame(() => {
      bottomRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
    });
  };

  const handleScrollToTheTop = () => {
    requestAnimationFrame(() => {
      topRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    });
  };

  useEffect(() => {
    setHasNext(true);
  }, [status]); // eslint-disable-line

  useEffect(() => {
    handleRefetch();
  }, [status]); //eslint-disable-line

  return (
    <PageManager className="w-full mb-15">
      <CreatorVaultsHeader
        creatorData={creatorData as GetUserQuery}
        vaultObjects={vaultObjects}
        vaultObjectsCount={vaultObjects.length ?? 0}
        hasSelectedThirty={hasSelectedThirty}
        isLoading={loading}
        onRefetch={handleRefetch}
        onSelectThirty={(selected, count) => handleSelectThirty(selected, count)}
        onSetStatus={(stat) => {
          setStatus(stat);
          router.push(`?status=${stat}`);
        }}
        onUploadVaultModal={() => setUploadVaultModal(true)}
        selectedUrls={selectedUrls}
        status={status}
        fileType={fileType}
        onSetFileType={(f) => setFileType(f)}
      />

      {vaultObjects.length ? (
        <div className="relative h-full">
          <ScrollArea className="h-[calc(100vh-160px)] w-full p-1">
            <div ref={topRef} className="p-0" />
            {vaultObjects.map((vaultObject, idx) => (
              <div key={idx} className="flex flex-col rounded-md border my-1 p-2">
                <CreatorVaultUrls
                  idx={idx}
                  isLoading={loading}
                  onToggle={(id) => handleToggle(id)}
                  selectedUrls={selectedUrls}
                  vaultObject={vaultObject as VaultObjectsEntity}
                />
              </div>
            ))}

            {hasNext ? (
              <div className="flex items-center justify-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => onFetchMore(LIMIT)}>
                  Next
                </Button>
              </div>
            ) : (
              <div className="text-center tracking-tight py-4">
                <p>Looks like you have reached the end!</p>
              </div>
            )}
            <div ref={bottomRef} className="m-0 p-0" />
          </ScrollArea>
          <div className="absolute right-3 bottom-20 flex flex-col gap-3 sm:bottom-10">
            <Button size="icon" onClick={handleScrollToTheTop} className="rounded-full shadow-lg">
              <ArrowBigUp />
            </Button>
            <Button size="icon" onClick={handleScrollToTheBottom} className="rounded-full shadow-lg">
              <ArrowBigDown />
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p>Looks like there is nothing here</p>
        </div>
      )}

      <UploadVaultsModal
        creatorData={creatorData}
        onJobAdded={() => {
          handleRefetch();
          setHasSelectedThirty(false);
        }}
        isOpen={uploadVaultModal}
        onCancel={() => {
          setHasSelectedThirty(false);
          setSelectedUrls([]);
        }}
        setOpen={setUploadVaultModal}
        vaultObjectIds={selectedUrls}
      />
    </PageManager>
  );
}
