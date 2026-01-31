'use client';

import { useCommentsStore } from '@/hooks/store/comments.store';
import { useCommentMutations } from '@/hooks/useCommentMutations';
import { Button } from '@workspace/ui/components/button';
import { Label } from '@workspace/ui/components/label';
import { Textarea } from '@workspace/ui/components/textarea';
import { LoadingButton } from '@workspace/ui/globals/LoadingButton';
import { Modal } from '@workspace/ui/modals/Modal';
import { Send } from 'lucide-react';
import { useState } from 'react';

export const CreateCommentModal = () => {
  const { createComment } = useCommentMutations();
  const [comment, setComment] = useState<string>('');
  const { setCommentOnPost, commentOnPost } = useCommentsStore();

  const handleClose = () => {
    setComment('');
  };

  const handleCreateComment = async () => {
    if (!commentOnPost) return;
    try {
      await createComment(commentOnPost, comment);
    } finally {
      handleClose();
    }
  };

  return (
    <Modal
      isOpen={!!commentOnPost}
      onClose={() => setCommentOnPost(null)}
      description="Share your thoughts on this post"
      title="New comment"
    >
      <div className="w-full h-full">
        <div className="space-y-1">
          <Label htmlFor="message-2">Your comment</Label>
          <Textarea
            placeholder="Type your message here."
            id="message-2"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            title="Spread your thoughts"
          />
        </div>
        <p className="text-muted-foreground text-sm">Your comment will be seen publicly.</p>
        <div className="flex flex-row justify-between">
          <Button variant={'outline'} onClick={handleClose} title="Cancel">
            Cancel
          </Button>
          <LoadingButton onClick={handleCreateComment} Icon={Send} disabled={!comment.length} variant={'outline'} title="Commit" />
        </div>
      </div>
    </Modal>
  );
};
