import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Filter, Heart, Image as ImageIcon, Search } from 'lucide-react';

interface LikedPicturesHeaderProps {
  count: number;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const LikedPicturesHeader = ({ count, searchTerm, onSearchChange }: LikedPicturesHeaderProps) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
      <div className="flex items-center gap-3 md:gap-4">
        <div className="h-12 w-12 md:h-14 md:w-14 rounded-2xl md:rounded-[1.5rem] bg-red-500/10 flex items-center justify-center border border-red-500/20 shrink-0">
          <Heart className="h-5 w-5 md:h-6 md:w-6 text-red-500 fill-red-500" />
        </div>
        <div className="min-w-0">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight uppercase italic bg-gradient-to-br from-foreground to-foreground/50 bg-clip-text text-transparent truncate">
            Saved Photos
          </h1>
          <p className="text-muted-foreground text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mt-0.5 md:mt-1 flex items-center gap-2">
            <ImageIcon className="h-3 w-3" />
            <span className="truncate">{count} High Quality Captures</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3 w-full lg:w-auto">
        <div className="relative group flex-1 lg:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 md:h-4 md:w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            placeholder="Search captures..."
            className="pl-9 h-10 md:h-11 rounded-xl md:rounded-2xl border-border/50 bg-secondary/15 focus-visible:ring-primary/20 text-sm"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 md:h-11 md:w-11 rounded-xl md:rounded-2xl border-border/50 bg-secondary/15 hover:bg-secondary/40 shrink-0"
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
