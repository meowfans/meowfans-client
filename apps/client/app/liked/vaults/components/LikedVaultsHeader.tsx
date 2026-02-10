import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Filter, Heart, Search } from 'lucide-react';

interface LikedVaultsHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const LikedVaultsHeader = ({ searchTerm, onSearchChange }: LikedVaultsHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 bg-red-500/10 px-4 py-1.5 rounded-full border border-red-500/20">
          <Heart className="h-4 w-4 text-red-500 fill-red-500" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500">Private Collection</span>
        </div>
        <h1 className="text-5xl md:text-7xl leading-none">
          Liked <span className="text-muted-foreground/30 italic">Vaults</span>
        </h1>
        <p className="text-muted-foreground max-w-lg font-medium leading-relaxed">
          Quick access to content collections you&apos;ve marked for future enjoyment.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative group w-full md:w-[280px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            placeholder="Search collection..."
            className="pl-9 h-12 rounded-2xl border-border/50 bg-secondary/15 focus-visible:ring-primary/20"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl border-border/50 bg-secondary/15 hover:bg-secondary/40">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
