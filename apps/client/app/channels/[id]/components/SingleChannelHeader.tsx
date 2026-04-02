import { ChannelsOutput } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu';
import { ArrowLeft, MoreVertical, Phone, Video, Pin, BellOff, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

interface SingleChannelHeaderProps {
  channel: ChannelsOutput;
}

export const SingleChannelHeader = ({ channel }: SingleChannelHeaderProps) => {
  return (
    <div className="flex-none flex items-center justify-between p-4 border-b bg-background/80 backdrop-blur-xl z-10">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild className="rounded-full md:hidden">
          <Link href="/channels">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="relative group cursor-pointer">
          <Avatar className="h-10 w-10 border-2 border-background shadow-lg transition-transform group-hover:scale-105">
            <AvatarImage src={channel?.creatorAvatarUrl} />
            <AvatarFallback className="bg-primary/10 text-primary font-bold">
              {channel?.creatorFullname?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {channel?.isCreatorOnline && (
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500 shadow-sm" />
          )}
        </div>
        <div className="flex flex-col">
          <h2 className="font-bold text-base leading-none tracking-tight">{channel?.creatorFullname}</h2>
          <div className="flex items-center gap-1.5 mt-1">
            <span className={`h-1.5 w-1.5 rounded-full ${channel?.isCreatorOnline ? 'bg-green-500' : 'bg-muted-foreground/30'}`} />
            <p className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">
              {channel?.isCreatorOnline ? 'Online' : 'Away'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {channel?.isPinned && <Pin className="h-3.5 w-3.5 text-primary fill-primary rotate-45" />}
        {channel?.isMuted && <BellOff className="h-3.5 w-3.5 text-muted-foreground/40" />}
        
        <Button variant="outline" size="icon-sm" className="rounded-full h-9 w-9 border-muted/50 hidden sm:flex">
          <Phone className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon-sm" className="rounded-full h-9 w-9 border-muted/50 hidden sm:flex">
          <Video className="h-4 w-4" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm" className="rounded-full h-9 w-9">
              <MoreVertical className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 rounded-xl border-border/50 backdrop-blur-3xl bg-background/80 shadow-2xl">
            <DropdownMenuItem className="flex items-center gap-2 font-bold text-[11px] py-2 rounded-lg cursor-pointer">
              <Pin className="h-3.5 w-3.5" />
              {channel?.isPinned ? 'Unpin Chat' : 'Pin Chat'}
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 font-bold text-[11px] py-2 rounded-lg cursor-pointer">
              <BellOff className="h-3.5 w-3.5" />
              {channel?.isMuted ? 'Unmute' : 'Mute Notifications'}
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border/50" />
            <DropdownMenuItem className="flex items-center gap-2 font-bold text-[11px] py-2 rounded-lg cursor-pointer text-destructive focus:text-destructive">
              <ShieldAlert className="h-3.5 w-3.5" />
              {channel?.isMessagingBlocked ? 'Unblock User' : 'Block User'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
