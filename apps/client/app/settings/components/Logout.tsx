import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { useUtilsStore } from '@/hooks/store/utils.store';

const Logout = () => {
  const { setOpenLogoutModal } = useUtilsStore();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign out</CardTitle>
      </CardHeader>
      <CardContent className="">
        <Button variant={'destructive'} onClick={() => setOpenLogoutModal(true)}>
          Logout
        </Button>
      </CardContent>
    </Card>
  );
};

export default Logout;
