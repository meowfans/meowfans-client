import { useCreator } from '@/hooks/context/useCreator';
import { Card, CardContent } from '@workspace/ui/components/card';
import { SAvatar } from '@workspace/ui/globals/SAvatar';
import { formatText } from '@workspace/ui/lib/helpers';

export const FollowerProfileCard = () => {
  const { creator } = useCreator();
  return (
    <Card className="overflow-hidden py-0 gap-0">
      <div className="relative h-36 sm:h-52 w-full bg-muted">
        {creator.user?.bannerUrl ? (
          <img src={creator.user.bannerUrl} alt="Profile banner" className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="h-full w-full bg-linear-to-br from-primary/10 via-muted to-primary/5" />
        )}
      </div>

      <CardContent className="relative p-4 sm:p-6">
        <div className="-mt-10 sm:-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-3">
            <SAvatar className="size-20 border bg-background shadow-sm" url={creator.user.avatarUrl} />

            <div className="pb-1">
              <p className="text-lg font-semibold leading-tight">
                {creator.user.firstName} {creator.user?.lastName}
              </p>
              <p className="text-xs text-muted-foreground">{creator?.creatorType?.toString?.() ?? 'Creator'}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 rounded-xl border bg-background/70 px-4 py-3 text-center">
            <div className="space-y-0.5">
              <p className="text-base font-semibold">{creator.totalPost}</p>
              <p className="text-xs text-muted-foreground">{formatText(creator.totalPost, 'Post')}</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-base font-semibold">{creator.followersCount}</p>
              <p className="text-xs text-muted-foreground">{formatText(creator.followersCount, 'Follower')}</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-base font-semibold">{creator.totalSubscriber}</p>
              <p className="text-xs text-muted-foreground">{formatText(creator.totalSubscriber, 'Subscriber')}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
