import { CreatorNextImage } from '@/components/CreatorNextImage';
import { GetPostsInfoOutput } from '@workspace/gql/generated/graphql';
import { ExtendedBadge } from '@workspace/ui/globals/ExtendedBadge';
import moment from 'moment';
import { PostActionsBar } from './PostActionsBar';

interface PostRowDesktopProps {
  post: GetPostsInfoOutput;
  isDeleted: boolean;
}

export const PostRowDesktop = ({ isDeleted, post }: PostRowDesktopProps) => {
  return (
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
  );
};
