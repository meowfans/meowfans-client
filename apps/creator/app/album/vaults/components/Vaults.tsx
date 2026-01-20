'use client';

import { useUtilsStore } from '@/hooks/store/utils.store';
import { useVaults } from '@/hooks/useVaults';
import { PostTypes, SortOrder } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@workspace/ui/components/table';
import { EmptyElement } from '@workspace/ui/globals/EmptyElement';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { MEOW_FANS_AVATAR } from '@workspace/ui/lib/constants';
import { cn } from '@workspace/ui/lib/utils';
import moment from 'moment';
import { useState } from 'react';
import { VaultsActionsBar } from './VaultsActionsBar';
import { VaultsHeader } from './VaultsHeader';
import { VaultsShareCard } from './VaultsShareCard';

export const Vaults = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState<SortOrder>(SortOrder.Desc);
  const [postType, setPostType] = useState<PostTypes[]>(Object.values(PostTypes));
  const { shareVaultModal } = useUtilsStore();

  const { vaults, hasMore, loading, handleLoadMore } = useVaults({
    take: 30,
    searchTerm: searchTerm || undefined,
    postTypes: postType,
    orderBy
  });

  return (
    <PageManager>
      <VaultsHeader
        orderBy={orderBy}
        postType={postType}
        searchTerm={searchTerm}
        setOrderBy={setOrderBy}
        setPostTypes={setPostType}
        setSearchTerm={setSearchTerm}
      />
      {vaults.length ? (
        <InfiniteScrollManager dataLength={vaults.length} hasMore={hasMore} loading={loading} onLoadMore={handleLoadMore}>
          <Table>
            <TableHeader className="z-30 bg-muted/50 backdrop-blur">
              <TableRow>
                <TableHead className="sticky left-0 z-20 bg-card min-w-20">Preview</TableHead>
                <TableHead className="text-center min-w-27.5">Views</TableHead>
                <TableHead className="text-center min-w-27.5">Objects</TableHead>
                <TableHead className="text-center min-w-27.5">Likes</TableHead>
                <TableHead className="text-center min-w-27.5">Unlock price</TableHead>
                <TableHead className="text-center min-w-27.5">Total revenue</TableHead>
                <TableHead className="text-center bg-card">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {vaults.map((vault) => (
                <TableRow key={vault.id} className={cn('hover:bg-muted/30 transition-colors')}>
                  <TableCell className="sticky left-0 z-10 bg-card" id="name-cell">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-4 w-4 sm:h-10 sm:w-10">
                        <AvatarImage src={vault.preview ?? MEOW_FANS_AVATAR} />
                        <AvatarFallback>{'?'}</AvatarFallback>
                      </Avatar>

                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground truncate tracking-tight">{vault.description?.slice(0, 10)}...</p>
                        <p className="text-xs text-muted-foreground truncate">{moment(vault.createdAt).fromNow()}</p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="text-center font-medium">{vault.viewCount ?? 0}</TableCell>
                  <TableCell className="text-center font-medium">{vault.objectCount ?? 0}</TableCell>
                  <TableCell className="text-center table-cell">{vault.likeCount ?? 0}</TableCell>
                  <TableCell className="text-center table-cell">{vault.unlockPrice ?? 0}</TableCell>
                  <TableCell className="text-center table-cell">{vault.totalEarning ?? 0}</TableCell>
                  <TableCell className="bg-card table-cell">
                    <div className="flex justify-center gap-2">
                      <VaultsActionsBar disabled={Boolean(vault.deletedAt)} vault={vault} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {shareVaultModal && <VaultsShareCard vault={shareVaultModal} shareUrl={`https://meowfans.app/posts/${shareVaultModal.id}`} />}
        </InfiniteScrollManager>
      ) : (
        <EmptyElement description="No vaults yet" title="You will find your vaults here" />
      )}
    </PageManager>
  );
};
