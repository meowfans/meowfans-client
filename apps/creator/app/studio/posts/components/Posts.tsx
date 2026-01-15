'use client';

import { useState } from 'react';
import { getCoreRowModel, getSortedRowModel, useReactTable, SortingState } from '@tanstack/react-table';
import { usePostsInfo } from '@/hooks/usePosts';
import { PostTypes, SortOrder } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { PostHeader } from './PostHeader';
import { ColumnDef } from '@tanstack/react-table';
import { GetPostsInfoOutput } from '@workspace/gql/generated/graphql';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { PostRow } from './PostsRow';
import { PostShareCard } from './PostShareCard';
import { useUtilsStore } from '@/hooks/store/utils.store';

const postColumns: ColumnDef<GetPostsInfoOutput>[] = [
  {
    accessorKey: 'preview',
    header: 'Post',
    enableSorting: false
  },
  {
    accessorKey: 'viewCount',
    header: ({ column }) => (
      <Button variant="ghost" size="sm" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Views
        <ArrowUpDown className="ml-1 h-3 w-3" />
      </Button>
    )
  },
  { accessorKey: 'likeCount', header: 'Likes' },
  { accessorKey: 'commentCount', header: 'Comments' },
  { accessorKey: 'unlockPrice', header: 'Unlock' },
  { accessorKey: 'totalEarning', header: 'Earned' },
  { accessorKey: 'createdAt', header: 'Created' }
];

export const Posts = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState<SortOrder>(SortOrder.Desc);
  const [postType, setPostType] = useState<PostTypes[]>(Object.values(PostTypes));
  const { shareModal } = useUtilsStore();

  const { postsInfo, hasMore, loading, handleLoadMore } = usePostsInfo({
    take: 30,
    searchTerm: searchTerm || undefined,
    postTypes: postType ? undefined : [postType],
    orderBy
  });

  const table = useReactTable({
    data: postsInfo,
    columns: postColumns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true
  });

  return (
    <PageManager>
      <InfiniteScrollManager dataLength={postsInfo.length} hasMore={hasMore} loading={loading} onLoadMore={handleLoadMore}>
        <PostHeader
          orderBy={orderBy}
          postType={postType}
          searchTerm={searchTerm}
          setOrderBy={setOrderBy}
          setPostTypes={setPostType}
          setSearchTerm={setSearchTerm}
        />

        <div className="hidden md:grid grid-cols-[80px_1fr_1fr_1fr_1fr_1fr_1fr] gap-4 px-3 py-2 border-t text-xs font-semibold text-muted-foreground">
          {table
            .getHeaderGroups()
            .map((headerGroup) =>
              headerGroup.headers.map((header) => (
                <div key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : typeof header.column.columnDef.header === 'function'
                      ? header.column.columnDef.header(header.getContext())
                      : header.column.columnDef.header}
                </div>
              ))
            )}
        </div>
        <div className="flex flex-col divide-y border-b">
          {table.getRowModel().rows.map((row) => (
            <PostRow key={row.original.id} post={row.original} />
          ))}
        </div>
        {shareModal && <PostShareCard post={shareModal} shareUrl={`https://meowfans.com/post/${shareModal.id}`} />}
      </InfiniteScrollManager>
    </PageManager>
  );
};
