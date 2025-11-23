import { MessagesEntity } from './Message';
import { MessageThread } from './Thread';

interface Props {
  messages: MessagesEntity[];
}

export const MessageContainer: React.FC<Props> = ({ messages }) => {
  return (
    <div className="w-full space-y-1 flex flex-col pb-17">
      {messages.map((message) => (
        <div key={message.id} className={`flex w-full ${message.id % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
          <MessageThread message={message} />
        </div>
      ))}
    </div>
  );
};
