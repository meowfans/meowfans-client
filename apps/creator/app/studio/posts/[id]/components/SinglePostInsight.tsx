import { PostsEntity } from '@workspace/gql/generated/graphql';
import { Card, CardContent } from '@workspace/ui/components/card';
import { StatItem } from '@workspace/ui/globals/StatItem';
import { Bookmark, Eye, Heart, MessageCircle, Share2 } from 'lucide-react';
import { SinglePostCommentsBlock } from './SinglePostCommentsBlock';
import { SinglePostDetails } from './SinglePostDetails';
import { SinglePostEarnings } from './SinglePostEarnings';

interface SinglePostStatsProps {
  post: PostsEntity;
}

export const SinglePostInsight = ({ post }: SinglePostStatsProps) => {
  return (
    <div className="space-y-6 md:sticky md:top-24">
      <SinglePostDetails post={post} />
      <Card className="border-border/60 shadow-sm">
        <CardContent className="p-4">
          <div className="grid grid-cols-5 gap-2">
            <StatItem icon={<Heart className="w-4 h-4 text-rose-500" />} value={post.likeCount} label="Likes" />
            <StatItem icon={<Eye className="w-4 h-4 text-blue-500" />} value={post.viewCount} label="Views" />
            <StatItem icon={<Bookmark className="w-4 h-4 text-yellow-500" />} value={post.saveCount} label="Saves" />
            <StatItem icon={<Share2 className="w-4 h-4 text-green-500" />} value={post.shareCount} label="Shares" />
            <StatItem icon={<MessageCircle className="w-4 h-4 text-purple-500" />} value={post.commentCount} label="Comments" />
          </div>
        </CardContent>
      </Card>
      <SinglePostEarnings post={post} />
      <SinglePostCommentsBlock post={post} />
    </div>
  );
};
