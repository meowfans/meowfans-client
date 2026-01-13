import { GetPostsInfoOutput } from '@workspace/gql/generated/graphql';
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from '@workspace/ui/components/card';
import { Skeleton } from '@workspace/ui/components/skeleton';
import { handleFormatNumberToKAndM } from '@workspace/ui/lib/formatters';
import { useMemo } from 'react';

interface PostDetailsProps {
  loading: boolean;
  postsInfo: GetPostsInfoOutput[];
}

export const PostDetails = ({ loading, postsInfo }: PostDetailsProps) => {
  const summary = useMemo(() => {
    const totalViews = postsInfo.reduce((sum, p) => sum + (p.viewCount ?? 0), 0);
    const totalLikes = postsInfo.reduce((sum, p) => sum + (p.likeCount ?? 0), 0);
    const totalComments = postsInfo.reduce((sum, p) => sum + (p.commentCount ?? 0), 0);
    const totalSaves = postsInfo.reduce((sum, p) => sum + (p.saveCount ?? 0), 0);
    const totalShares = postsInfo.reduce((sum, p) => sum + (p.shareCount ?? 0), 0);
    const totalEarning = postsInfo.reduce((sum, p) => sum + (p.totalEarning ?? 0), 0);

    return {
      totalViews,
      totalLikes,
      totalComments,
      totalSaves,
      totalShares,
      totalEarning,
      totalPosts: postsInfo.length
    };
  }, [postsInfo]);

  const details = [
    { description: 'Total posts', title: summary.totalPosts, content: 'Last 30 fetched' },
    { description: 'Views', title: summary.totalViews.toLocaleString(), content: 'Across recent posts' },
    { description: 'Earnings', title: handleFormatNumberToKAndM(summary.totalEarning), content: 'Estimated from totals' },
    {
      description: 'Engagement',
      title: summary.totalLikes.toLocaleString(),
      content: `${summary.totalComments.toLocaleString()} comments · ${summary.totalSaves.toLocaleString()} saves · ${summary.totalShares.toLocaleString()} shares`
    }
  ];
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {details.map((detail, idx) => (
        <Card className="bg-background/70 backdrop-blur" key={idx}>
          <CardHeader className="pb-2">
            <CardDescription>{detail.description}</CardDescription>
            <CardTitle className="text-2xl">{loading ? <Skeleton className="h-7 w-20" /> : detail.title}</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">{detail.content}</CardContent>
        </Card>
      ))}
    </div>
  );
};
