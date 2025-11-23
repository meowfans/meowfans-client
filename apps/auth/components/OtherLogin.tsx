'use client';

import { Button } from '@workspace/ui/components/button';
import { Icons } from '@/lib/icons/Icons';

const OtherLogin = () => {
  return (
    <>
      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-card text-muted-foreground relative z-10 px-2">Or continue with</span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Button variant="outline" type="button" className="w-full">
          {Icons.appleIcon()}
          <span className="sr-only">Login with Apple</span>
        </Button>
        <Button variant="outline" type="button" className="w-full">
          {Icons.googleIcon()}
          <span className="sr-only">Login with Google</span>
        </Button>
        <Button variant="outline" type="button" className="w-full">
          {Icons.metaIcon()}
          <span className="sr-only">Login with Meta</span>
        </Button>
      </div>
    </>
  );
};
export default OtherLogin;
