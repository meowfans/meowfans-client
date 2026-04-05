import { MessagesOutput } from '@workspace/gql/generated/graphql';
import { Modal } from '@workspace/ui/modals/Modal';
import { MessageContentSection } from './MessageContentSection';
import { MessageRepliedToSection } from './MessageRepliedToSection';
import { MessageStatusIndicator } from './MessageStatusIndicator';
import { MessageTimeStamps } from './MessageTimeStamps';

interface MessageInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: MessagesOutput;
}

export const MessageInfoModal: React.FC<MessageInfoModalProps> = ({ isOpen, onClose, message }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Message Details" description="Detailed view of message">
      <div className="space-y-6 py-4">
        <MessageRepliedToSection message={message} />
        <MessageContentSection message={message} />
        <MessageTimeStamps message={message} />
        <MessageStatusIndicator message={message} />
      </div>
    </Modal>
  );
};
