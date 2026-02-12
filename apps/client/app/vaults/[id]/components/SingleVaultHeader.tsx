'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Badge } from '@workspace/ui/components/badge';
import Link from 'next/link';

interface SingleVaultHeaderProps {
  description?: string | null;
  username?: string | null;
  avatarUrl?: string | null;
  keywords?: string[] | null;
  creatorId?: string | null;
}

export function SingleVaultHeader({ description, username, avatarUrl, keywords, creatorId }: SingleVaultHeaderProps) {
  return (
    <div className="flex-1 space-y-4">
      {/* Title & Layout Switcher */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="line-clamp-2 text-3xl font-bold tracking-tight md:text-4xl">{description || 'Untitled Vault'}</h1>
      </div>

      {/* Creator */}
      <Link href={`/creators/${creatorId}`} className="inline-block">
        <div className="flex items-center gap-3 transition-opacity hover:opacity-70">
          <Avatar className="h-12 w-12 border-2 border-primary/20">
            <AvatarImage src={avatarUrl || undefined} alt={username || undefined} />
            <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
              {username?.slice(0, 2).toUpperCase() || 'V'}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">@{username}</p>
            <p className="text-sm text-muted-foreground">Creator</p>
          </div>
        </div>
      </Link>

      {/* Keywords */}
      {keywords && keywords.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword, index) => (
            <Badge key={`keyword-${index}`} variant="outline" className="rounded-full">
              #{keyword}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
