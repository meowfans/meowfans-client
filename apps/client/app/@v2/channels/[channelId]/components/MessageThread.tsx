'use client';

import { useMessageInputStore } from '@/hooks/store/message.store';
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
import { format } from 'date-fns';
import { ChevronDown, Delete, Edit, Flag, Reply } from 'lucide-react';
import { MessageThreadContent } from './MessageThreadContent';
interface MessageThreadV2Props {
  message: MessagesOutput;
  isSender?: boolean;
}

export const MessageThread: React.FC<MessageThreadV2Props> = ({ message, isSender = false }) => {
  const { setContent, setIsEditing, setReplyMessageId, setSelectedMessage } = useMessageInputStore();
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
    <div className={cn('group relative max-w-[85%] md:max-w-[70%] flex flex-col gap-1.5', isSender ? 'items-end' : 'items-start')}>
      <DropdownMenu>
        <div
          className={cn(
            'relative rounded-[22px] px-4 py-3 shadow-lg border transition-all duration-300',
            isSender
              ? 'bg-linear-to-br from-amber-500 to-orange-600 border-amber-400/30 text-white rounded-br-none shadow-amber-900/10'
              : 'bg-secondary/60 backdrop-blur-xl border-border/50 text-foreground rounded-bl-none hover:bg-secondary/80 shadow-black/20'
          )}
        >
          <div className="flex items-start gap-4">
            <div className="flex-1 text-[14px] leading-[1.6] whitespace-pre-wrap font-medium tracking-wide">
              <MessageThreadContent message={message} isSender={isSender} />
            </div>

            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  'h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-all active:scale-90',
                  isSender
                    ? 'text-amber-100/70 hover:bg-white/10 hover:text-white'
                    : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                )}
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
          </div>
        </div>

        <DropdownMenuContent
          align={isSender ? 'end' : 'start'}
          className="bg-background/90 backdrop-blur-2xl border-border/50 p-1.5 text-foreground rounded-2xl shadow-2xl min-w-35"
        >
          {isSender && (
            <DropdownMenuItem
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-white/5 focus:bg-white/5 cursor-pointer transition-colors"
              onClick={handleEdit}
            >
              <Edit className="h-4 w-4 text-zinc-400" />
              <span className="text-sm font-medium">Edit</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-white/5 focus:bg-white/5 cursor-pointer transition-colors"
            onClick={handleReply}
          >
            <Reply className="h-4 w-4 text-zinc-400" />
            <span className="text-sm font-medium">Reply</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-border/50 mx-1" />
          <DropdownMenuItem
            className={cn(
              'flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer transition-all',
              isSender ? 'text-red-500 hover:bg-red-500/10 focus:bg-red-500/10' : 'text-muted-foreground hover:bg-white/5 focus:bg-white/5'
            )}
            onClick={isSender ? handleDelete : () => {}}
          >
            {isSender ? (
              <>
                <Delete className="h-4 w-4" />
                <span className="text-sm font-bold">Delete</span>
              </>
            ) : (
              <>
                <Flag className="h-4 w-4" />
                <span className="text-sm font-medium">Report</span>
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest px-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {format(new Date(message.createdAt), 'HH:mm')}
      </span>
    </div>
  );
};
