'use client';
import { DownloadVaultsAsBatchModal } from '@/components/modals/DownloadVaultsAsBatchModal';
import { statusLabels } from '@/lib/constants';
import { useLazyQuery, useQuery } from '@apollo/client/react';
import { GET_ALL_OBJECTS_COUNT_OF_EACH_TYPE, GET_TOTAL_VAULT_OBJECTS_COUNT_BY_TYPE_QUERY } from '@workspace/gql/api/vaultsAPI';
import { DownloadStates, SortBy } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Dropdown } from '@workspace/ui/globals/Dropdown';
import { LoadingButton } from '@workspace/ui/globals/LoadingButton';
import { useIsMobile } from '@workspace/ui/hooks/useIsMobile';
import { Ban, CheckLine, Download, ExternalLink, Funnel, FunnelX, ListTodo, LoaderIcon, RefreshCcw } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

export const statusButtons = [
  {
    className: 'text-xs font-medium bg-blue-500 text-white',
    label: 'fulfilled',
    status: DownloadStates.Fulfilled,
    icon: <CheckLine />
  },
  {
    className: 'text-xs font-medium animate-pulse',
    label: 'pending',
    status: DownloadStates.Pending,
    icon: <ListTodo />
  },
  {
    className: 'text-xs font-medium bg-orange-500 text-white dark:bg-emerald-400',
    label: 'processing',
    status: DownloadStates.Processing,
    icon: <LoaderIcon />
  },
  {
    className: 'text-xs font-medium bg-red-500 text-white dark:bg-red-600',
    label: 'rejected',
    status: DownloadStates.Rejected,
    icon: <Ban />
  }
];

interface Props {
  count: number;
  selectedCreatorIds: string[];
  setSelectedCreatorIds: React.Dispatch<React.SetStateAction<string[]>>;
  onRefetch: () => unknown;
  onSelectN: (n: number) => void;
  onFilter: (text: string) => void;
  filterBy: DownloadStates;
  onFilterBy: (stats: DownloadStates) => unknown;
  onSortBy: (sortBy: SortBy) => unknown;
  sortBy: SortBy;
}

export const VaultsHeader: React.FC<Props> = ({
  count,
  onRefetch,
  onSelectN,
  selectedCreatorIds,
  setSelectedCreatorIds,
  onFilter,
  filterBy,
  onFilterBy,
  onSortBy,
  sortBy
}) => {
  const [numToSelect, setNumToSelect] = useState<number>(30);
  const [filterText, setFilterText] = useState('');
  const [getCountOfObjects] = useLazyQuery(GET_TOTAL_VAULT_OBJECTS_COUNT_BY_TYPE_QUERY);
  const [downloadVaultsAsBatchModal, setDownloadAVaultsAsBatchModal] = useState<boolean>(false);
  const { data: getAllObjectsCount, refetch: refetchObjectCounts } = useQuery(GET_ALL_OBJECTS_COUNT_OF_EACH_TYPE);
  const isMobile = useIsMobile();

  const handleGetCountOfObjects = async (status: DownloadStates) => {
    try {
      toast.loading('Fetching latest count...');
      const { data } = await getCountOfObjects({ variables: { input: { status } } });
      toast.dismiss();
      toast.success(data?.getTotalObjectsAsType, { description: statusLabels[status] });
      return data?.getTotalObjectsAsType;
    } catch {
      toast.dismiss();
      toast.error('Something wrong happened!');
    }
  };

  const handleRefetchObjectCounts = async () => {
    await refetchObjectCounts();
  };

  useEffect(() => {
    onFilter(filterText);
  }, [filterText]); // eslint-disable-line

  return (
    <div className="flex flex-col space-y-2 sticky z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md p-2 rounded-md">
      <div className="flex flex-wrap items-center justify-between space-x-1 space-y-1">
        <Button>{count}</Button>

        <div className="flex space-x-2 items-center">
          <Input type="number" min={1} value={numToSelect} onChange={(e) => setNumToSelect(Number(e.target.value))} className="w-20" />
          <Button onClick={() => onSelectN(numToSelect)}>Select {numToSelect}</Button>
        </div>

        <Input
          name="idOrName"
          placeholder="Filter by ID or name..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="w-48"
        />

        <Button
          variant="outline"
          size={'icon'}
          className="ml-auto"
          onClick={() => {
            onRefetch();
            handleRefetchObjectCounts();
          }}
        >
          <RefreshCcw />
        </Button>
        <div className="flex flex-row space-x-1">
          <Dropdown
            filterBy={filterBy}
            enumValue={DownloadStates}
            onFilterBy={(val) => onFilterBy(val as DownloadStates)}
            trigger={{ icon: Funnel }}
            label="State"
          />
          <Dropdown
            filterBy={sortBy}
            enumValue={SortBy}
            onFilterBy={(val) => onSortBy(val as SortBy)}
            trigger={{ icon: FunnelX }}
            label="Sort by"
          />
        </div>
      </div>

      <div className="flex flex-col justify-between">
        <div className="flex flex-row space-x-2">
          {statusButtons.map(({ className, icon, status, label }, idx) => (
            <Button key={idx} size={'lg'} className={className} onClick={() => handleGetCountOfObjects(status)}>
              {isMobile ? (
                icon
              ) : (
                <div className="flex flex-row gap-3">
                  {getAllObjectsCount?.getCountOfObjectsOfEachType[label as keyof typeof getAllObjectsCount.getCountOfObjectsOfEachType]}
                  <Link className="cursor-pointer" href={`?status=${label}`} onClick={(e) => e.preventDefault()}>
                    <ExternalLink />
                  </Link>
                </div>
              )}
            </Button>
          ))}
          <LoadingButton
            variant="outline"
            size="sm"
            onClick={() => setDownloadAVaultsAsBatchModal(true)}
            disabled={!selectedCreatorIds.length}
            title={String(selectedCreatorIds.length)}
            Icon={Download}
          />
          <LoadingButton
            variant="outline"
            size="sm"
            onClick={() => {
              setDownloadAVaultsAsBatchModal(false);
              setSelectedCreatorIds([]);
            }}
            disabled={!selectedCreatorIds.length}
            title={'Cancel'}
          />
        </div>
      </div>
      <DownloadVaultsAsBatchModal
        creatorIds={selectedCreatorIds}
        isOpen={downloadVaultsAsBatchModal}
        onCancel={() => setSelectedCreatorIds([])}
        onJobAdded={() => null}
        setOpen={setDownloadAVaultsAsBatchModal}
      />
    </div>
  );
};
