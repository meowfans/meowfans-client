'use client';

import { useMessageMultiSelectStore } from '@/hooks/store/message.store';
import { useMessageMutations } from '@/hooks/useMessages';
import { Button } from '@workspace/ui/components/button';
import { Trash2, X } from 'lucide-react';
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
      return toast.warning('Too many messages', {
        description: 'Maximum 25 messages can be deleted at once.'
      });
    }

    await deleteMessages({ messageIds: deleteMessageIds.slice(0, 25) });
    handleCancelMultiSelection();
  };

  if (!openMultiSelect) return null;

  return (
    <div className="mx-auto w-full max-w-4xl px-2">
      <div className="flex items-center justify-between gap-4 p-4 bg-background/80 backdrop-blur-2xl border border-border/50 rounded-3xl animate-in slide-in-from-bottom-4 shadow-2xl transition-all">
        <div className="flex flex-col pl-2">
          <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em] mb-0.5">Selection Active</span>
          <span className="text-sm font-bold text-foreground tracking-tight">
            {deleteMessageIds.length === 0
              ? 'Select messages to manage'
              : `${deleteMessageIds.length} ${deleteMessageIds.length === 1 ? 'message' : 'messages'} selected`}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCancelMultiSelection}
            className="h-10 px-4 text-muted-foreground hover:bg-white/5 hover:text-foreground rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
          >
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDeleteMultipleMessages}
            disabled={!deleteMessageIds.length}
            className="h-10 px-5 bg-red-600 hover:bg-red-500 disabled:opacity-30 disabled:grayscale rounded-xl shadow-lg shadow-red-600/20 font-bold text-xs uppercase tracking-wider transition-all"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete All
          </Button>
        </div>
      </div>
    </div>
  );
};
