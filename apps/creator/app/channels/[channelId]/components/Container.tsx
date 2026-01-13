import { MessagesEntity } from './Message';
import { MessageThread } from './Thread';

interface Props {
  messages: MessagesEntity[];
}

export const MessageContainer: React.FC<Props> = ({ messages }) => {
  return (
    <div className="w-full space-y-3 flex flex-col">
      {messages.map((message) => {
        const isOutgoing = message.id % 2 === 0;
        return (
          <div key={message.id} className={`flex w-full ${isOutgoing ? 'justify-end' : 'justify-start'}`}>
            <MessageThread message={message} isOutgoing={isOutgoing} />
          </div>
        );
      })}
    </div>
  );
};
