import { usePostsAnalytics } from '@/hooks/usePosts';
import { DateTrunc, GetPostsInfoOutput, PostStats } from '@workspace/gql/generated/graphql';
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from '@workspace/ui/components/card';
import { Skeleton } from '@workspace/ui/components/skeleton';
import { handleFormatNumberToKAndM } from '@workspace/ui/lib/formatters';
import { useMemo } from 'react';

interface PostDetailsProps {
  loading: boolean;
  postsInfo: GetPostsInfoOutput[];
}

interface PostDetailsProps {
  loading: boolean;
  postsInfo: GetPostsInfoOutput[];
}

export const PostDetails = ({ loading, postsInfo }: PostDetailsProps) => {
  const { postsAnalytics, loading: analyticsLoading } = usePostsAnalytics({
    postStats: [
      PostStats.ViewCount,
      PostStats.LikeCount,
      PostStats.CommentCount,
      PostStats.SaveCount,
      PostStats.ShareCount,
      PostStats.TotalEarning
    ],
    field: DateTrunc.Month,
    addId: false
  });

  const summary = useMemo(() => {
    if (!postsAnalytics?.length) {
      return {
        views: 0,
        likes: 0,
        comments: 0,
        saves: 0,
        shares: 0,
        earnings: 0
      };
    }

    return postsAnalytics.reduce(
      (acc, row) => {
        acc.views += row.viewCount ?? 0;
        acc.likes += row.likeCount ?? 0;
        acc.comments += row.commentCount ?? 0;
        acc.saves += row.saveCount ?? 0;
        acc.shares += row.shareCount ?? 0;
        acc.earnings += row.totalEarning ?? 0;
        return acc;
      },
      {
        views: 0,
        likes: 0,
        comments: 0,
        saves: 0,
        shares: 0,
        earnings: 0
      }
    );
  }, [postsAnalytics]);

  const isLoading = loading || analyticsLoading;

  const details = [
    {
      description: 'Total posts',
      title: postsInfo.length,
      content: 'Fetched posts'
    },
    {
      description: 'Views',
      title: summary.views.toLocaleString(),
      content: 'Backend aggregated'
    },
    {
      description: 'Earnings',
      title: handleFormatNumberToKAndM(summary.earnings),
      content: 'From completed unlocks'
    },
    {
      description: 'Engagement',
      title: summary.likes.toLocaleString(),
      content: `${summary.comments.toLocaleString()} comments · ${summary.saves.toLocaleString()} saves · ${summary.shares.toLocaleString()} shares`
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {details.map((detail, idx) => (
        <Card key={idx} className="bg-background/70 backdrop-blur">
          <CardHeader className="pb-2">
            <CardDescription>{detail.description}</CardDescription>
            <CardTitle className="text-2xl">{isLoading ? <Skeleton className="h-7 w-20" /> : detail.title}</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">{detail.content}</CardContent>
        </Card>
      ))}
    </div>
  );
};
