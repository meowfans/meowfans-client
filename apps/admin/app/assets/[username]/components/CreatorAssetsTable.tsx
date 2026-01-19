'use client';

import { ColumnDef, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import { CreatorAssetsEntity } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';
import { format } from 'date-fns';
import { ArrowUpDown } from 'lucide-react';
import Image from 'next/image';
import { CreatorAssetsRow } from './CreatorAssetsRow';

const assetColumns: ColumnDef<CreatorAssetsEntity>[] = [
  {
    accessorKey: 'preview',
    header: 'Preview',
    enableSorting: false
  },
  {
    accessorKey: 'type',
    header: 'Type'
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <Button variant="ghost" size="sm" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Created At
        <ArrowUpDown className="ml-1 h-3 w-3" />
      </Button>
    )
  },
  {
    accessorKey: 'isPosted',
    header: 'Status'
  },
  {
    accessorKey: 'deletedAt',
    header: 'State'
  },
  {
    id: 'actions',
    header: 'Actions',
    enableSorting: false
  }
];

interface Props {
  assets: CreatorAssetsEntity[];
  sorting: SortingState;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
}

export const CreatorAssetsTable: React.FC<Props> = ({ assets, sorting, setSorting }) => {
  const table = useReactTable({
    data: assets,
    columns: assetColumns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true
  });

  return (
    <div className="w-full">
      <div className="hidden md:grid grid-cols-[80px_1fr_1fr_1fr_1fr_1fr] gap-4 px-3 py-3 border-t text-xs font-semibold text-muted-foreground bg-muted/20">
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
              className={cn('relative px-3 py-2 text-sm', 'hover:bg-muted/40 transition-colors', isDeleted && 'opacity-60 grayscale')}
            >
              <CreatorAssetsRow isDeleted={isDeleted} asset={row.original} />

              {/* Mobile view fallback - can be added here or in a separate file like PostRowMobile */}
              <div className="md:hidden flex gap-4">
                <div className="relative h-16 w-16 bg-muted rounded overflow-hidden">
                  {row.original.asset.fileType === 'VIDEO' ? (
                    <video src={row.original.asset.rawUrl} className="h-full w-full object-cover" />
                  ) : (
                    <Image src={row.original.asset.rawUrl} alt={row.original.id} fill className="object-cover" unoptimized />
                  )}
                </div>
                <div className="flex flex-col justify-center text-xs">
                  <span className="font-semibold">{format(new Date(row.original.createdAt), 'PP')}</span>
                  <span className="text-muted-foreground">{row.original.type}</span>
                </div>
              </div>
            </div>
          );
        })}
        {assets.length === 0 && <div className="p-8 text-center text-muted-foreground">No assets found.</div>}
      </div>
    </div>
  );
};
