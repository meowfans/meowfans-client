import { useMessagesStore } from '@/hooks/store/message.store';
import { useMessageMutations } from '@/hooks/useMessages';
import { Button } from '@workspace/ui/components/button';
import { toast } from 'sonner';

export const MultiSelectButtons = () => {
  const { deleteMessages } = useMessageMutations();
  const { deleteMessageIds, setDeleteMessageIds, setOpenMultiSelect, openMultiSelect } = useMessagesStore();

  const handleCancelMultiSelection = () => {
    setDeleteMessageIds([]);
    setOpenMultiSelect(false);
  };

  const handleDeleteMultipleMessages = async () => {
    if (!deleteMessageIds.length) return;

    if (deleteMessageIds.length > 25) {
      return toast.warning('Maximum 25 messages can be deleted in one entry', {
        description: 'Deselect some messages'
      });
    }

    await deleteMessages({ messageIds: deleteMessageIds.slice(0, 25) });

    handleCancelMultiSelection();
  };

  return openMultiSelect ? (
    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-sm flex justify-between bg-card border-2 rounded-xs p-2">
      <Button variant="outline" onClick={handleCancelMultiSelection}>
        Cancel
      </Button>
      <Button variant="destructive" onClick={handleDeleteMultipleMessages}>
        Delete {deleteMessageIds.length}
      </Button>
    </div>
  ) : null;
};
