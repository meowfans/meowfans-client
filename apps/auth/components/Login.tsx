'use client';

import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { isValidEmail, isValidPassword } from '@workspace/ui/lib/validators';
import { Loader2Icon } from 'lucide-react';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { Header } from './Header';
import { LoginInput } from '@workspace/ui/lib/enums';

interface Props {
  handleLogin: (e: FormEvent<HTMLFormElement>, input: LoginInput) => unknown;
  loading: boolean;
}

const emptyInput = {
  email: '',
  password: ''
};

const LoginForm: React.FC<Props> = ({ handleLogin, loading }) => {
  const [input, setInput] = useState<LoginInput>(emptyInput);
  const [initialInput, setInitialInput] = useState<LoginInput>(emptyInput);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleChangeInput = ({ key, value }: { key: keyof LoginInput; value: string }) => {
    setInitialInput((prev) => ({ ...prev, [key]: value }));
    setInput((prev) => ({ ...prev, [key]: value.trim() }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    if (!isValidEmail(input.email)) newErrors.email = 'Invalid email format';
    if (!isValidPassword(input.password)) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <form
      className="p-6 md:p-8 flex flex-col gap-6"
      onKeyDown={(e) => {
        if (e.key === 'Enter') e.preventDefault();
      }}
      onSubmit={(e) => {
        e.preventDefault();
        if (validate()) handleLogin(e, input);
      }}
    >
      <Header />

      <div className="grid gap-3">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="m@example.com"
          value={initialInput.email}
          onChange={(e) => handleChangeInput({ key: 'email', value: e.target.value })}
          className={errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>

      <div className="grid gap-3">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="******"
          autoComplete="current-password"
          value={initialInput.password}
          onChange={(e) => handleChangeInput({ key: 'password', value: e.target.value })}
          className={errors.password ? 'border-red-500 focus-visible:ring-red-500' : ''}
        />
        {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
      </div>

      <Button disabled={loading} type="submit" className="w-full z-50">
        {loading && <Loader2Icon className="animate-spin mr-2" />}
        Login
      </Button>

      <div className="text-center text-sm">
        Don’t have an account?{' '}
        <Link href="/signup" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
