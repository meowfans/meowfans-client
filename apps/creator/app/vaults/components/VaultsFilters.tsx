'use client';

import { Button } from '@workspace/ui/components/button';
import { CardHeader } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { Check, Search, X } from 'lucide-react';

interface VaultsFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCount: number;
  totalFiltered: number;
  onSelectAll: () => void;
}

export function VaultsFilters({ searchQuery, setSearchQuery, selectedCount, totalFiltered, onSelectAll }: VaultsFiltersProps) {
  return (
    <CardHeader>
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
          <div className="flex-1 w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search vaults..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={onSelectAll} className="w-full sm:w-auto">
            {selectedCount === totalFiltered && totalFiltered > 0 ? (
              <>
                <X className="h-4 w-4 mr-2" />
                Deselect All
              </>
            ) : (
              <>
                <Check className="h-4 w-4 mr-2" />
                Select All
              </>
            )}
          </Button>
        </div>
      </div>
    </CardHeader>
  );
}
