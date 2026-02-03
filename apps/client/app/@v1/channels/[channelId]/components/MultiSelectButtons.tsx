import { useMessageMultiSelectStore } from '@/hooks/store/message.store';
import { useMessageMutations } from '@/hooks/useMessages';
import { Button } from '@workspace/ui/components/button';
import { toast } from 'sonner';

export const MultiSelectButtons = () => {
  const { deleteMessages } = useMessageMutations();
  const { deleteMessageIds, setDeleteMessageIds, setOpenMultiSelect, openMultiSelect } = useMessageMultiSelectStore();

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
    <div className="fixed bottom-0 left-0 md:left-(--sidebar-width) right-0 md:right-(--sidebar-width) border-t bg-background/80 flex justify-between backdrop-blur p-2">
      <Button variant="outline" onClick={handleCancelMultiSelection}>
        Cancel
      </Button>
      <Button variant="destructive" onClick={handleDeleteMultipleMessages}>
        Delete {deleteMessageIds.length}
      </Button>
    </div>
  ) : null;
};
