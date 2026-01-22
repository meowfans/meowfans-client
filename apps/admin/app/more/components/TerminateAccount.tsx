import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { TriggerModal } from '@workspace/ui/modals/TriggerModal';
import { Trash } from 'lucide-react';

interface Props {
  setTerminateAccountModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const TerminateAccount: React.FC<Props> = ({ setTerminateAccountModal }) => {
  return (
    <Card className="flex">
      <CardHeader>
        <CardTitle className="text-red-500">Delete your account</CardTitle>
        <CardDescription>Be aware of this as this is irreversible!</CardDescription>
      </CardHeader>
      <CardContent className="">
        <TriggerModal
          onChangeModalState={() => setTerminateAccountModal(true)}
          className="bg-red-600"
          modalIcon={{ icon: Trash }}
          modalText="Terminate your account"
        />
      </CardContent>
    </Card>
  );
};

export default TerminateAccount;
