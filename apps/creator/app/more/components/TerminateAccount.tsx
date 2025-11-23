import { configService } from '@/util/config';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { authCookieKey, buildSafeUrl } from '@workspace/ui/lib';
import { TriggerModal } from '@workspace/ui/modals/TriggerModal';
import { deleteCookie } from 'cookies-next';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
  setTerminateAccountModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const TerminateAccount: React.FC<Props> = ({ setTerminateAccountModal }) => {
  const router = useRouter();
  const handleLogout = () => {
    deleteCookie(authCookieKey, { domain: configService.NEXT_PUBLIC_APP_DOMAINS });
    router.push(buildSafeUrl({ host: configService.NEXT_PUBLIC_APP_URL }));
  };
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
