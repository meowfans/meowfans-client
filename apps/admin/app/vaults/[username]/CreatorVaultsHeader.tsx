'use client';

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
import { ReturnToPreviousPage } from '@workspace/ui/globals/ReturnToPreviousPage';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpWideNarrow, Download, ListFilterPlus, LucideLassoSelect, RefreshCcw } from 'lucide-react';

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
    <div
      className="
        sticky top-15
        bg-white/90 dark:bg-neutral-900/90
        backdrop-blur-md
        border-b
        will-change-transform
      "
    >
      <div
        className="
          flex flex-wrap justify-between
          gap-1 px-2 py-1
        "
      >
        <ReturnToPreviousPage applyReturn />

        <div className="flex flex-row space-x-1 items-center justify-center">
          <Button size="sm" className="px-2">
            {vaultObjectsCount}
          </Button>
          <Badge className="text-[11px] truncate max-w-30">{creatorData.getUser.username}</Badge>
        </div>

        <div className="flex flex-row space-x-1">
          <Button size="sm">{creatorData.getUser?.pendingCount || 0}</Button>
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

        <div className="flex flex-row space-x-1">
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

          <AnimatePresence initial={false}>
            {hasSelectedThirty ? (
              <motion.div
                key="cancel"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <Button size="sm" variant="destructive" onClick={() => onSelectThirty(false, 0)}>
                  Cancel
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="select"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline">
                      <LucideLassoSelect />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Fetch and select</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value="30" onValueChange={(val) => onSelectThirty(true, Number(val))}>
                      {['5', '10', '30', '50', '100', '200', '300', '500', '1000'].map((v) => (
                        <DropdownMenuRadioItem key={v} value={v}>
                          {v}
                        </DropdownMenuRadioItem>
                      ))}
                      <DropdownMenuRadioItem value={String(vaultObjects.length)}>All</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>
            )}
          </AnimatePresence>

          <LoadingButton
            size="sm"
            variant="outline"
            onClick={() => onUploadVaultModal(true)}
            disabled={!selectedUrls.length}
            Icon={Download}
            loading={isLoading}
          />

          <Button size="sm" variant="outline" onClick={onRefetch}>
            <RefreshCcw />
          </Button>
        </div>
      </div>
    </div>
  );
};
