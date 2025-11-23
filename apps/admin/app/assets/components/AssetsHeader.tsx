'use client';

import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { RefreshCcw, Search, Shield } from 'lucide-react';

interface Props {
  count: number;
  filterText: string;
  onRefetch: () => unknown;
  onChangeFilterText: (val: string) => unknown;
}

export const AssetsHeader: React.FC<Props> = ({ count, filterText, onChangeFilterText, onRefetch }) => {
  return (
    <div className="flex flex-col justify-between sticky bg-background z-10 py-3 space-y-1 px-4 border-b shadow-sm">
      <div className="flex flex-row items-center gap-3">
        <Button variant="secondary" className="rounded-full">
          <Shield className="h-4 w-4 mr-1" /> {count} Creators
        </Button>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search creators..."
            value={filterText}
            onChange={(e) => onChangeFilterText(e.target.value)}
            className="pl-8 max-w-sm"
          />
        </div>
      </div>
      <div className="w-full flex">
        <Button variant="outline" className="hover:scale-105 transition-transform rounded-full" onClick={onRefetch}>
          <RefreshCcw className="h-4 w-4 mr-1" /> Refresh
        </Button>
      </div>
    </div>
  );
};
