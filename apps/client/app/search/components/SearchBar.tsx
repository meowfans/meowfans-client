'use client';

import { Input } from '@workspace/ui/components/input';
import useDebounce from '@workspace/ui/hooks/useDebounce';
import { Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string, type: 'vaults' | 'creators') => void;
  focused?: boolean;
}

export function SearchBar({ onSearch, focused }: SearchBarProps) {
  const [query, setQuery] = useState<string>('');
  const debouncedQuery = useDebounce(query, 800);

  useEffect(() => {
    const raw = debouncedQuery.trim();

    if (!raw) {
      onSearch('', 'vaults');
      return;
    }

    const firstChar = raw[0];

    if (firstChar === '@') {
      const value = raw.slice(1).trim();

      if (value.length === 0) return;

      onSearch(value, 'creators');
      return;
    }

    onSearch(raw, 'vaults');
  }, [debouncedQuery, onSearch]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
        <Input
          autoFocus={focused}
          placeholder="Search vaults... (use @ for creators)"
          className="pl-12 pr-12 h-14 text-lg bg-secondary/20 border-none shadow-sm transition-all hover:bg-secondary/30 focus-visible:ring-2 focus-visible:ring-primary/50"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-secondary group transition-colors"
          >
            <X className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
          </button>
        )}
      </div>

      <div className="mt-2 flex gap-4 text-xs text-muted-foreground px-2">
        <div className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 rounded border bg-muted font-sans font-medium text-[10px]">@</kbd>
          <span>Creators</span>
        </div>
        <div className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 rounded border bg-muted font-sans font-medium text-[10px]">text</kbd>
          <span>Vaults</span>
        </div>
      </div>
    </div>
  );
}
