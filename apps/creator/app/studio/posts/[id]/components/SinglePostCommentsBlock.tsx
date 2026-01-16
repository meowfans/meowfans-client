import { PostsEntity } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarImage, AvatarFallback } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Separator } from '@workspace/ui/components/separator';
import { MessageCircle } from 'lucide-react';

interface SinglePostCommentsBlockProps {
  post: PostsEntity;
}
export const SinglePostCommentsBlock = ({ post }: SinglePostCommentsBlockProps) => {
  const comment = post.latestComment;

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-2 pt-5 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <MessageCircle className="w-4 h-4" /> Latest Comment
        </CardTitle>
        {post.commentCount > 1 && (
          <Button variant="link" size="sm" className="h-auto p-0 text-xs text-muted-foreground">
            View all {post.commentCount}
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {!comment ? (
          <div className="py-6 text-center text-xs text-muted-foreground bg-muted/20 rounded-lg">No comments yet.</div>
        ) : (
          <div className="space-y-4">
            <div className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={comment.fanProfile?.user?.avatarUrl || ''} />
                <AvatarFallback>{comment.fanProfile?.user?.username?.slice(0, 2).toUpperCase() || 'U'}</AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold">{comment.fanProfile?.user?.username || 'Unknown User'}</p>
                  <p className="text-[10px] text-muted-foreground">{new Date(comment.createdAt).toLocaleDateString()}</p>
                </div>
                <p className="text-sm text-foreground/90 leading-snug">{comment.comment}</p>
              </div>
            </div>

            <Separator />

            <p className="text-[10px] text-center text-muted-foreground italic">Comments are shown for moderation purposes.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
