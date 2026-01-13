import { CreatorNextImage } from '@/components/CreatorNextImage';
import { GetPostsInfoOutput } from '@workspace/gql/generated/graphql';
import { Separator } from '@workspace/ui/components/separator';
import { ExtendedBadge } from '@workspace/ui/globals/ExtendedBadge';
import { SpanView } from '@workspace/ui/globals/SpanView';
import { handleFormatNumberToKAndM } from '@workspace/ui/lib/formatters';
import moment from 'moment';

interface PostDetailsProps {
  post: GetPostsInfoOutput;
  isDeleted: boolean;
}

export const PostDetails = ({ post, isDeleted }: PostDetailsProps) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative h-28 w-28 rounded-md overflow-hidden bg-muted">
        <CreatorNextImage imageUrl={post.preview} fill className="object-cover" />
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <SpanView label="Views" value={post.viewCount} />
        <SpanView label="Likes" value={post.likeCount} />
        <SpanView label="Comments" value={post.commentCount} />
        <SpanView label="Saves" value={post.saveCount} />
        <SpanView label="Shares" value={post.shareCount} />
      </div>

      <Separator />

      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          <span>Unlock: {handleFormatNumberToKAndM(post.unlockPrice ?? 0)}</span>
          <span className="font-semibold">Earned: {handleFormatNumberToKAndM(post.totalEarning)}</span>
        </div>
        {isDeleted && <ExtendedBadge variant="destructive" label={'Deleted'} />}
      </div>

      <div className="flex justify-between text-[11px] text-muted-foreground">
        <SpanView label="Created" value={moment(post.createdAt).fromNow()} />
        <SpanView label="Updated" value={moment(post.updatedAt).fromNow()} />
      </div>

      <ExtendedBadge variant="outline" label={post.types?.[0]} className="w-fit" />
    </div>
  );
};
