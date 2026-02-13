'use client';

import { useCallback, useState } from 'react';
import { CreatorSearchResults } from './CreatorSearchResults';
import { SearchBar } from './SearchBar';
import { VaultSearchResults } from './VaultSearchResults';

export type SearchType = 'vaults' | 'creators';

export function Search() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchType, setSearchType] = useState<SearchType>('vaults');

  const handleSearch = useCallback((query: string, type: SearchType) => {
    setSearchQuery(query);
    setSearchType(type);
  }, []);

  const renderContent = () => {
    if (!searchQuery) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 ring-4 ring-primary/5">
            <span className="text-4xl">🕵️</span>
          </div>
          <h2 className="text-2xl font-bold mb-2 tracking-tight">Discover MeowFans</h2>
          <p className="text-muted-foreground text-sm max-w-sm">
            Search for creators with <span className="font-bold text-foreground">@</span>, or explore exclusive vaults.
          </p>
        </div>
      );
    }

    if (searchType === 'vaults') {
      return <VaultSearchResults query={searchQuery} />;
    }

    if (searchType === 'creators') {
      return <CreatorSearchResults query={searchQuery} />;
    }
  };

  return (
    <div className="flex flex-col gap-12 p-4 md:p-10 lg:p-16 min-h-screen max-w-7xl mx-auto w-full">
      <div className="w-full">
        <SearchBar onSearch={handleSearch} focused />
      </div>

      <div className="flex-1 w-full">{renderContent()}</div>
    </div>
  );
}
