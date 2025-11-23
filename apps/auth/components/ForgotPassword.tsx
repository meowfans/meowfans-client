'use client';

import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { useState } from 'react';
import { Header } from './Header';

const ForgotPassword = () => {
  const [hasSend, setHasSend] = useState<boolean>(false);
  return (
    <form className="p-6 md:p-8">
      <div className="flex flex-col gap-6">
        <Header />
        <div className="grid gap-3">
          <Label htmlFor="email">Enter your email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required autoComplete="email" />
        </div>
        {hasSend && (
          <div className="grid gap-3">
            <Label htmlFor="password-otp">Verify with OTP</Label>
            <Input id="password-otp" type="text" placeholder="xxxxxx" required />
          </div>
        )}
        <Button type="submit" className="w-full z-50" onClick={() => setHasSend(true)}>
          Send
        </Button>
      </div>
    </form>
  );
};
export default ForgotPassword;
