'use client';

import { useUpdateChannel } from '@/hooks/useChannels';
import { ChannelsOutput } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { DropdownMenuSeparator } from '@workspace/ui/components/dropdown-menu';
import { cn } from '@workspace/ui/lib/utils';
import { motion } from 'framer-motion';
import {
  Bell,
  BellOff,
  Calendar,
  Clock,
  ExternalLink,
  Lock,
  MoreVertical,
  Pin,
  ShieldAlert,
  ShieldCheck,
  ShieldX,
  Unlock
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface FanDetailsProps {
  channel: ChannelsOutput | null;
}

export function FanDetails({ channel }: FanDetailsProps) {
  const updateChannel = useUpdateChannel().updateChannel;
  const loading = useUpdateChannel().loading;
  const router = useRouter();

  if (!channel) return null;

  const handleToggle = async (
    field: 'hasPinnedThisChannel' | 'hasMutedThisChannel' | 'hasRestrictedThisChannel' | 'hasBlockedThisChannel'
  ) => {
    await updateChannel({
      channelId: channel.id,
      [field]: !channel[field]
    });
  };

  const handleBlock = async () => {
    await updateChannel({ channelId: channel.id, hasBlockedThisChannel: !channel.hasBlockedThisChannel });
  };

  const handleTerminate = async () => {
    await updateChannel({ channelId: channel.id, hasBlockedThisChannel: true });
    router.push('/channels');
  };

  return (
    <div className="flex h-full w-full flex-col bg-background/30 backdrop-blur-3xl overflow-y-auto custom-scrollbar border-l border-border/50">
      <div className="p-4 space-y-6">
        {/* Profile Section */}
        <div className="flex flex-col items-center text-center space-y-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative">
            <Avatar className="h-32 w-32 border-4 border-background shadow-2xl ring-2 ring-primary/20">
              <AvatarImage src={channel.fanAvatarUrl} alt={channel.fanFullname} className="object-cover" />
              <AvatarFallback className="bg-primary/10 text-4xl font-black text-primary">
                {channel.fanFullname.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {channel.isFanOnline && (
              <span className="absolute bottom-2 right-2 h-6 w-6 rounded-full border-4 border-background bg-green-500 shadow-lg" />
            )}
          </motion.div>

          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1.5 px-4 min-w-0">
              <h2 className="text-xl font-black tracking-tight truncate">{channel.fanFullname}</h2>
              <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
            </div>
            <p className="text-[10px] font-black text-muted-foreground/30 uppercase tracking-widest">Subscriber</p>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Button
              variant="outline"
              asChild
              size="sm"
              className="rounded-2xl h-10 px-6 bg-secondary/30 border-none font-black text-[10px] uppercase tracking-widest hover:bg-primary/10 hover:text-primary transition-all"
            >
              <Link href={`/fans/${channel.fanId}`}>
                <ExternalLink className="w-3 h-3 mr-1.5" />
                View Profile
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="rounded-2xl h-10 w-10 p-0 bg-secondary/30 border-none">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 gap-2 pt-4">
          <SectionTitle>Subscriber Data</SectionTitle>
          <InfoItem icon={Calendar} label="Subscribed since" value="January 2024" />
          <InfoItem icon={Clock} label="Total Duration" value="3 Months" />
        </div>

        {/* Media / Files (Placeholders) */}
        <div className="space-y-4">
          <SectionTitle>Attachments Shared</SectionTitle>
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
          <SectionTitle>Conversation Settings</SectionTitle>
          <div className="p-1 rounded-2xl bg-secondary/20 space-y-1 overflow-hidden shadow-sm">
            <SettingsItem
              icon={channel.hasPinnedThisChannel ? Pin : Pin}
              label={channel.hasPinnedThisChannel ? 'Unpin conversation' : 'Pin conversation'}
              isActive={channel.hasPinnedThisChannel}
              loading={loading}
              onClick={() => handleToggle('hasPinnedThisChannel')}
            />
            <SettingsItem
              icon={channel.hasMutedThisChannel ? BellOff : Bell}
              label={channel.hasMutedThisChannel ? 'Unmute notifications' : 'Mute notifications'}
              isActive={channel.hasMutedThisChannel}
              loading={loading}
              onClick={() => handleToggle('hasMutedThisChannel')}
            />
            <DropdownMenuSeparator className="bg-border/20 mx-3 my-1" />
            <SettingsItem
              icon={channel.hasRestrictedThisChannel ? Lock : Unlock}
              label={channel.hasRestrictedThisChannel ? 'Remove restriction' : 'Restrict access'}
              isActive={channel.hasRestrictedThisChannel}
              loading={loading}
              onClick={() => handleToggle('hasRestrictedThisChannel')}
            />
            <SettingsItem
              icon={channel.hasBlockedThisChannel ? ShieldCheck : ShieldAlert}
              label={channel.hasBlockedThisChannel ? 'Unblock interaction' : 'Block interaction'}
              isDestructive={!channel.hasBlockedThisChannel}
              isActive={channel.hasBlockedThisChannel}
              loading={loading}
              onClick={handleBlock}
            />
            <SettingsItem icon={ShieldX} label="Terminate thread" isDestructive loading={loading} onClick={handleTerminate} />
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
        <span className="text-[10px] font-black text-muted-foreground/30 uppercase tracking-wider leading-none mb-1">{label}</span>
        <span className="text-sm font-black truncate text-foreground/80 leading-none">{value}</span>
      </div>
    </div>
  );
}

function SettingsItem({
  icon: Icon,
  label,
  isDestructive,
  isActive,
  loading,
  onClick
}: {
  icon: any;
  label: string;
  isDestructive?: boolean;
  isActive?: boolean;
  loading?: boolean;
  onClick?: () => void;
}) {
  return (
    <Button
      variant="ghost"
      disabled={loading}
      onClick={onClick}
      className={cn(
        'w-full justify-between h-11 px-3 rounded-xl hover:bg-background/40 transition-all font-black text-[10px] uppercase tracking-tighter group',
        isDestructive ? 'text-destructive hover:text-destructive hover:bg-destructive/10' : 'text-foreground/60',
        isActive && !isDestructive && 'text-primary bg-primary/5'
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
      {isActive && !isDestructive && (
        <div className="h-1 w-1 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
      )}
    </Button>
  );
}
