'use client';

import { ChannelsOutput } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { DropdownMenuSeparator } from '@workspace/ui/components/dropdown-menu';
import { cn } from '@workspace/ui/lib/utils';
import { motion } from 'framer-motion';
import { Bell, BellOff, Calendar, Lock, MoreVertical, Pin, ShieldAlert, ShieldCheck, Trash, Unlock, User } from 'lucide-react';
import Link from 'next/link';

interface UserDetailsProps {
  channel: ChannelsOutput | null;
}

export function UserDetails({ channel }: UserDetailsProps) {
  if (!channel) return null;

  return (
    <div className="flex h-full w-full flex-col bg-background/30 backdrop-blur-3xl overflow-y-auto custom-scrollbar border-l border-border/50">
      <div className="p-4 space-y-6">
        {/* Profile Section */}
        <div className="flex flex-col items-center text-center space-y-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative">
            <Avatar className="h-32 w-32 border-4 border-background shadow-2xl ring-2 ring-primary/20">
              <AvatarImage src={channel.creatorAvatarUrl} alt={channel.creatorFullname} className="object-cover" />
              <AvatarFallback className="bg-primary/10 text-4xl font-black text-primary">
                {channel.creatorFullname.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {channel.isCreatorOnline && (
              <span className="absolute bottom-2 right-2 h-6 w-6 rounded-full border-4 border-background bg-green-500 shadow-lg" />
            )}
          </motion.div>

          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1.5">
              <h2 className="text-2xl font-black tracking-tight">{channel.creatorFullname}</h2>
              <ShieldCheck className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm font-bold text-muted-foreground/60 uppercase tracking-widest">Creator</p>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Button
              variant="outline"
              asChild
              size="sm"
              className="rounded-2xl h-10 px-4 bg-secondary/30 border-none font-bold text-xs uppercase tracking-wider"
            >
              <Link href={`/creators/${channel.creatorId}`}>Profile</Link>
            </Button>
            <Button variant="outline" size="sm" className="rounded-2xl h-10 w-10 p-0 bg-secondary/30 border-none">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 gap-2 pt-4">
          <SectionTitle>Creator Info</SectionTitle>
          <InfoItem icon={User} label="Label" value={channel.label || 'Standard Creator'} />
          <InfoItem icon={Calendar} label="Member since" value="January 2024" />
        </div>

        {/* Media / Files (Placeholders for aesthetics) */}
        <div className="space-y-4">
          <SectionTitle>Shared Media</SectionTitle>
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl bg-secondary/40 border border-border/10 overflow-hidden group cursor-pointer"
              >
                <div className="w-full h-full bg-linear-to-br from-primary/5 to-primary/20 transition-transform duration-500 group-hover:scale-110" />
              </div>
            ))}
          </div>
        </div>

        {/* Chat Actions */}
        <div className="space-y-2 pb-10">
          <SectionTitle>Conversation Management</SectionTitle>
          <div className="p-1 rounded-2xl bg-secondary/20 space-y-1 overflow-hidden">
            <SettingsItem
              icon={channel.isPinned ? Pin : Pin}
              label={channel.isPinned ? 'Unpin this chat' : 'Pin this chat'}
              isActive={channel.isPinned}
            />
            <SettingsItem
              icon={channel.isMuted ? BellOff : Bell}
              label={channel.isMuted ? 'Unmute notifications' : 'Mute notifications'}
              isActive={channel.isMuted}
            />
            <DropdownMenuSeparator className="bg-border/20 mx-3 my-1" />
            <SettingsItem
              icon={channel.isRestricted ? Lock : Unlock}
              label={channel.isRestricted ? 'Remove restriction' : 'Restrict interaction'}
              isActive={channel.isRestricted}
            />
            <SettingsItem icon={ShieldAlert} label={channel.isMessagingBlocked ? 'Unblock creator' : 'Block creator'} isDestructive />
            <SettingsItem icon={Trash} label="Delete conversation" isDestructive />
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 px-3 py-1">{children}</h3>;
}

function InfoItem({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/20 border border-border/5">
      <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-background/50 shadow-sm">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-wider">{label}</span>
        <span className="text-sm font-bold truncate">{value}</span>
      </div>
    </div>
  );
}

function SettingsItem({
  icon: Icon,
  label,
  isDestructive,
  isActive
}: {
  icon: any;
  label: string;
  isDestructive?: boolean;
  isActive?: boolean;
}) {
  return (
    <Button
      variant="ghost"
      className={cn(
        'w-full justify-between h-11 px-3 rounded-xl hover:bg-background/40 transition-all font-bold text-[11px] uppercase tracking-tight group',
        isDestructive ? 'text-destructive hover:text-destructive hover:bg-destructive/10' : 'text-foreground/70',
        isActive && 'text-primary bg-primary/5'
      )}
    >
      <div className="flex items-center gap-3">
        <Icon
          className={cn(
            'w-3.5 h-3.5 transition-colors',
            isDestructive ? 'text-destructive' : isActive ? 'text-primary' : 'text-muted-foreground/40 group-hover:text-foreground'
          )}
        />
        {label}
      </div>
      {isActive && <div className="h-1 w-1 rounded-full bg-primary animate-pulse" />}
    </Button>
  );
}
