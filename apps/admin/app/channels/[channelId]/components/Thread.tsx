import { Modal } from '@workspace/ui/modals/Modal';
import { TriggerModal } from '@workspace/ui/modals/TriggerModal';
import { ChevronDown } from 'lucide-react';
import moment from 'moment';
import { useState } from 'react';
import { MessagesEntity } from './Message';

interface Props {
  message: MessagesEntity;
}

export const MessageThread: React.FC<Props> = ({ message }) => {
  const [messageOptionModal, setMessageOptionModal] = useState<boolean>(false);
  return (
    <div className="border rounded-xl p-1 md:max-w-2xl max-w-2xs shadow-xl">
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="flex flex-row gap-1 items-center content-center">{message.content}</div>
          <div className="flex flex-row justify-end">{moment(message.timestamp).format('hh:mm')}</div>
        </div>
        <div className="flex justify-end">
          <TriggerModal onChangeModalState={() => setMessageOptionModal(true)} modalIcon={{ icon: ChevronDown, size: 'sm' }} />
        </div>
      </div>
      <Modal
        isOpen={messageOptionModal}
        description="View message options"
        title="Options"
        onClose={() => setMessageOptionModal(false)}
      ></Modal>
    </div>
  );
};
