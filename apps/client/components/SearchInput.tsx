'use client';

import { useCreators } from '@/hooks/client/useCreators';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@workspace/ui/components/command';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@workspace/ui/components/dialog';
import { Input } from '@workspace/ui/components/input';
import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, Command as CommandIcon, Image as ImageIcon, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export function SearchInput() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const { creators, loading } = useCreators({
    searchTerm: searchQuery,
    take: 5,
    enabled: isFocused || isOpen
  });

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
      setIsFocused(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-1 items-end justify-end md:justify-center md:items-center" ref={containerRef}>
      {/* Mobile Search Icon */}
      <div className="md:hidden">
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)} className="h-9 w-9 rounded-full">
          <Search className="h-5 w-5" />
        </Button>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="p-0 border-none sm:max-w-[425px] top-[15%] translate-y-0 shadow-2xl rounded-2xl overflow-hidden">
            <DialogHeader className="sr-only">
              <DialogTitle>Search</DialogTitle>
              <DialogDescription>Search for creators, posts, or vaults</DialogDescription>
            </DialogHeader>
            <Command className="rounded-none border-none">
              <CommandInput
                placeholder="Search creators, posts, vaults..."
                value={searchQuery}
                onValueChange={setSearchQuery}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                className="h-14 border-none focus:ring-0"
              />
              <CommandList className="max-h-[60vh]">
                <CommandEmpty className="py-10 text-center">
                  <div className="flex flex-col items-center gap-2 opacity-40">
                    <Search className="h-10 w-10" />
                    <p className="text-sm font-medium">No results found.</p>
                  </div>
                </CommandEmpty>
                {creators.length > 0 && (
                  <CommandGroup heading="Creators">
                    {creators.map((creator) => (
                      <CommandItem
                        key={creator.id}
                        onSelect={() => {
                          router.push(`/creators/${creator.username}`);
                          setIsOpen(false);
                        }}
                        className="flex items-center gap-3 p-3 cursor-pointer"
                      >
                        <Avatar className="h-9 w-9 border">
                          <AvatarImage src={creator.avatarUrl} />
                          <AvatarFallback>{creator.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-bold text-sm tracking-tight text-foreground/90">@{creator.username}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
                <CommandGroup heading="Quick Links">
                  <CommandItem onSelect={() => handleSearch('trending')} className="gap-2 p-3">
                    <ImageIcon className="h-4 w-4 text-primary" />
                    <span>Trending Posts</span>
                  </CommandItem>
                  <CommandItem onSelect={() => handleSearch('top-creators')} className="gap-2 p-3">
                    <Briefcase className="h-4 w-4 text-primary" />
                    <span>Top Creators</span>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </DialogContent>
        </Dialog>
      </div>

      {/* Desktop Search Bar */}
      <div className="hidden md:block relative w-full max-w-md group">
        <div className="relative">
          <Search
            className={`absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors duration-200 ${isFocused ? 'text-primary' : 'text-muted-foreground'}`}
          />
          <Input
            type="search"
            placeholder="Search creators, posts, vaults..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
            className="w-full pl-11 pr-4 h-11 bg-secondary/30 border-none focus-visible:ring-2 focus-visible:ring-primary/20 rounded-2xl transition-all duration-300 font-medium"
          />
        </div>

        {/* Desktop Dropdown */}
        <AnimatePresence>
          {isFocused && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-3 bg-background/80 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden z-50 divide-y divide-white/5"
            >
              <div className="max-h-[400px] overflow-y-auto no-scrollbar">
                {creators.length === 0 && searchQuery ? (
                  <div className="p-8 text-center text-muted-foreground text-sm opacity-50">No results for &quot;{searchQuery}&quot;</div>
                ) : creators.length > 0 ? (
                  <div className="p-3 space-y-1">
                    <p className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Creators</p>
                    {creators.map((creator) => (
                      <div
                        key={creator.id}
                        onClick={() => {
                          router.push(`/creators/${creator.username}`);
                          setIsFocused(false);
                        }}
                        className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 cursor-pointer transition-colors group/item"
                      >
                        <Avatar className="h-10 w-10 border border-white/5 group-hover/item:border-primary/50 transition-colors">
                          <AvatarImage src={creator.avatarUrl} className="object-cover" />
                          <AvatarFallback className="bg-primary/10 text-primary font-bold">
                            {creator.username.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col min-w-0">
                          <span className="font-bold text-sm tracking-tight text-foreground/90">@{creator.username}</span>
                        </div>
                        <Search className="ml-auto h-3 w-3 text-muted-foreground opacity-0 group-hover/item:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-2 px-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                      <CommandIcon className="h-3 w-3" /> Quick suggestions
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {['Trending', 'Top Creators', 'Exclusive', 'Recent'].map((tag) => (
                        <Button
                          key={tag}
                          variant="secondary"
                          className="justify-start h-10 rounded-xl bg-white/5 hover:bg-white/10 border-none font-bold text-xs"
                          onClick={() => handleSearch(tag)}
                        >
                          {tag}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {searchQuery && (
                <div
                  className="p-4 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer flex items-center justify-center gap-2"
                  onClick={() => handleSearch(searchQuery)}
                >
                  <Search className="h-4 w-4 text-primary" />
                  <span className="text-xs font-bold text-primary">Search all results for &quot;{searchQuery}&quot;</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
