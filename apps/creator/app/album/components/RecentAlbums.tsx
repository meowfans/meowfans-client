import { VaultsEntity } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Skeleton } from '@workspace/ui/components/skeleton';
import { ExtendedCard } from '@workspace/ui/globals/ExtendedCard';
import { handleFormatNumberToKAndM } from '@workspace/ui/lib/formatters';
import moment from 'moment';
import Link from 'next/link';

interface RecentAlbumsProps {
  loading: boolean;
  vaults: VaultsEntity[];
}

export const RecentAlbums = ({ loading, vaults }: RecentAlbumsProps) => {
  return (
    <ExtendedCard
      title="Recent Vaults"
      description="Quick glance at what’s fresh"
      contentClassName="space-y-3"
      className="bg-background/70 backdrop-blur"
    >
      {loading ? (
        <div className="space-y-3">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      ) : vaults.length ? (
        vaults.slice(0, 6).map((p) => (
          <div key={p.id} className="flex items-start justify-between gap-3 rounded-lg border bg-background/60 p-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium line-clamp-1">{p.description || 'Untitled vault'}</p>
                {p.deletedAt ? <Badge variant="destructive">Deleted</Badge> : null}
              </div>
              <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <span>Views: {p.viewCount ?? 0}</span>
                <span>Likes: {p.likeCount ?? 0}</span>
                <span>Earned: {handleFormatNumberToKAndM(p.totalEarning)}</span>
              </div>
              <div className="mt-1 text-[11px] text-muted-foreground">Created {moment(p.createdAt).fromNow()}</div>
            </div>
            <Badge variant="outline" className="shrink-0">
              {/* {Array.isArray(p.) ? p.types.join(', ') : String(p.types ?? '')} */}
            </Badge>
          </div>
        ))
      ) : (
        <div className="text-sm text-muted-foreground">No vaults found.</div>
      )}

      <div className="pt-2">
        <Button asChild variant="outline" className="w-full">
          <Link href="/album/vaults">Open vaults manager</Link>
        </Button>
      </div>
    </ExtendedCard>
  );
};
