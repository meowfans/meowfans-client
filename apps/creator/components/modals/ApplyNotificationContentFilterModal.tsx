import { Modal } from '@workspace/ui/modals/Modal';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ApplyNotificationContentFilterModal: React.FC<Props> = ({ open, setOpen }) => {
  const filters = ['All', 'Purchases', 'Earnings', 'Followers'];

  return (
    <Modal isOpen={open} onClose={() => setOpen(false)} title={'Apply Filter'} description={'Find comments based on your personalization'}>
      <div className="flex flex-col space-y-3">
        {filters.map((filter, idx) => (
          <div key={idx} className="border rounded-2xl text-center shadow">
            <p className="bg-linear-to-r from-pink-500 to-violet-500 bg-clip-text">{filter}</p>
          </div>
        ))}
      </div>
    </Modal>
  );
};
