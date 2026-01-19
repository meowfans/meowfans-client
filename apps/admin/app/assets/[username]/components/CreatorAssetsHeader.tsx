'use client';

import { Input } from '@workspace/ui/components/input';
import { Search } from 'lucide-react';

interface Props {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export const CreatorAssetsHeader: React.FC<Props> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-4">
      <div className="relative w-full md:w-auto">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search assets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8 min-w-75"
        />
      </div>
    </div>
  );
};
