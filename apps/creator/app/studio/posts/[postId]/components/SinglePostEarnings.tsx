import { usePostsStore } from '@/hooks/store/posts.store';
import { PostsEntity } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@workspace/ui/components/card';
import { DollarSign, Lock } from 'lucide-react';

interface SinglePostEarningsProps {
  post: PostsEntity;
}

export const SinglePostEarnings = ({ post }: SinglePostEarningsProps) => {
  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-3 pt-5">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <DollarSign className="w-4 h-4" /> Monetization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-lg border border-emerald-500/10">
          <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Total Earnings</span>
          <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">₹{post.totalEarning ?? 0}</span>
        </div>

        {post.unlockPrice != null && post.unlockPrice > 0 && (
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Lock className="w-3.5 h-3.5" />
              <span>Unlock Price</span>
            </div>
            <Badge variant="outline" className="font-semibold">
              ₹{post.unlockPrice}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
