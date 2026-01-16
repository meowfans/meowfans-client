import { ColumnDef, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import { GetPostsInfoOutput } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';
import { ArrowUpDown } from 'lucide-react';
import { PostRowDesktop } from './PostRowDesktop';
import { PostRowMobile } from './PostRowMobile';

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

interface PostTableProps {
  postsInfo: GetPostsInfoOutput[];
  sorting: SortingState;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
}

export const PostTable = ({ postsInfo, sorting, setSorting }: PostTableProps) => {
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
    <div className="w-full h-full">
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
        {table.getRowModel().rows.map((row) => {
          const isDeleted = Boolean(row.original.deletedAt);
          return (
            <div
              key={row.original.id}
              className={cn('relative px-3 py-2 text-xs', 'hover:bg-muted/40 transition-colors', isDeleted && 'opacity-60 grayscale')}
            >
              <PostRowDesktop isDeleted={isDeleted} post={row.original} />
              <PostRowMobile isDeleted={isDeleted} post={row.original} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
