import { useChannelsStore } from '@/hooks/store/channels.store';
import { useMessageUIStore } from '@/hooks/store/message.store';
import { useMessageMutations } from '@/hooks/useMessages';
import { MessagesEntity } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu';
import { cn } from '@workspace/ui/lib/utils';
import { ChevronDown, Delete, Edit, Flag, Reply } from 'lucide-react';
import { MessageThreadContent } from './MessageThreadContent';
import { useCreator } from '@/hooks/context/useCreator';
import { useMemo } from 'react';

interface Props {
  message: MessagesEntity;
  isSender?: boolean;
}

export const MessageThread: React.FC<Props> = ({ message, isSender = false }) => {
  const { setContent, setIsEditing, setReplyMessageId, setSelectedMessage } = useMessageUIStore();
  const { deleteMessage } = useMessageMutations();

  const handleEdit = () => {
    setContent(message.content);
    setIsEditing(true);
    setSelectedMessage(message);
  };

  const handleDelete = async () => {
    await deleteMessage({ messageId: message.id });
  };

  const handleReply = () => {
    setReplyMessageId(message.id);
    setSelectedMessage(message);
  };

  return (
    <DropdownMenu>
      <div className="group relative max-w-[min(34rem,90%)] rounded-2xl border px-3 py-2">
        <div className="flex items-start justify-between gap-3">
          <MessageThreadContent message={message} isSender={isSender} />
          <DropdownMenuTrigger
            asChild
            className={cn(
              'h-7 w-7 p-0 opacity-0 transition-opacity group-hover:opacity-100',
              isSender ? 'hover:bg-primary-foreground/10' : 'hover:bg-muted'
            )}
          >
            <Button variant="outline">
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent align="end">
          <DropdownMenuItem visible={isSender} onClick={handleEdit}>
            <Edit />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem visible={isSender} onClick={handleReply}>
            <Reply />
            Reply
          </DropdownMenuItem>
          <DropdownMenuItem visible={isSender} className="text-destructive" onClick={handleDelete}>
            <Delete />
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem visible={!isSender} className="text-destructive">
            <Flag />
            Report
          </DropdownMenuItem>
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
  );
};
