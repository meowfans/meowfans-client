import { MessagesEntity } from '@workspace/gql/generated/graphql';
import { MessageThread } from './Thread';

interface Props {
  messages: MessagesEntity[];
}

export const MessageContainer: React.FC<Props> = ({ messages }) => {
  return (
    <div className="w-full space-y-3 flex flex-col">
      {messages.map((message) => {
        return (
          <div key={message.id} className={`flex w-full }`}>
            <MessageThread message={message} />
          </div>
        );
      })}
    </div>
  );
};
