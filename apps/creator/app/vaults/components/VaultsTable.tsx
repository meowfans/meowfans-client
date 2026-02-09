'use client';

import { VaultsEntity } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Checkbox } from '@workspace/ui/components/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@workspace/ui/components/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@workspace/ui/components/table';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { AnimatePresence } from 'framer-motion';
import { DollarSign, Eye, Heart, Layers, MoreVertical, Share2, Trash2 } from 'lucide-react';
import NextImage from 'next/image';
import Link from 'next/link';

interface VaultsTableProps {
  vaults: VaultsEntity[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  selectedVaults: string[];
  onToggleSelect: (vaultId: string) => void;
  onDelete: (vaultId: string) => void;
  onShare: (vault: VaultsEntity) => void;
  deleting: boolean;
}

export function VaultsTable({
  vaults,
  loading,
  hasMore,
  onLoadMore,
  selectedVaults,
  onToggleSelect,
  onDelete,
  onShare,
  deleting
}: VaultsTableProps) {
  return (
    <div className="border rounded-md">
      <InfiniteScrollManager dataLength={vaults.length} loading={loading} hasMore={hasMore} onLoadMore={onLoadMore}>
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-card">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[50px]"></TableHead>
              <TableHead className="w-[100px]">Cover</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stats</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence mode="popLayout">
              {vaults.map((vault) => (
                <VaultTableRow
                  key={vault.id}
                  vault={vault}
                  isSelected={selectedVaults.includes(vault.id)}
                  onToggleSelect={onToggleSelect}
                  onDelete={onDelete}
                  onShare={onShare}
                  deleting={deleting}
                />
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </InfiniteScrollManager>
    </div>
  );
}

interface VaultTableRowProps {
  vault: VaultsEntity;
  isSelected: boolean;
  onToggleSelect: (vaultId: string) => void;
  onDelete: (vaultId: string) => void;
  onShare: (vault: VaultsEntity) => void;
  deleting: boolean;
}

function VaultTableRow({ vault, isSelected, onToggleSelect, onDelete, onShare, deleting }: VaultTableRowProps) {
  return (
    <TableRow className={isSelected ? 'bg-muted/50' : ''}>
      <TableCell>
        <Checkbox checked={isSelected} onCheckedChange={() => onToggleSelect(vault.id)} />
      </TableCell>
      <TableCell>
        {vault.preview && (
          <div className="relative w-16 h-16 rounded-md overflow-hidden bg-secondary">
            <NextImage src={vault.preview} alt="Preview" fill className="object-cover" />
          </div>
        )}
      </TableCell>
      <TableCell className="max-w-[200px]">
        <p className="text-sm px-1 line-clamp-2">{vault.description || 'No description'}</p>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Layers className="h-4 w-4" />
          {vault.objectCount} items
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1 font-medium">
          {vault.unlockPrice && vault.unlockPrice > 0 ? (
            <>
              <DollarSign className="h-4 w-4 text-green-500" />
              {vault.unlockPrice.toFixed(2)}
            </>
          ) : (
            <span className="text-muted-foreground">Free</span>
          )}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Heart className="h-3 w-3" />
            {vault.likeCount}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {vault.viewCount || 0}
          </span>
        </div>
      </TableCell>
      <TableCell>
        <span className="text-xs text-muted-foreground">
          {new Date(vault.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8" disabled={deleting}>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onShare(vault)}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              {/* Assuming we might have an edit page or studio with pre-fill */}
              <Link href={`/vaults-studio?id=${vault.id}`} className="cursor-pointer">
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onDelete(vault.id)} className="text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
