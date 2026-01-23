'use client';

import { DownloadStates, FileType, UsersEntity, VaultObjectsEntity } from '@workspace/gql/generated/graphql';
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
import { MultiEnumDropdown } from '@workspace/ui/globals/MultiEnumDropdown';
import { ReturnToPreviousPage } from '@workspace/ui/globals/ReturnToPreviousPage';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpWideNarrow, Download, ListFilterPlus, LucideLassoSelect, RefreshCcw } from 'lucide-react';

interface Props {
  vaultObjectsCount: number;
  onSetStatus: (val: DownloadStates) => void;
  user: UsersEntity;
  hasSelectedThirty: boolean;
  onSelectThirty: (hasSelected: boolean, count: number) => void;
  onRefetch: () => void;
  isLoading: boolean;
  selectedUrls: string[];
  onUploadVaultModal: () => void;
  vaultObjects: VaultObjectsEntity[];
  status: DownloadStates;
  fileType: FileType[];
  onSetFileType: (val: FileType[]) => void;
}

export const CreatorVaultsHeader: React.FC<Props> = ({
  user,
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
    <div className="sticky top-15 backdrop-blur-md border-b bg-white/90 dark:bg-neutral-900/90">
      <div className="flex flex-wrap justify-between gap-1 px-2 py-1">
        <ReturnToPreviousPage applyReturn />

        <div className="flex items-center space-x-1">
          <Button size="sm">{vaultObjectsCount}</Button>
          <Badge className="text-[11px] truncate max-w-30">{user.username}</Badge>
        </div>

        <div className="flex space-x-1">
          <Dropdown
            enumValue={DownloadStates}
            filterBy={status}
            onFilterBy={(v) => onSetStatus(v as DownloadStates)}
            trigger={{ icon: ListFilterPlus }}
            label="Status"
          />

          <MultiEnumDropdown
            enumValue={FileType}
            value={fileType}
            onChange={onSetFileType}
            trigger={{ icon: ArrowUpWideNarrow }}
            label="File Type"
          />

          <AnimatePresence initial={false}>
            {hasSelectedThirty ? (
              <motion.div key="cancel" animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Button size="sm" variant="destructive" onClick={() => onSelectThirty(false, 0)}>
                  Cancel
                </Button>
              </motion.div>
            ) : (
              <motion.div key="select" animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline">
                      <LucideLassoSelect />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Select</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup onValueChange={(v) => onSelectThirty(true, Number(v))}>
                      {['5', '10', '30', '50', '100', '200', '500'].map((v) => (
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
            disabled={!selectedUrls.length}
            Icon={Download}
            loading={isLoading}
            onClick={onUploadVaultModal}
          />

          <Button size="sm" variant="outline" onClick={onRefetch}>
            <RefreshCcw />
          </Button>
        </div>
      </div>
    </div>
  );
};
