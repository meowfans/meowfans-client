import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { useRouter } from 'next/navigation';
import DeleteAllAssets from './DeleteAssets';

interface Props {
  setDeleteAllAssetsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const QuickActions: React.FC<Props> = ({ setDeleteAllAssetsModal }) => {
  const router = useRouter();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        <div>
          <Button onClick={() => router.push('/vaults')}>Connect to a service</Button>
        </div>
        <Button variant="outline" className="w-full justify-start">
          Export settings
        </Button>
        <Button variant="destructive" className="w-full justify-start">
          Reset to defaults
        </Button>
        <DeleteAllAssets setDeleteAllAssetsModal={setDeleteAllAssetsModal} />
      </CardContent>
    </Card>
  );
};
