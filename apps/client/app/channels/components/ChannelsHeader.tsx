import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Filter, MoreHorizontal, Search } from 'lucide-react';

interface ChannelsHeaderProps {
  channelsCount: number;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

export const ChannelsHeader = ({ channelsCount, searchTerm, setSearchTerm }: ChannelsHeaderProps) => {
  return (
    <div className="flex-none p-4 md:p-6 pb-2 space-y-4">
      <div className="flex flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-3">
          <div className="space-y-0.5">
            <h1 className="text-xl md:text-2xl font-black tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Messages
            </h1>
            <p className="text-[10px] md:text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider">
              {channelsCount} Conversations
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon-sm" className="rounded-full h-8 w-8 hover:bg-secondary">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" className="rounded-full h-8 w-8 hover:bg-secondary">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative group">
        <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <Input
          placeholder="Search creators..."
          className="pl-9 h-10 bg-secondary/30 border-none focus-visible:ring-1 focus-visible:ring-primary/20 rounded-xl text-sm transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};
