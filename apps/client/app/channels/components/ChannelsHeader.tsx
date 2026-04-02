import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu';
import { Filter, MoreHorizontal, Search, Check, Pin, BellOff, MessageCircle } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';

export type ChannelFilter = 'all' | 'pinned' | 'muted' | 'unread';

interface ChannelsHeaderProps {
  channelsCount: number;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  filter: ChannelFilter;
  setFilter: (filter: ChannelFilter) => void;
}

export const ChannelsHeader = ({ channelsCount, searchTerm, setSearchTerm, filter, setFilter }: ChannelsHeaderProps) => {
  const filterLabels: Record<ChannelFilter, { label: string; icon: any }> = {
    all: { label: 'All', icon: MessageCircle },
    pinned: { label: 'Pinned', icon: Pin },
    muted: { label: 'Muted', icon: BellOff },
    unread: { label: 'Unread', icon: MessageCircle },
  };

  return (
    <div className="flex-none py-2 px-1.5 space-y-3 bg-background/20">
      <div className="flex flex-row justify-between items-center gap-2 px-1">
        <div className="flex items-center gap-3">
          <div className="space-y-0.5">
            <h1 className="text-sm md:text-base font-black tracking-tighter bg-linear-to-r from-foreground to-foreground/50 bg-clip-text text-transparent uppercase">
              Messages
            </h1>
            <p className="text-[7.5px] md:text-[8px] font-bold text-muted-foreground/30 uppercase tracking-[0.1em]">
              {channelsCount} Threads
            </p>
          </div>
        </div>
        <div className="flex items-center gap-0.5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon-sm" 
                className={cn(
                  "rounded-full h-7 w-7 hover:bg-secondary",
                  filter !== 'all' && "text-primary bg-primary/5"
                )}
              >
                <Filter className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 rounded-xl border-border/50 backdrop-blur-3xl bg-background/80 shadow-2xl">
              {(Object.keys(filterLabels) as ChannelFilter[]).map((f) => {
                const Icon = filterLabels[f].icon;
                return (
                  <DropdownMenuItem 
                    key={f} 
                    onClick={() => setFilter(f)} 
                    className="flex items-center justify-between font-bold text-[11px] py-2 rounded-lg cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-3.5 w-3.5 text-muted-foreground/50" />
                      {filterLabels[f].label}
                    </div>
                    {filter === f && <Check className="h-3 w-3 text-primary animate-in zoom-in-50 duration-300" />}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="ghost" size="icon-sm" className="rounded-full h-7 w-7 hover:bg-secondary">
            <MoreHorizontal className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <div className="relative group px-1">
        <Search className="absolute left-3.5 top-1/2 h-2.5 w-2.5 -translate-y-1/2 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
        <Input
          placeholder="Search conversations..."
          className="pl-8 h-8 bg-secondary/15 border-none focus-visible:ring-1 focus-visible:ring-primary/10 rounded-md text-[11.5px] transition-all placeholder:text-muted-foreground/20 placeholder:font-bold"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};
