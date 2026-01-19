'use client';
import { DownloadVaultsAsBatchModal } from '@/components/modals/DownloadVaultsAsBatchModal';
import { useGetAllObjectsCount } from '@/hooks/useVaults';
import { DownloadStates, GetAllObjectsCountOutput, SortBy } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@workspace/ui/components/dropdown-menu';
import { Input } from '@workspace/ui/components/input';
import { Dropdown } from '@workspace/ui/globals/Dropdown';
import {
  ArrowUpWideNarrow,
  Ban,
  BarChart3,
  CheckCheck,
  Download,
  ListFilterPlus,
  ListTodo,
  Loader,
  LoaderIcon,
  Search,
  Settings2,
  X
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

export const statusButtons = [
  {
    className: 'text-xs font-medium bg-blue-500 text-white hover:bg-blue-600',
    label: 'fulfilled',
    status: DownloadStates.Fulfilled,
    icon: <CheckCheck className="h-4 w-4" />
  },
  {
    className: 'text-xs font-medium animate-pulse hover:bg-accent',
    label: 'pending',
    status: DownloadStates.Pending,
    icon: <ListTodo className="h-4 w-4" />
  },
  {
    className: 'text-xs font-medium bg-orange-500 text-white dark:bg-emerald-400 hover:bg-orange-600 dark:hover:bg-emerald-500',
    label: 'processing',
    status: DownloadStates.Processing,
    icon: <LoaderIcon className="h-4 w-4" />
  },
  {
    className: 'text-xs font-medium bg-red-500 text-white dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700',
    label: 'rejected',
    status: DownloadStates.Rejected,
    icon: <Ban className="h-4 w-4" />
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
  const [filterText, setFilterText] = useState<string>('');
  const { fetchCounts, objectsCount, loading } = useGetAllObjectsCount();
  const [downloadVaultsAsBatchModal, setDownloadAVaultsAsBatchModal] = useState<boolean>(false);

  const handleFetchObjectsCount = async () => {
    await fetchCounts();
  };

  useEffect(() => {
    onFilter(filterText);
  }, [filterText]); // eslint-disable-line

  return (
    <div className="flex flex-col space-y-4 sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 p-4 border-b rounded-b-md shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1">
          <Badge variant="outline" className="h-9 px-4 text-sm shrink-0">
            Total: {count}
          </Badge>
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              name="idOrName"
              placeholder="Filter by ID or name..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="pl-9 w-full"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <DropdownMenu
            onOpenChange={(open) => {
              if (open) handleFetchObjectsCount();
            }}
          >
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-9 gap-2"
                // onClick does not work under dropdown menu trigger
                // onClick={handleFetchObjectsCount}
                // onPointerDown={() => console.log('pointer down')}
              >
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Stats</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-50">
              <DropdownMenuLabel>Vault Status Counts</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {statusButtons.map(({ icon, status, label }, idx) => (
                <DropdownMenuItem key={idx} className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2">
                    {icon}
                    <span className="capitalize">
                      {label} {loading ? <Loader className="animate-spin" /> : objectsCount[label as keyof GetAllObjectsCountOutput]}
                    </span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-2">
                <Settings2 className="h-4 w-4" />
                <span className="hidden sm:inline">Options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
              <DropdownMenuLabel>Selection</DropdownMenuLabel>
              <div className="p-2 flex gap-2">
                <Input type="number" min={1} value={numToSelect} onChange={(e) => setNumToSelect(Number(e.target.value))} className="h-8" />
                <Button size="sm" variant="secondary" onClick={() => onSelectN(numToSelect)}>
                  Select
                </Button>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Filter State</DropdownMenuLabel>
              <div className="p-2">
                <Dropdown
                  filterBy={filterBy}
                  enumValue={DownloadStates}
                  onFilterBy={(val) => onFilterBy(val as DownloadStates)}
                  trigger={{ icon: ListFilterPlus }}
                  label="State"
                />
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Sort Order</DropdownMenuLabel>
              <div className="p-2">
                <Dropdown
                  filterBy={sortBy}
                  enumValue={SortBy}
                  onFilterBy={(val) => onSortBy(val as SortBy)}
                  trigger={{ icon: ArrowUpWideNarrow }}
                  label="Sort"
                />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {selectedCreatorIds.length > 0 && (
        <div className="flex flex-col md:flex-row md:items-center justify-end gap-4">
          <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-5 w-full md:w-auto p-2 bg-accent/20 rounded-md border border-accent/40">
            <Badge variant="secondary" className="h-8 shrink-0">
              {selectedCreatorIds.length} Selected
            </Badge>
            <Button variant="default" size="sm" onClick={() => setDownloadAVaultsAsBatchModal(true)} className="h-8 grow md:grow-0">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedCreatorIds([])}
              className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
              title="Clear selection"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

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
