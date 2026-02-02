import { ChannelsOutput } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@workspace/ui/components/dropdown-menu';
import { EllipsisVertical } from 'lucide-react';

interface ChannelSelectionDropdownProps {
  multiSelect: boolean;
  selectedCount: number;
  channels: ChannelsOutput[];
  onSelect: () => unknown;
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

export const ChannelSelectionDropdown: React.FC<ChannelSelectionDropdownProps> = ({
  channels,
  multiSelect,
  onSelect,
  selectedCount,
  setSelected
}) => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium">Chats</p>
      <div className="flex items-center gap-2">
        {multiSelect ? <Badge variant="secondary">{selectedCount} selected</Badge> : <Badge variant="outline">{channels.length}</Badge>}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Chat options">
              <EllipsisVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Channel tools</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onSelect}>{multiSelect ? 'Exit multi-select' : 'Multi-select'}</DropdownMenuItem>
            {multiSelect ? (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSelected(channels.map((c) => c.id))}>Select all</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelected([])}>Clear selection</DropdownMenuItem>
              </>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
