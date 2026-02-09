import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { DollarSign, Heart, MessageCircle } from 'lucide-react';

interface PostsStatsProps {
  totalPosts: number;
  totalLikes: number;
  totalComments: number;
  totalEarnings: number;
}

export function PostsStats({ totalPosts, totalLikes, totalComments, totalEarnings }: PostsStatsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <Card>
        <CardHeader className="pb-2 sm:pb-3">
          <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Total Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl sm:text-3xl font-black">{totalPosts}</div>
          <p className="text-xs text-muted-foreground mt-1">All time</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2 sm:pb-3">
          <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Total Likes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl sm:text-3xl font-black flex items-center gap-2">
            <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-red-500" />
            {totalLikes}
          </div>
          <p className="text-xs text-muted-foreground mt-1 hidden sm:block">Across all posts</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2 sm:pb-3">
          <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Comments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl sm:text-3xl font-black flex items-center gap-2">
            <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
            {totalComments}
          </div>
          <p className="text-xs text-muted-foreground mt-1 hidden sm:block">Engagement</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2 sm:pb-3">
          <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl sm:text-3xl font-black flex items-center gap-2">
            <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
            {totalEarnings.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground mt-1 hidden sm:block">Exclusive posts</p>
        </CardContent>
      </Card>
    </div>
  );
}
