import { ExoAdProvider, ExoAdZoneTypes } from '@/components/ExoAdProvider';
import { useFan } from '@/hooks/context/UserContextWrapper';
import { Separator } from '@radix-ui/react-separator';
import { VaultsEntity } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@workspace/ui/components/card';
import { SAvatar } from '@workspace/ui/globals/SAvatar';
import { cn } from '@workspace/ui/lib/utils';
import { Heart } from 'lucide-react';
import moment from 'moment';
import Link from 'next/link';

interface VaultObjectsInfoProps {
  vault?: VaultsEntity;
}

export const SingleVaultInfo: React.FC<VaultObjectsInfoProps> = ({ vault }) => {
  const { fan } = useFan();
  return (
    <Card
      className={cn(
        'overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm mb-16 md:max-w-[calc(100vw-270px)] w-full'
      )}
    >
      <CardHeader className="flex flex-row items-center gap-3 pt-4">
        <Link href={`/creators/${vault?.creatorProfile?.user?.username}`}>
          <SAvatar className="h-12 w-12" url={vault?.creatorProfile?.user?.avatarUrl} />
        </Link>

        <div className="flex flex-col">
          <Link href={`/creators/${vault?.creatorProfile?.user?.username}`}>
            <p className="font-semibold text-lg">{vault?.creatorProfile?.user?.username}</p>
          </Link>
          <p className="text-sm text-muted-foreground">{moment(vault?.createdAt).fromNow()}</p>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-xs md:text-xl text-muted-foreground whitespace-pre-line">{vault?.description}</p>
        {vault &&
          vault.keywords?.map((tag, idx) => (
            <Link key={idx} href={`/categories/${encodeURIComponent(tag.trim())}`} className="mx-1">
              <Badge variant="secondary" className="gap-1">
                {tag.trim()}
              </Badge>
            </Link>
          ))}
        <ExoAdProvider zoneId="5769740" zoneType={ExoAdZoneTypes.Gallery} />
      </CardContent>

      <Separator />

      <CardFooter className="flex flex-row justify-between items-center py-3 text-sm">
        <div className="flex gap-4 text-muted-foreground">
          <span className="flex items-center gap-1">
            <Heart className={cn('w-4 h-4', vault?.isLiked && 'fill-red-500 text-red-500')} /> {vault?.likeCount}
          </span>
        </div>

        {fan && vault?.isLiked ? (
          <Badge variant="destructive" className="text-xs">
            Liked
          </Badge>
        ) : (
          <Badge variant="outline" className="text-xs">
            Not Liked
          </Badge>
        )}
      </CardFooter>

      <Separator />

      <CardContent className="text-xs text-muted-foreground space-y-1">
        <p>Created: {moment(vault?.createdAt).format('LT L')}</p>
        <p>Updated: {moment(vault?.updatedAt).format('LT L')}</p>
      </CardContent>
    </Card>
  );
};
