import { CreatorNextImage } from '@/components/CreatorNextImage';
import { ExtendedBadge } from '@workspace/ui/globals/ExtendedBadge';
import { SpanView } from '@workspace/ui/globals/SpanView';
import { handleFormatNumberToKAndM } from '@workspace/ui/lib/formatters';
import { formatText } from '@workspace/ui/lib/helpers';
import moment from 'moment';
import { PostActionsBar } from './PostActionsBar';
import { GetPostsInfoOutput } from '@workspace/gql/generated/graphql';

interface PostRowMobileProps {
  post: GetPostsInfoOutput;
  isDeleted: boolean;
}

export const PostRowMobile = ({ post, isDeleted }: PostRowMobileProps) => {
  return (
    <div className="flex gap-4 md:hidden">
      <div className="relative h-14 w-14 shrink-0 bg-muted">
        <CreatorNextImage imageUrl={post.preview} className="object-cover" height={100} />
        <ExtendedBadge
          variant="outline"
          label={post.types?.[0]}
          className="absolute top-0 left-0 rounded-none px-1 py-0 text-[9px] bg-background/90"
        />
      </div>

      <div className="flex flex-col gap-1 flex-1">
        <div className="flex flex-wrap gap-2 text-[10px] text-muted-foreground">
          <SpanView label="V" value={post.viewCount} />
          <SpanView label="L" value={post.likeCount} />
          <SpanView label="C" value={post.commentCount} />
          <SpanView label="S" value={post.saveCount} />
          <SpanView label="Sh" value={post.shareCount} />
        </div>

        <div className="flex gap-4">
          <span>
            Unlock <b>{handleFormatNumberToKAndM(post.unlockPrice ?? 0)}</b>
          </span>
          <span className="font-semibold">
            {formatText(post.totalEarning, 'Earned')} {handleFormatNumberToKAndM(post.totalEarning)}
          </span>
        </div>

        <div className="flex gap-3 text-[10px] text-muted-foreground">
          <SpanView label="C" value={moment(post.createdAt).fromNow()} />
          <SpanView label="U" value={moment(post.updatedAt).fromNow()} />
        </div>
      </div>

      <PostActionsBar disabled={isDeleted} post={post} />
    </div>
  );
};
