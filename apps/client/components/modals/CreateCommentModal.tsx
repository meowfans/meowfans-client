'use client';

import { Send } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@workspace/ui/components/button';
import { Label } from '@workspace/ui/components/label';
import { Textarea } from '@workspace/ui/components/textarea';
import { Modal } from '@workspace/ui/modals/Modal';
import { LoadingButton } from '@workspace/ui/globals/LoadingButton';
import { useCommentMutations } from '@/hooks/useCommentMutations';

interface Props {
  postId: string;
  isOpen: boolean;
  onClose?: () => unknown;
}

export const CreateCommentModal: React.FC<Props> = ({ isOpen, onClose, postId }) => {
  const { createComment } = useCommentMutations();
  const [comment, setComment] = useState<string>('');

  const handleClose = () => {
    setComment('');
    onClose?.();
  };

  const handleCreateComment = async () => {
    try {
      await createComment(postId, comment);
    } finally {
      handleClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} description="Share your thoughts on this post" title="New comment">
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
