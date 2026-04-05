import { useMessageUIStore } from '@/hooks/store/message.store';
import { useMessageMutations } from '@/hooks/useMessages';
import { MessagesOutput } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@workspace/ui/components/dropdown-menu';
import { cn } from '@workspace/ui/lib/utils';
import { Copy, Edit, Info, MoreHorizontal, Reply, Trash } from 'lucide-react';
import React, { useState } from 'react';
import { MessageInfoModal } from '../modal/MessageInfoModal';

interface SingleMessageOptionsProps {
  isMe: boolean;
  message: MessagesOutput;
}

export const SingleMessageOptions: React.FC<SingleMessageOptionsProps> = ({ isMe, message }) => {
  const [showInfo, setShowInfo] = useState(false);
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const { deleteMessage } = useMessageMutations();
  const { setContent, setIsEditing, setReplyMessageId, setSelectedMessage } = useMessageUIStore();

  const handleReply = () => {
    setReplyMessageId(message.id);
    setSelectedMessage(message);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setSelectedMessage(message);
    setContent(message.content);
    setIsEditing(true);
    setReplyMessageId(null);
  };

  return (
    <>
      <div className={cn('opacity-0 group-hover:opacity-100 transition-all duration-200 self-center shrink-0', isMe ? 'mr-1' : 'ml-1')}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm" className="rounded-full h-7 w-7 hover:bg-secondary">
              <MoreHorizontal className="h-3 w-3 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align={isMe ? 'end' : 'start'}
            className="w-40 rounded-xl border-border/50 backdrop-blur-3xl bg-background/80 shadow-2xl"
          >
            <DropdownMenuItem
              onClick={handleReply}
              className="flex items-center gap-2 font-bold text-[11px] py-2 rounded-lg cursor-pointer"
            >
              <Reply className="h-3 w-3" />
              Reply
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => copyToClipboard(message.content)}
              className="flex items-center gap-2 font-bold text-[11px] py-2 rounded-lg cursor-pointer"
            >
              <Copy className="h-3 w-3" />
              Copy Text
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setShowInfo(true)}
              className="flex items-center gap-2 font-bold text-[11px] py-2 rounded-lg cursor-pointer"
            >
              <Info className="h-3 w-3" />
              Message Info
            </DropdownMenuItem>
            {isMe && (
              <>
                <DropdownMenuSeparator className="bg-border/50" />
                <DropdownMenuItem
                  onClick={handleEdit}
                  className="flex items-center gap-2 font-bold text-[11px] py-2 rounded-lg cursor-pointer"
                >
                  <Edit className="h-3 w-3" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => deleteMessage({ messageId: message.id })}
                  className="flex items-center gap-2 font-bold text-[11px] py-2 rounded-lg cursor-pointer text-destructive focus:text-destructive"
                >
                  <Trash className="h-3 w-3" />
                  Delete
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <MessageInfoModal isOpen={showInfo} onClose={() => setShowInfo(false)} message={message as any} />
    </>
  );
};
