'use client';

import { PostTypes } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu';
import { Input } from '@workspace/ui/components/input';
import { motion } from 'framer-motion';
import { Filter, LayoutGrid, List, Lock, Search, Sparkles } from 'lucide-react';

interface PostsHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  postTypes: PostTypes[];
  onPostTypesChange: (types: PostTypes[]) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export const PostsHeader = ({ searchTerm, onSearchChange, postTypes, onPostTypesChange, viewMode, onViewModeChange }: PostsHeaderProps) => {
  const allPostTypes = Object.values(PostTypes);

  const togglePostType = (type: PostTypes) => {
    const isSelected = postTypes.includes(type);
    if (isSelected && postTypes.length > 1) {
      onPostTypesChange(postTypes.filter((t) => t !== type));
    } else if (!isSelected) {
      onPostTypesChange([...postTypes, type]);
    }
  };

  return (
    <div className="flex-none px-4 py-4 md:px-10 md:py-8 lg:px-12 bg-gradient-to-b from-secondary/10 to-transparent border-b border-white/5">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between max-w-[1600px] mx-auto">
        {/* Title and View Controls */}
        <div className="flex flex-col gap-2 min-w-0">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent italic uppercase">
              Discover
            </h1>

            <div className="flex items-center gap-2 lg:hidden">
              <div className="flex items-center bg-secondary/20 p-1 rounded-full border border-white/5">
                <Button
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                  size="icon-sm"
                  className="rounded-full h-8 w-8"
                  onClick={() => onViewModeChange('grid')}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                  size="icon-sm"
                  className="rounded-full h-8 w-8"
                  onClick={() => onViewModeChange('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              <FilterDropdown postTypes={postTypes} togglePostType={togglePostType} size="sm" />
            </div>
          </div>
          <p className="text-[10px] md:text-xs font-black text-muted-foreground/40 uppercase tracking-[0.2em] italic hidden sm:block">
            Latest drops from creators
          </p>
        </div>

        {/* Search and Tabs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 lg:gap-6 flex-1 lg:max-w-2xl">
          <div className="relative group flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Search drops..."
              className="pl-12 h-11 bg-secondary/20 border-white/5 focus-visible:ring-2 focus-visible:ring-primary/20 rounded-2xl text-sm transition-all shadow-inner"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar sm:pb-0">
            <div className="flex items-center bg-secondary/10 p-1 rounded-full border border-white/5">
              {[
                { id: 'all', label: 'All', types: allPostTypes },
                { id: 'public', label: 'Public', types: [PostTypes.Public] },
                { id: 'exclusive', label: 'Excl', types: [PostTypes.Exclusive] }
              ].map((tab) => {
                const isActive = tab.id === 'all' ? postTypes.length === 2 : postTypes.length === 1 && postTypes.includes(tab.types[0]);

                return (
                  <Button
                    key={tab.id}
                    variant={isActive ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => onPostTypesChange(tab.types)}
                    className={`rounded-full px-4 font-black uppercase text-[10px] tracking-widest h-8 whitespace-nowrap transition-all ${
                      isActive ? 'shadow-sm' : 'text-muted-foreground/60'
                    }`}
                  >
                    {tab.label}
                  </Button>
                );
              })}
            </div>

            {/* Desktop View Controls */}
            <div className="hidden lg:flex items-center gap-2 ml-2 pl-4 border-l border-white/10">
              <div className="flex items-center bg-secondary/20 p-1 rounded-full border border-white/5">
                <Button
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                  size="icon-sm"
                  className="rounded-full h-8 w-8"
                  onClick={() => onViewModeChange('grid')}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                  size="icon-sm"
                  className="rounded-full h-8 w-8"
                  onClick={() => onViewModeChange('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              <FilterDropdown postTypes={postTypes} togglePostType={togglePostType} size="md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FilterDropdown = ({
  postTypes,
  togglePostType,
  size
}: {
  postTypes: PostTypes[];
  togglePostType: (type: PostTypes) => void;
  size: 'sm' | 'md';
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="outline"
        size="icon-sm"
        className={`rounded-full border-white/10 hover:bg-secondary/40 transition-all ${
          size === 'sm' ? 'h-8 w-8' : 'h-9 w-9'
        } ${postTypes.length < Object.values(PostTypes).length ? 'border-primary/50 bg-primary/5 text-primary' : ''}`}
      >
        <Filter className={size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-56 rounded-2xl bg-background/80 backdrop-blur-xl border-white/10 p-2 shadow-2xl">
      <div className="px-3 py-2">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 mb-3">Filter by Type</p>
        <div className="space-y-1">
          {[
            { label: 'Public Drops', value: PostTypes.Public, icon: Sparkles },
            { label: 'Exclusive Content', value: PostTypes.Exclusive, icon: Lock }
          ].map((type) => (
            <DropdownMenuItem
              key={type.value}
              onSelect={(e) => {
                e.preventDefault();
                togglePostType(type.value as PostTypes);
              }}
              className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                postTypes.includes(type.value as PostTypes) ? 'bg-primary/10 text-primary' : 'hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <type.icon
                  className={`h-4 w-4 ${postTypes.includes(type.value as PostTypes) ? 'text-primary' : 'text-muted-foreground'}`}
                />
                <span className="text-xs font-bold">{type.label}</span>
              </div>
              {postTypes.includes(type.value as PostTypes) && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="h-1.5 w-1.5 rounded-full bg-primary" />
              )}
            </DropdownMenuItem>
          ))}
        </div>
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
);
