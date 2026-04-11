'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Database, Filter, LayoutGrid, List, Search } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import React from 'react';

interface AssetsHeaderProps {
  count: number;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export const AssetsHeader = ({ count, viewMode, onViewModeChange }: AssetsHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-primary/5 pb-6">
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <Database className="h-5 w-5" />
          </div>
          <h1 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter">
            Asset <span className="text-primary italic">Vault</span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={count}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-1.5"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground whitespace-nowrap">
                {count || 0} Global Assets <span className="opacity-50">Discovery</span>
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative group w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input 
            disabled
            placeholder="Search assets (Coming Soon)"
            className="w-full bg-primary/5 border border-primary/10 rounded-full py-2 pl-10 pr-4 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/40"
          />
        </div>
        <div className="flex items-center bg-primary/5 border border-primary/10 rounded-full p-1 h-10">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => onViewModeChange('grid')}
            className={`h-8 w-8 rounded-full ${viewMode === 'grid' ? 'shadow-md shadow-primary/20' : 'text-muted-foreground'}`}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => onViewModeChange('list')}
            className={`h-8 w-8 rounded-full ${viewMode === 'list' ? 'shadow-md shadow-primary/20' : 'text-muted-foreground'}`}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="outline" size="sm" className="h-10 rounded-full border-primary/10 gap-2 font-black italic uppercase text-[10px] tracking-tight">
          <Filter className="h-3.5 w-3.5" />
          <span>Filters</span>
        </Button>
      </div>
    </div>
  );
};
