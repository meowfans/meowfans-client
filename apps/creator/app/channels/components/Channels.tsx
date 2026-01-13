'use client';

import { Badge } from '@workspace/ui/components/badge';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { useIsMobile } from '@workspace/ui/hooks/useIsMobile';
import { ChannelList } from './ChannelList';
import { ChannelHeader } from './Header';
import { NoChatSelected } from './NoChatSelected';
export interface Channel {
  id: string;
  name: string;
  path: string;
  description?: string;
  members: number;
  totalEarning: number;
  isPrivate: boolean;
  lastMessage?: {
    text: string;
    timestamp: string;
    sender: string;
  };
}

export const demoChannels: Channel[] = [
  {
    id: 'general',
    totalEarning: 30,
    path: '1',
    name: 'General',
    description: 'General discussions, announcements, and casual talks.',
    members: 128,
    isPrivate: false,
    lastMessage: {
      text: 'Welcome to the General channel!',
      timestamp: '2025-08-20T10:32:00Z',
      sender: 'Admin'
    }
  },
  {
    id: 'dev-team',
    totalEarning: 30,
    path: '2',
    name: 'Development Team',
    description: 'Code discussions, commits, and tech updates.',
    members: 12,
    isPrivate: true,
    lastMessage: {
      text: 'Pushed the latest feature to GitHub 🚀',
      timestamp: '2025-08-20T09:45:00Z',
      sender: 'Alice'
    }
  },
  {
    id: 'design',
    totalEarning: 30,
    path: '3',
    name: 'Design',
    description: 'UI/UX, wireframes, and assets discussions.',
    members: 8,
    isPrivate: false,
    lastMessage: {
      text: 'Updated the Figma board with new mockups 🎨',
      timestamp: '2025-08-19T17:20:00Z',
      sender: 'Bob'
    }
  },
  {
    id: 'random',
    totalEarning: 30,
    path: '4',
    name: 'Random',
    description: 'Memes, jokes, and off-topic fun.',
    members: 42,
    isPrivate: false,
    lastMessage: {
      text: 'Did you see the new meme I posted? 😂',
      timestamp: '2025-08-20T08:00:00Z',
      sender: 'Charlie'
    }
  },
  {
    id: 'support',
    totalEarning: 30,
    path: '5',
    name: 'Support',
    description: 'Ask questions, get help, and troubleshoot issues.',
    members: 25,
    isPrivate: false,
    lastMessage: {
      text: 'Issue resolved! Thanks for the quick fix 🙌',
      timestamp: '2025-08-19T22:10:00Z',
      sender: 'Diana'
    }
  }
];

export const Channels = () => {
  const isMobile = useIsMobile();

  const privateCount = demoChannels.filter((c) => c.isPrivate).length;

  return (
    <PageManager className="relative p-0">
      <ChannelHeader />
      <div className="absolute inset-0 -z-10">
        <div className="h-full w-full bg-linear-to-b from-background via-background to-muted/20" />
        <div className="absolute inset-x-0 -top-24 mx-auto h-72 w-72 rounded-full bg-muted/30 blur-3xl" />
        <div className="absolute -right-16 top-24 h-72 w-72 rounded-full bg-muted/20 blur-3xl" />
      </div>

      <div className="pt-20 pb-24 px-4">
        <div className="mx-auto w-full max-w-3xl space-y-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Channels</h1>
              <Badge variant="outline">{demoChannels.length} total</Badge>
              {privateCount ? <Badge variant="secondary">{privateCount} private</Badge> : null}
            </div>
            <p className="text-sm text-muted-foreground">Open a channel to chat with your community.</p>
          </div>

          {!isMobile ? <NoChatSelected /> : <ChannelList channels={demoChannels} />}
        </div>
      </div>
    </PageManager>
  );
};
