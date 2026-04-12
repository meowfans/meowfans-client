import { WatchHistoryType } from '@workspace/gql/generated/graphql';
import { Clapperboard, Film, Package, Radio } from 'lucide-react';

export type TabValue = 'all' | WatchHistoryType;

export const HISTORY_TABS: { value: TabValue; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: WatchHistoryType.Post, label: 'Posts' },
  { value: WatchHistoryType.Vault, label: 'Vaults' },
  { value: WatchHistoryType.Live, label: 'Lives' },
  { value: WatchHistoryType.Story, label: 'Stories' }
];

export const TYPE_CONFIG: Record<WatchHistoryType, { label: string; icon: React.FC<{ className?: string }>; color: string; bg: string }> = {
  [WatchHistoryType.Post]: {
    label: 'Post',
    icon: Clapperboard,
    color: 'text-violet-400',
    bg: 'bg-violet-500/10'
  },
  [WatchHistoryType.Vault]: {
    label: 'Vault',
    icon: Package,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10'
  },
  [WatchHistoryType.Live]: {
    label: 'Live',
    icon: Radio,
    color: 'text-rose-400',
    bg: 'bg-rose-500/10'
  },
  [WatchHistoryType.Story]: {
    label: 'Story',
    icon: Film,
    color: 'text-sky-400',
    bg: 'bg-sky-500/10'
  }
};

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  });
}

export function formatTime(date: string): string {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function getHistoryHref(type: WatchHistoryType, entityId: string): string | null {
  switch (type) {
    case WatchHistoryType.Post:
      return `/posts/${entityId}`;
    case WatchHistoryType.Vault:
      return `/vaults/${entityId}`;
    case WatchHistoryType.Live:
    case WatchHistoryType.Story:
    default:
      return null;
  }
}
