'use client';

import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { CreatorSignupInput } from '@workspace/ui/lib/types';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { Header } from './Header';

interface Props {
  handleCreatorSignUp: (e: FormEvent<HTMLFormElement>, input: CreatorSignupInput) => unknown;
  loading: boolean;
}

const emptyInput: CreatorSignupInput = {
  email: '',
  fullName: '',
  password: '',
  username: ''
};

const CreatorSignup: React.FC<Props> = ({ handleCreatorSignUp }) => {
  const [isDisabled] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('account');
  const [input, setInput] = useState<CreatorSignupInput>(emptyInput);
  const [initialInput, setInitialInput] = useState<CreatorSignupInput>(emptyInput);
  const [errors, setErrors] = useState<Partial<Record<keyof CreatorSignupInput, string>>>({});

  const handleChangeInput = ({ key, value }: { key: keyof CreatorSignupInput; value: string }) => {
    setInitialInput((prev) => ({ ...prev, [key]: value }));
    setInput((prev) => ({ ...prev, [key]: value.trim() }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  return (
    <form
      className="p-6 md:p-8 flex flex-col"
      onKeyDown={(e) => {
        if (e.key === 'Enter') e.preventDefault();
      }}
      onSubmit={(e) => handleCreatorSignUp(e, input)}
    >
      <div className="flex flex-col gap-6">
        <Header />
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v)}>
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-1">
            <div className="grid gap-3">
              <Label htmlFor="fullName">Full name</Label>
              <Input
                id="fullName"
                type="text"
                required
                placeholder="Meow User"
                value={initialInput.fullName}
                onChange={(e) => handleChangeInput({ key: 'fullName', value: e.target.value })}
                className={errors.fullName ? 'border-red-500 focus-visible:ring-red-500' : ''}
              />
              {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="meow@gmail.com"
                value={initialInput.email}
                onChange={(e) => handleChangeInput({ key: 'email', value: e.target.value })}
                className={errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <Button type="button" className="w-full mt-7" onClick={() => setActiveTab('password')}>
              Next
            </Button>
          </TabsContent>

          <TabsContent value="password" className="space-y-1">
            <div className="grid gap-3">
              <Label htmlFor="creator-username">Username</Label>
              <Input
                id="creator-username"
                type="text"
                placeholder="@username"
                autoComplete="username"
                value={initialInput.username}
                required
                onChange={(e) => handleChangeInput({ key: 'username', value: e.target.value })}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="password"
                required
                autoComplete="current-password"
                value={initialInput.password}
                onChange={(e) => handleChangeInput({ key: 'password', value: e.target.value })}
                className={errors.password ? 'border-red-500 focus-visible:ring-red-500' : ''}
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>

            <Button type="submit" className="w-full z-50" disabled={isDisabled}>
              Signup
            </Button>
          </TabsContent>
        </Tabs>

        {/* TODO: IMPLEMENT OAUTH LOGIN AFTER EMAIL CONFIGURATION */}
        {/* <OtherLogin /> */}

        <div className="text-center text-sm flex flex-col">
          Already have an account?{' '}
          <Link href="/login" className="underline underline-offset-4">
            Login
          </Link>
        </div>
      </div>
    </form>
  );
};

export default CreatorSignup;
