'use client';

import { useFollows } from '@/hooks/useFollow';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { LoadingButton } from '@workspace/ui/globals/LoadingButton';
import { Modal } from '@workspace/ui/modals/Modal';

interface Props {
  creatorId: string;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onUnFollowed?: () => unknown;
}

export const UnFollowModal: React.FC<Props> = ({ isOpen, setOpen, creatorId, onUnFollowed }) => {
  const { creatorUnfollowHandler } = useFollows();

  const handleClose = () => setOpen(false);

  const handleUnFollowCreator = async () => {
    await creatorUnfollowHandler(creatorId);
    onUnFollowed?.();
    handleClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Unfollow this creator?"
      description="Once you unfollow, you’ll stop receiving updates from this creator."
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center text-center"
      >
        <AlertTriangle className="text-red-500 mb-3" size={42} />
        <p className="text-gray-500 mb-6">Are you sure you want to unfollow this creator?</p>

        <div className="flex justify-center gap-3 w-full">
          <Button
            onClick={handleClose}
            variant="secondary"
            size="lg"
            className="w-1/2 rounded-full  hover:bg-gray-500 transition-all duration-300"
          >
            Cancel
          </Button>
          <LoadingButton
            onClick={handleUnFollowCreator}
            destructive
            size="lg"
            title="Unfollow"
            className="w-1/2 rounded-full bg-red-600 hover:bg-red-700 transition-all duration-300 shadow-sm"
          />
        </div>
      </motion.div>
    </Modal>
  );
};
