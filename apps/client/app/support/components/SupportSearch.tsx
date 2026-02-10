'use client';

import { Input } from '@workspace/ui/components/input';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

interface SupportSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function SupportSearch({ searchQuery, setSearchQuery }: SupportSearchProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="relative max-w-2xl mx-auto"
    >
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        placeholder="Search for answers..."
        className="h-14 pl-12 rounded-full bg-secondary/30 border-white/10 text-lg focus-visible:ring-primary/30 transition-all font-medium"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </motion.div>
  );
}
