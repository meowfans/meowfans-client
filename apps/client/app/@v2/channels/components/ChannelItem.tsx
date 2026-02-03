'use client';

import { ChannelsOutput } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import { BadgeCheck, MessageSquare, User } from 'lucide-react';

interface ChannelItemV2Props {
  channel: ChannelsOutput;
  index: number;
  onClick: (id: string) => void;
  hasSeenLastMessage: boolean;
}

export const ChannelItem = ({ channel, index, onClick, hasSeenLastMessage }: ChannelItemV2Props) => {
  const lastMessage = channel.lastMessage;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      onClick={() => onClick(channel.id)}
      className="group relative cursor-pointer"
    >
      <div
        className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${
          hasSeenLastMessage
            ? 'border-border/50 bg-secondary/40 hover:bg-secondary/60'
            : 'border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10 hover:border-amber-500/50 shadow-lg shadow-amber-500/5'
        }`}
      >
        {/* Avatar Section */}
        <div className="relative">
          <Avatar
            className={`h-14 w-14 border-2 transition-transform group-hover:scale-105 ${hasSeenLastMessage ? 'border-border' : 'border-amber-500/50'}`}
          >
            <AvatarImage src={channel.creatorAvatarUrl || ''} className="object-cover" />
            <AvatarFallback className="bg-secondary text-muted-foreground">
              <User className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          {!hasSeenLastMessage && (
            <div className="absolute -top-0.5 -right-0.5">
              <div className="h-3.5 w-3.5 rounded-full bg-amber-500 border-2 border-background animate-pulse" />
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-1.5 min-w-0">
              <h3 className={`font-bold truncate ${!hasSeenLastMessage ? 'text-amber-100' : 'text-foreground'}`}>
                {channel.creatorFullname || 'Unknown User'}
              </h3>
              <BadgeCheck className="h-3.5 w-3.5 text-amber-500 shrink-0" />
            </div>
            {lastMessage?.createdAt && (
              <span className="text-[10px] text-muted-foreground whitespace-nowrap uppercase tracking-wider font-semibold">
                {formatDistanceToNow(new Date(lastMessage.createdAt), { addSuffix: false })}
              </span>
            )}
          </div>

          <p className={`text-sm truncate ${!hasSeenLastMessage ? 'text-amber-200/70 font-medium' : 'text-muted-foreground font-normal'}`}>
            {lastMessage?.content || 'No messages yet'}
          </p>
        </div>

        {/* Status Icon */}
        <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <MessageSquare className="h-4 w-4 text-amber-500/50" />
        </div>
      </div>
    </motion.div>
  );
};
