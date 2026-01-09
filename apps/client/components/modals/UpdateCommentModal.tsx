'use client';

import { useCommentMutations } from '@/hooks/useCommentMutations';
import { PostCommentsEntity } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Label } from '@workspace/ui/components/label';
import { Textarea } from '@workspace/ui/components/textarea';
import { LoadingButton } from '@workspace/ui/globals/LoadingButton';
import { Modal } from '@workspace/ui/modals/Modal';
import { Send } from 'lucide-react';
import { useState } from 'react';

interface Props {
  comment: PostCommentsEntity;
  isOpen: boolean;
  onClose?: () => unknown;
}

export const UpdateCommentModal: React.FC<Props> = ({ isOpen, onClose, comment }) => {
  const [newComment, setNewComment] = useState<string>(comment.comment);
  const { updateComment } = useCommentMutations();

  const handleClose = () => {
    setNewComment(newComment);
    onClose?.();
  };

  const handleUpdateComment = async () => {
    try {
      await updateComment(newComment, comment.id);
    } finally {
      handleClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} description="Update your thoughts on this post" title="Update comment">
      <div className="w-full h-full">
        <div className="space-y-1">
          <Label htmlFor="message-2">Your comment</Label>
          <Textarea
            placeholder="Type your message here."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            id="message-2"
            title="Update your comment"
          />
        </div>
        <p className="text-muted-foreground text-sm">Your comment will be seen publicly.</p>
        <div className="flex flex-row justify-between">
          <Button variant={'outline'} onClick={handleClose} title="Cancel">
            Cancel
          </Button>
          <LoadingButton
            onClick={handleUpdateComment}
            Icon={Send}
            disabled={!newComment.length || newComment === comment.comment}
            variant={'outline'}
            title="Commit"
          />
        </div>
      </div>
    </Modal>
  );
};
