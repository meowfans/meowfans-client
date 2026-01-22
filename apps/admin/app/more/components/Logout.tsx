import { configService } from '@/util/config';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { adminCookieKey, adminRefreshCookieKey, authCookieKey, authRefreshCookieKey, buildSafeUrl } from '@workspace/ui/lib';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

const Logout = () => {
  const router = useRouter();
  const handleLogout = () => {
    deleteCookie(adminCookieKey, { domain: configService.NEXT_PUBLIC_APP_DOMAINS });
    deleteCookie(adminRefreshCookieKey, { domain: configService.NEXT_PUBLIC_APP_DOMAINS });
    deleteCookie(authCookieKey, { domain: configService.NEXT_PUBLIC_APP_DOMAINS });
    deleteCookie(authRefreshCookieKey, { domain: configService.NEXT_PUBLIC_APP_DOMAINS });
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
