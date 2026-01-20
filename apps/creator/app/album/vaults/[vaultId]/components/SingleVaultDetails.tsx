import { PostsEntity } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Card, CardHeader, CardContent } from '@workspace/ui/components/card';
import { MoreVertical } from 'lucide-react';

interface SinglePostDetailsProps {
  post: PostsEntity;
}

export const SinglePostDetails = ({ post }: SinglePostDetailsProps) => {
  return (
    <Card className="overflow-hidden border-border/60 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="font-medium capitalize">
            {post.types?.[0]?.toLowerCase() || 'Post'}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {new Date(post.createdAt).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {post.caption || <span className="text-muted-foreground italic">No caption provided.</span>}
        </p>
      </CardContent>
    </Card>
  );
};
