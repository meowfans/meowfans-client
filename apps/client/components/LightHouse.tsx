'use client';

import { useUtilsStore } from '@/hooks/store/utils.store';
import { useTags } from '@/hooks/useTags';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@workspace/ui/components/command';
import { useIsMobile } from '@workspace/ui/hooks/useIsMobile';
import { cn } from '@workspace/ui/lib/utils';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface LightHouseProps {
  variant?: 'mobile' | 'desktop';
}

export const LightHouse: React.FC<LightHouseProps> = ({ variant = 'mobile' }) => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { getSearchedTags } = useTags({});
  const [labels, setLabels] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const { clickedSearch, setClickedSearch } = useUtilsStore();
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleSearch = useDebouncedCallback(async () => {
    if (!searchText.trim()) {
      setLabels([]);
      return;
    }
    setLoading(true);
    try {
      const results = await getSearchedTags(searchText.trim());
      setLabels(results);
    } finally {
      setLoading(false);
    }
  }, 400);

  useEffect(() => {
    handleSearch();
  }, [searchText]); // eslint-disable-line

  const handlePush = (query: string) => {
    if (!query.trim()) return;
    router.push(`/categories/${encodeURIComponent(query)}`);
    setLabels([]);
    setSearchText('');
    setClickedSearch(false);

    setRecentSearches((prev) => {
      const updated = [query, ...prev.filter((q) => q !== query)].slice(0, 5);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  const handleFilter = (term: string) => {
    setRecentSearches((prev) => {
      const updated = prev.filter((t) => t !== term);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setClickedSearch(!clickedSearch);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [clickedSearch]); // eslint-disable-line

  const renderSuggestions = () => (
    <div>
      {loading && <div className="p-4 text-sm text-muted-foreground">Loading...</div>}
      {!loading && !labels.length && searchText && <CommandEmpty>No results found.</CommandEmpty>}
      {labels.length > 0 && (
        <CommandGroup heading="Suggestions" className="h-[300px]">
          {labels.map((label, idx) => (
            <CommandItem
              key={idx}
              className={cn('cursor-pointer', selectedIndex === idx && 'bg-muted text-foreground')}
              onSelect={() => handlePush(label)}
            >
              {label}
            </CommandItem>
          ))}
        </CommandGroup>
      )}
      <CommandSeparator />
      {!searchText && recentSearches.length > 0 && (
        <CommandGroup heading="Recent Searches">
          {recentSearches.map((term, idx) => (
            <CommandItem key={idx} onSelect={() => handlePush(term)} className="flex justify-between items-center">
              <span>{term}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFilter(term);
                }}
                className="p-1 rounded-md hover:bg-muted"
              >
                <X className="h-3 w-3" />
              </button>
            </CommandItem>
          ))}
        </CommandGroup>
      )}
    </div>
  );

  return (
    <div>
      {/* DESKTOP VERSION MOCK INPUT */}
      {!isMobile && variant === 'desktop' && (
        <div className="hidden md:flex w-72 lg:w-80">
          <button
            onClick={() => setClickedSearch(true)}
            className={`flex w-full items-center justify-between
              rounded-md border border-input bg-background px-3
              py-2 text-sm text-muted-foreground hover:bg-accent
              hover:text-accent-foreground`}
          >
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 opacity-60" />
              <span>Search creators or tags...</span>
            </div>
            <kbd className="pointer-events-none text-xs text-muted-foreground">⌘J</kbd>
          </button>
        </div>
      )}

      {!isMobile && variant === 'desktop' && (
        <CommandDialog open={clickedSearch} onOpenChange={setClickedSearch}>
          <div ref={dropdownRef}>
            <CommandInput
              id="desktop_input"
              placeholder="Search creators or tags..."
              value={searchText}
              autoFocus
              onValueChange={(value) => {
                setSearchText(value);
                setSelectedIndex(null);
              }}
            />
            <CommandList>{renderSuggestions()}</CommandList>
          </div>
        </CommandDialog>
      )}

      {/* MOBILE VERSION INPUT */}
      {isMobile && clickedSearch && variant === 'mobile' && (
        <Command
          className={`absolute left-0 right-0 top-[57px] z-50
            bg-background border rounded-md shadow-md md:hidden h-72`}
          ref={dropdownRef}
        >
          <CommandInput
            id="mobile_input"
            value={searchText}
            placeholder="Search creators or tags..."
            onValueChange={(value) => {
              setSearchText(value);
              setSelectedIndex(null);
            }}
          />
          <CommandList>{renderSuggestions()}</CommandList>
        </Command>
      )}
    </div>
  );
};
