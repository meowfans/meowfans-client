'use client';

import { DownloadStates, GetVaultObjectsOutput } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Checkbox } from '@workspace/ui/components/checkbox';
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '@workspace/ui/components/table';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import React from 'react';
import { getFileTypeIcon, getStatusIcon } from './VaultObjectsIcons';

interface VaultObjectsTableProps {
 vaultObjects: GetVaultObjectsOutput[];
 selectedObjects: string[];
 onSelectAll: (checked: boolean) => void;
 onSelectObject: (objectId: string, checked: boolean) => void;
 loading: boolean;
 hasNext: boolean;
 onLoadMore: () => void;
}

export function VaultObjectsTable({
 vaultObjects,
 selectedObjects,
 onSelectAll,
 onSelectObject,
 loading,
 hasNext,
 onLoadMore
}: VaultObjectsTableProps) {
 const isAllSelected = vaultObjects.length > 0 && 
 vaultObjects.every(obj => obj.status === DownloadStates.Fulfilled || selectedObjects.includes(obj.id));
 
 const selectableObjects = vaultObjects.filter(v => v.status !== DownloadStates.Fulfilled);
 const selectedInCurrentPage = selectedObjects.filter(id => vaultObjects.some(obj => obj.id === id));
 
 const isIndeterminate = selectedInCurrentPage.length > 0 && selectedInCurrentPage.length < selectableObjects.length;

 return (
 <div className="flex-1 min-h-0 relative border rounded-xl bg-card overflow-hidden shadow-sm">
  {loading && vaultObjects.length === 0 ? (
  <div className="h-full flex items-center justify-center p-12">
   <Loading />
  </div>
  ) : (
  <InfiniteScrollManager
   useWindowScroll
   dataLength={vaultObjects.length}
   hasMore={hasNext}
   onLoadMore={onLoadMore}
   loading={loading}
  >
   <div className="overflow-x-auto">
   <table className="w-full caption-bottom text-sm">
    <TableHeader className="sticky top-0 bg-card z-10 shadow-sm border-b">
    <TableRow className="hover:bg-transparent">
     <TableHead className="w-10 px-2 md:px-4">
     <Checkbox
      checked={isAllSelected || (isIndeterminate ? 'indeterminate' : false)}
      onCheckedChange={(checked) => onSelectAll(checked as boolean)}
      aria-label="Select all"
     />
     </TableHead>
     <TableHead className="w-16 md:w-24 px-2 md:px-4 py-3 md:py-4 font-semibold text-xs md:text-sm">Preview</TableHead>
     <TableHead className="w-20 md:w-32 px-2 md:px-4 py-3 md:py-4 text-center font-semibold text-xs md:text-sm">Type</TableHead>
     <TableHead className="w-24 md:w-40 px-2 md:px-4 py-3 md:py-4 text-center font-semibold text-xs md:text-sm">Status</TableHead>
     <TableHead className="min-w-[150px] px-2 md:px-4 py-3 md:py-4 font-semibold text-xs md:text-sm">Object URL</TableHead>
     <TableHead className="text-right px-2 md:px-4 py-3 md:py-4 font-semibold whitespace-nowrap hidden sm:table-cell text-xs md:text-sm">Created At</TableHead>
    </TableRow>
    </TableHeader>
    <TableBody>
    {vaultObjects.map((obj) => (
     <TableRow 
     key={obj.id} 
     className="hover:bg-muted/30 transition-colors border-b last:border-0"
     data-state={selectedObjects.includes(obj.id) && 'selected'}
     >
     <TableCell className="px-2 md:px-4 py-2 md:py-3">
      <Checkbox
      checked={selectedObjects.includes(obj.id)}
      onCheckedChange={(checked) => onSelectObject(obj.id, checked as boolean)}
      disabled={obj.status === DownloadStates.Fulfilled}
      aria-label="Select row"
      />
     </TableCell>
     <TableCell className="px-2 md:px-4 py-2 md:py-3">
      <div className="relative h-10 w-10 md:h-12 md:w-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center border transition-all hover:scale-105">
      <div className="h-full w-full flex items-center justify-center bg-secondary/50">
       {getFileTypeIcon(obj.fileType)}
      </div>
      </div>
     </TableCell>
     <TableCell className="px-2 md:px-4 py-2 md:py-3 text-center">
      <div className="flex justify-center">
      <Badge variant="secondary" className="gap-1 px-1.5 md:px-2.5 py-0.5 md:py-1">
       {getFileTypeIcon(obj.fileType)}
       <span className="capitalize text-[10px] md:text-xs font-medium">{obj.fileType.toLowerCase()}</span>
      </Badge>
      </div>
     </TableCell>
     <TableCell className="px-2 md:px-4 py-2 md:py-3 text-center">
      <div className="flex items-center justify-center gap-1 md:gap-2">
      <div className="scale-90 md:scale-100">{getStatusIcon(obj.status)}</div>
      <span className="font-semibold text-[9px] md:text-[10px] uppercase tracking-wider text-muted-foreground hidden lg:inline">
       {obj.status}
      </span>
      </div>
     </TableCell>
     <TableCell className="px-2 md:px-4 py-2 md:py-3 font-mono text-[10px] md:text-xs text-muted-foreground max-w-[120px] md:max-w-[250px] truncate"title={obj.objectUrl}>
      {obj.objectUrl || (
      <span className="text-muted-foreground/30">No URL</span>
      )}
     </TableCell>
     <TableCell className="px-2 md:px-4 py-2 md:py-3 text-right text-[10px] md:text-xs text-muted-foreground whitespace-nowrap font-medium hidden sm:table-cell">
      {new Date(obj.createdAt).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
      })}
     </TableCell>
     </TableRow>
    ))}
    {vaultObjects.length === 0 && !loading && (
     <TableRow>
     <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
      <div className="flex flex-col items-center justify-center gap-2">
      <div className="p-3 rounded-full bg-muted">
       <span className="text-lg">No objects found</span>
      </div>
      <p className="text-sm">Try adjusting your filters to find what you&apos;re looking for.</p>
      </div>
     </TableCell>
     </TableRow>
    )}
    </TableBody>
   </table>
   </div>
  </InfiniteScrollManager>
  )}
 </div>
 );
}
