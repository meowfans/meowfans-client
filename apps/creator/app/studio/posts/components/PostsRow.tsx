import { GetPostsInfoOutput } from '@workspace/gql/generated/graphql';
import { cn } from '@workspace/ui/lib/utils';
import moment from 'moment';
import { CreatorNextImage } from '@/components/CreatorNextImage';
import { ExtendedBadge } from '@workspace/ui/globals/ExtendedBadge';
import { SpanView } from '@workspace/ui/globals/SpanView';
import { handleFormatNumberToKAndM } from '@workspace/ui/lib/formatters';
import { formatText } from '@workspace/ui/lib/helpers';
import { PostActionsBar } from './PostActionsBar';

interface PostRowProps {
  post: GetPostsInfoOutput;
}

export const PostRow = ({ post }: PostRowProps) => {
  const isDeleted = Boolean(post.deletedAt);

  return (
    <div className={cn('relative px-3 py-2 text-xs', 'hover:bg-muted/40 transition-colors', isDeleted && 'opacity-60 grayscale')}>
      <div className="flex gap-4 md:hidden">
        <div className="relative h-14 w-14 shrink-0 bg-muted">
          <CreatorNextImage imageUrl={post.preview} fill className="object-cover" />
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

      <div className="hidden md:grid grid-cols-[80px_1fr_1fr_1fr_1fr_1fr_1fr] gap-4 items-center text-muted-foreground">
        <div className="relative h-14 w-14 bg-muted">
          <CreatorNextImage imageUrl={post.preview} fill className="object-cover" />
          <ExtendedBadge
            variant="outline"
            label={post.types?.[0]}
            className="absolute top-0 left-0 rounded-none px-1 py-0 text-[9px] bg-background/90"
          />
        </div>

        <span>{post.viewCount}</span>
        <span>{post.likeCount}</span>
        <span>{post.commentCount}</span>
        <span>{post.unlockPrice ?? 0}</span>
        <span className="font-semibold text-foreground">{post.totalEarning}</span>

        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-2 text-[10px]">
            <span>{moment(post.createdAt).fromNow()}</span>
            <span>{moment(post.updatedAt).fromNow()}</span>
          </div>

          <PostActionsBar disabled={isDeleted} post={post} />
        </div>
      </div>
    </div>
  );
};
