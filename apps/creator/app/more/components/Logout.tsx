import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { configService } from '@/util/config';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { authCookieKey, buildSafeUrl } from '@workspace/ui/lib';

const Logout = () => {
  const router = useRouter();
  const handleLogout = () => {
    deleteCookie(authCookieKey, { domain: configService.NEXT_PUBLIC_APP_DOMAINS });
    router.push(buildSafeUrl({ host: configService.NEXT_PUBLIC_AUTH_URL }));
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign out</CardTitle>
      </CardHeader>
      <CardContent className="">
        <Button variant={'destructive'} onClick={handleLogout}>
          Logout
        </Button>
      </CardContent>
    </Card>
  );
};

export default Logout;
