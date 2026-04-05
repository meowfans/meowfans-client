import { useMessageMultiSelectStore } from '@/hooks/store/message.store';
import { ChannelsOutput, MessagesOutput } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { MessageTime } from '@workspace/ui/globals/MessageTime';
import { SeenPreview } from '@workspace/ui/globals/SeenPreview';
import { getTime } from '@workspace/ui/lib/helpers';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useMemo, useState } from 'react';
import { MessageInfoModal } from '../modal/MessageInfoModal';
import { SingleMessageContent } from './SingleMessageContent';

interface SingleMessageProps {
  isMe: boolean;
  channel: ChannelsOutput;
  message: MessagesOutput;
}

export const SingleMessage: React.FC<SingleMessageProps> = ({ channel, isMe, message }) => {
  const [showInfo, setShowInfo] = useState(false);
  const { openMultiSelect, toggleMessageIds, deleteMessageIds } = useMessageMultiSelectStore();
  const isSelected = deleteMessageIds.includes(message.id);

  const hasSeen = useMemo(() => {
    const creatorSeenTime = getTime(channel?.creatorLastSeenAt);
    return creatorSeenTime >= Math.max(getTime(message.createdAt), getTime(message.updatedAt));
  }, [channel, message]);

  const handleMessageClick = () => {
    if (openMultiSelect && isMe) {
      toggleMessageIds(message.id);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className={`flex ${isMe ? 'justify-end' : 'justify-start'} ${openMultiSelect && isMe ? 'cursor-pointer select-none' : ''}`}
        onClick={handleMessageClick}
      >
        <div
          className={`flex gap-3 max-w-[85%] sm:max-w-[70%] items-start ${isMe ? 'flex-row-reverse' : 'flex-row'} ${openMultiSelect && isMe && !isSelected ? 'opacity-60 hover:opacity-80 transition-all duration-200 scale-95' : 'transition-all duration-200'}`}
        >
          {openMultiSelect && isMe && (
            <div className="flex items-center justify-center shrink-0 pr-1 sm:pr-2 pt-2 sm:pt-4">
              <div
                className={`h-5 w-5 rounded-full border-[1.5px] flex items-center justify-center transition-colors ${
                  isSelected ? 'bg-primary border-primary' : 'border-muted-foreground/30 bg-background'
                }`}
              >
                {isSelected && <Check className="h-3 w-3 text-primary-foreground" strokeWidth={3.5} />}
              </div>
            </div>
          )}

          {!isMe && (
            <Avatar className="h-8 w-8 hidden sm:flex border-2 border-background shadow-md shrink-0">
              <AvatarImage src={channel.creatorAvatarUrl} />
              <AvatarFallback>{channel.creatorFullname?.[0]}</AvatarFallback>
            </Avatar>
          )}
          <div
            className={`space-y-1.5 ${isMe ? 'items-end' : 'items-start'} flex flex-col group relative ${openMultiSelect && isMe ? 'pointer-events-none' : ''}`}
          >
            <SingleMessageContent isMe={isMe} message={message} onShowInfo={setShowInfo} />
            <div className={`flex items-center gap-2 px-1 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
              <MessageTime createdAt={message.createdAt} updatedAt={message.updatedAt} />
              <SeenPreview isSender={isMe} seen={hasSeen} />
            </div>
          </div>
        </div>
      </motion.div>

      <MessageInfoModal isOpen={showInfo} onClose={() => setShowInfo(false)} message={message} />
    </>
  );
};
