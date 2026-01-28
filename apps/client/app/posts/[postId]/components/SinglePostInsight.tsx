import { ExoAdProvider, ExoAdZoneTypes } from '@/components/ExoAdProvider';
import { PostsEntity } from '@workspace/gql/generated/graphql';
import { Card, CardContent } from '@workspace/ui/components/card';
import { StatItem } from '@workspace/ui/globals/StatItem';
import { Bookmark, Eye, Heart, MessageCircle, Share2 } from 'lucide-react';
import { SinglePostAction } from './SinglePostAction';
import { SinglePostDetails } from './SinglePostDetails';

interface SinglePostStatsProps {
  post: PostsEntity;
}

export const SinglePostInsight = ({ post }: SinglePostStatsProps) => {
  return (
    <div className="space-y-6 md:sticky md:top-24">
      <SinglePostDetails post={post} />
      <ExoAdProvider zoneId="5771264" zoneType={ExoAdZoneTypes.OutStream} />
      <Card className="border-border/60 shadow-sm">
        <CardContent className="p-4">
          <div className="grid grid-cols-5 gap-2">
            <StatItem icon={<Heart className="w-4 h-4 text-rose-500" />} value={post.likeCount} label="Like" />
            <StatItem icon={<Eye className="w-4 h-4 text-blue-500" />} value={post.viewCount} label="View" />
            <StatItem icon={<Bookmark className="w-4 h-4 text-yellow-500" />} value={post.saveCount} label="Save" />
            <StatItem icon={<Share2 className="w-4 h-4 text-green-500" />} value={post.shareCount} label="Share" />
            <StatItem icon={<MessageCircle className="w-4 h-4 text-purple-500" />} value={post.commentCount} label="Comment" />
          </div>
        </CardContent>
      </Card>
      <SinglePostAction post={post} />
    </div>
  );
};
