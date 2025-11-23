'use client';

import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { isValidEmail, isValidPassword } from '@workspace/ui/lib/validators';
import { Loader2Icon } from 'lucide-react';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { Header } from './Header';
import { SignupInput } from '@workspace/ui/lib/enums';

interface Props {
  handleSignup: (e: FormEvent<HTMLFormElement>, input: SignupInput) => unknown;
  loading: boolean;
}

const emptyInput: SignupInput = {
  email: '',
  fullName: '',
  password: ''
};

const SignupForm: React.FC<Props> = ({ handleSignup, loading }) => {
  const [input, setInput] = useState<SignupInput>(emptyInput);
  const [activeTab, setActiveTab] = useState<string>('account');
  const [initialInput, setInitialInput] = useState<SignupInput>(emptyInput);
  const [errors, setErrors] = useState<Partial<Record<keyof SignupInput, string>>>({});

  const handleChangeInput = ({ key, value }: { key: keyof SignupInput; value: string }) => {
    setInitialInput((prev) => ({ ...prev, [key]: value }));
    setInput((prev) => ({ ...prev, [key]: value.trim() }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof SignupInput, string>> = {};
    if (!input.fullName) newErrors.fullName = 'Full name is required';
    if (!isValidEmail(input.email)) newErrors.email = 'Invalid email format';
    if (!isValidPassword(input.password)) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <form
      className="p-6 md:p-8 flex flex-col"
      onKeyDown={(e) => {
        if (e.key === 'Enter') e.preventDefault();
      }}
      onSubmit={(e) => {
        e.preventDefault();
        if (validate()) handleSignup(e, input);
      }}
    >
      <Header />

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v)}>
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-4">
          <div className="grid gap-3">
            <Label htmlFor="fullName">Full name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Meow User"
              value={initialInput.fullName}
              required
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
              placeholder="meow@gmail.com"
              value={initialInput.email}
              required
              onChange={(e) => handleChangeInput({ key: 'email', value: e.target.value })}
              className={errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          <Button type="button" className="w-full" onClick={() => setActiveTab('password')}>
            Next
          </Button>
        </TabsContent>

        <TabsContent value="password" className="space-y-3">
          <div className="grid gap-3">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="password"
              required
              value={initialInput.password}
              onChange={(e) => handleChangeInput({ key: 'password', value: e.target.value })}
              className={errors.password ? 'border-red-500 focus-visible:ring-red-500' : ''}
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2Icon className="animate-spin mr-2" />}
            Signup
          </Button>
        </TabsContent>
      </Tabs>

      <div className="text-center text-sm">
        Already have an account?{' '}
        <Link href="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </form>
  );
};

export default SignupForm;
