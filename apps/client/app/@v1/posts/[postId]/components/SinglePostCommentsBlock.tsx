import { UpdateCommentModal } from '@/components/modals/UpdateCommentModal';
import { useFan } from '@/hooks/context/UserContextWrapper';
import { useCommentMutations } from '@/hooks/useCommentMutations';
import { PostCommentsEntity, PostsEntity } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarImage, AvatarFallback } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Separator } from '@workspace/ui/components/separator';
import { DestroyModal } from '@workspace/ui/modals/DestroyModal';
import { TriggerModal } from '@workspace/ui/modals/TriggerModal';
import { Edit, MessageCircle, Trash } from 'lucide-react';
import { useState } from 'react';

interface SinglePostCommentsBlockProps {
  post: PostsEntity;
}
export const SinglePostCommentsBlock = ({ post }: SinglePostCommentsBlockProps) => {
  const comment = post.latestComment;
  const { fan } = useFan();
  const [updateModalOpen, setUpdateModalOpen] = useState<PostCommentsEntity | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState<PostCommentsEntity | null>(null);
  const { deleteComment } = useCommentMutations();

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
        <div className="flex flex-row space-x-1.5">
          <TriggerModal
            disabled={comment?.fanId !== fan?.fanId}
            applyTooltip={{ title: 'Edit' }}
            modalIcon={{ icon: Edit, variant: 'outline' }}
            onChangeModalState={() => setUpdateModalOpen(comment as PostCommentsEntity)}
          />
          <TriggerModal
            disabled={comment?.fanId !== fan?.fanId}
            applyTooltip={{ title: 'Delete' }}
            modalIcon={{ icon: Trash, variant: 'outline' }}
            onChangeModalState={() => setDeleteModalOpen(comment as PostCommentsEntity)}
          />
        </div>
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
      {post && updateModalOpen && (
        <UpdateCommentModal isOpen={!!updateModalOpen} onClose={() => setUpdateModalOpen(null)} comment={updateModalOpen} />
      )}

      {post && deleteModalOpen && (
        <DestroyModal
          isOpen={!!deleteModalOpen}
          title="Remove Comment"
          description="Remove your thoughts from this post"
          subDescription="Your comment will be deleted permanently."
          onClose={() => setDeleteModalOpen(null)}
          cancelButton={{
            title: 'Cancel',
            variant: 'secondary',
            onClick: () => setDeleteModalOpen(null)
          }}
          submitButton={{
            title: 'Delete',
            destructive: true,
            onClick: () => {
              deleteComment(deleteModalOpen.id);
              setDeleteModalOpen(null);
            }
          }}
        />
      )}
    </Card>
  );
};
