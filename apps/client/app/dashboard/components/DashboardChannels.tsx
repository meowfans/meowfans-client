import Loading from '@/app/loading';
import { ChannelsOutput } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { ScrollArea } from '@workspace/ui/components/scroll-area';
import { ExternalLink, MessageSquare } from 'lucide-react';
import Link from 'next/link';

interface DashboardChannelsProps {
  channels: ChannelsOutput[];
  channelsLoading: boolean;
  isEmpty: boolean;
}

export const DashboardChannels = ({ channels, channelsLoading, isEmpty }: DashboardChannelsProps) => {
  return (
    <Card className="border-none bg-secondary/10 shadow-none flex flex-col h-[450px]">
      <CardHeader className="flex-none">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Recent Messages
          </CardTitle>
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
        </div>
        <CardDescription>Stay in touch with creators</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 min-h-0 flex flex-col p-0 px-6">
        {channelsLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loading />
          </div>
        ) : isEmpty ? (
          <div className="flex-1 flex flex-col items-center justify-center py-6">
            <MessageSquare className="h-8 w-8 text-muted-foreground/30 mb-2" />
            <p className="text-sm text-muted-foreground">No active chats</p>
          </div>
        ) : (
          <ScrollArea className="flex-1">
            <div className="space-y-1 pr-4 pb-4">
              {channels.map((channel) => (
                <Link
                  key={channel.id}
                  href={`/channels/${channel.id}`}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group border border-transparent hover:border-border/50"
                >
                  <Avatar className="h-11 w-11 border-2 border-background group-hover:border-primary/20 transition-colors">
                    <AvatarImage src={channel.creatorAvatarUrl} />
                    <AvatarFallback className="bg-primary/10 text-primary">{channel.label?.[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-0.5">
                      <p className="text-sm font-bold truncate text-foreground group-hover:text-primary transition-colors">
                        @{channel.creatorFullname}
                      </p>
                      <Badge variant="outline" className="text-[9px] h-4 font-medium px-1.5 opacity-60">
                        {channel.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground truncate leading-relaxed">
                      {channel.lastMessage?.content || 'Started a new conversation'}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>

      <div className="p-4 mt-auto border-t border-border/10 bg-secondary/5 rounded-b-xl">
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-xs font-semibold gap-2 hover:bg-primary/10 hover:text-primary transition-all"
          asChild
        >
          <Link href="/channels">
            Go to Messenger
            <ExternalLink className="h-3 w-3" />
          </Link>
        </Button>
      </div>
    </Card>
  );
};
