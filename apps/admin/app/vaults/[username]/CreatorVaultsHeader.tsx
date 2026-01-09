import { DownloadStates, FileType, GetUserQuery, VaultObjectsEntity } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@workspace/ui/components/dropdown-menu';
import { Dropdown } from '@workspace/ui/globals/Dropdown';
import { LoadingButton } from '@workspace/ui/globals/LoadingButton';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpWideNarrow, Download, ListFilterPlus, LucideLassoSelect, MoreHorizontal, RefreshCcw } from 'lucide-react';

interface Props {
  vaultObjectsCount: number;
  onSetStatus: (val: DownloadStates) => unknown;
  creatorData: GetUserQuery;
  hasSelectedThirty: boolean;
  onSelectThirty: (hasSelected: boolean, count: number) => unknown;
  onRefetch: () => unknown;
  isLoading: boolean;
  selectedUrls: string[];
  onUploadVaultModal: (open: boolean) => unknown;
  vaultObjects: VaultObjectsEntity[];
  status: DownloadStates;
  fileType: FileType;
  onSetFileType: (val: FileType) => unknown;
}

export const CreatorVaultsHeader: React.FC<Props> = ({
  creatorData,
  vaultObjectsCount,
  hasSelectedThirty,
  onSelectThirty,
  onSetStatus,
  isLoading,
  onRefetch,
  onUploadVaultModal,
  selectedUrls,
  vaultObjects,
  status,
  fileType,
  onSetFileType
}) => {
  return (
    <div className="flex items-center justify-between content-center space-x-1 sticky z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md p-2 rounded-md">
      <div className="flex flex-col space-y-2 items-center">
        <div className="flex flex-row space-x-2 items-center">
          <Button size="sm">{vaultObjectsCount}</Button>
          <Dropdown
            enumValue={DownloadStates}
            filterBy={status}
            onFilterBy={(val) => onSetStatus(val as DownloadStates)}
            trigger={{ icon: ListFilterPlus }}
            label="Status"
          />
          <Dropdown
            enumValue={FileType}
            filterBy={fileType}
            onFilterBy={(val) => onSetFileType(val as FileType)}
            trigger={{ icon: ArrowUpWideNarrow }}
            label="File Type"
          />
          <Badge className="text-xs">{creatorData?.getUser.username}</Badge>
        </div>
        <div className="flex flex-row space-x-1">
          <Button size="sm" className="">
            {creatorData.getUser?.pendingCount || 0}
          </Button>
          <Button size="sm" className="bg-orange-500">
            {creatorData.getUser?.processingCount || 0}
          </Button>
          <Button size="sm" className="bg-red-500">
            {creatorData.getUser?.rejectedCount || 0}
          </Button>
          <Button size="sm" className="bg-blue-500">
            {creatorData.getUser?.fulfilledCount || 0}
          </Button>
        </div>
      </div>

      <div className="flex flex-row space-x-2 items-center">
        <AnimatePresence>
          {hasSelectedThirty ? (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
              <Button variant="destructive" size="sm" onClick={() => onSelectThirty(false, 0)}>
                Cancel
              </Button>
            </motion.div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <LucideLassoSelect />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Select</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={'30'} onValueChange={(val) => onSelectThirty(true, Number(val))}>
                  <DropdownMenuRadioItem value={'5'}>5</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={'10'}>10</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={'30'}>30</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={'100'}>100</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={'200'}>200</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={'300'}>300</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={'500'}>500</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={'1000'}>1000</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={String(vaultObjects.length)}>All</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </AnimatePresence>

        <LoadingButton
          variant="outline"
          size="sm"
          onClick={() => onUploadVaultModal(true)}
          disabled={!selectedUrls.length}
          title={String(selectedUrls.length)}
          Icon={Download}
          loading={isLoading}
        />
        <Button variant="outline" size="sm" onClick={onRefetch} className="hidden sm:flex">
          <RefreshCcw />
        </Button>

        <div className="sm:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioItem value="refetch" onClick={onRefetch}>
                Refresh
              </DropdownMenuRadioItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
