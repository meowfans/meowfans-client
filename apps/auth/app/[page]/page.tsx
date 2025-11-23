'use client';

import useAPI from '@/hooks/useAPI';
import { Icons } from '@/lib/icons/Icons';
import { configService } from '@/util/config';
import { buildSafeUrl } from '@/util/helpers';
import { Card, CardContent } from '@workspace/ui/components/card';
import { RetroGrid } from '@workspace/ui/components/shadcn-io/retro-grid';
import { AppSizes, AuthPaths, LoginInput, SignupInput, UserRoles } from '@workspace/ui/lib/enums';
import { CreatorSignupInput } from '@workspace/ui/lib/types';
import dynamic from 'next/dynamic';
import { usePathname, useRouter } from 'next/navigation';
import { FormEvent, Suspense, useState } from 'react';
import { toast } from 'sonner';

const Login = dynamic(() => import('@/components/Login'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });
const Signup = dynamic(() => import('@/components/Signup'), { ssr: false });
const ForgotPassword = dynamic(() => import('@/components/ForgotPassword'), { ssr: false });
const CreatorSignup = dynamic(() => import('@/components/CreatorSignup'), { ssr: false });

export default function Auth() {
  const pathname = usePathname();
  const { login, signup, creatorSignup } = useAPI();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>, input: LoginInput) => {
    e.preventDefault();
    setLoading(true);
    if (!navigator.onLine) return toast.error('You are currently offline!');

    try {
      const { roles } = await login(input);

      const role = roles?.at(0) as UserRoles;

      const creatorAppUrl = buildSafeUrl({
        host: configService.NEXT_PUBLIC_CREATOR_URL,
        pathname: '/analytics'
      });

      const fanAppUrl = buildSafeUrl({
        host: configService.NEXT_PUBLIC_FAN_URL,
        pathname: '/trending'
      });

      const adminAppUrl = buildSafeUrl({
        host: configService.NEXT_PUBLIC_ADMIN_URL,
        pathname: '/vaults'
      });

      switch (role) {
        case UserRoles.ADMIN:
          return router.push(adminAppUrl);
        case UserRoles.CREATOR:
          return router.push(creatorAppUrl);
        case UserRoles.FAN:
          return router.push(fanAppUrl);
      }

      toast.success('Logged in');
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: FormEvent<HTMLFormElement>, input: SignupInput) => {
    e.preventDefault();
    setLoading(true);
    if (!navigator.onLine) return toast.error('You are currently offline!');

    try {
      await signup(input);

      const fanAppUrl = buildSafeUrl({
        host: configService.NEXT_PUBLIC_FAN_URL,
        pathname: '/dashboard'
      });

      return router.push(fanAppUrl);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatorSignup = async (e: FormEvent<HTMLFormElement>, input: CreatorSignupInput) => {
    e.preventDefault();
    setLoading(true);
    if (!navigator.onLine) return toast.error('You are currently offline!');
    try {
      await creatorSignup(input);

      const creatorAppUrl = buildSafeUrl({
        host: configService.NEXT_PUBLIC_CREATOR_URL,
        pathname: '/profile'
      });

      toast.success('Logged in');
      return router.push(creatorAppUrl);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Suspense>
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-row items-center justify-center overflow-hidden">
          <RetroGrid angle={45} cellSize={80} opacity={0.1} lightLineColor="#000000" darkLineColor="#ffffff"  />
        </div>
        <div>
          <div className="flex flex-col gap-6 overflow-hidden">
            <Card className="overflow-hidden p-0">
              <CardContent className="grid p-0 md:grid-cols-2">
                {(() => {
                  switch (pathname) {
                    case AuthPaths.SIGNUP:
                      return <Signup loading={loading} handleSignup={handleSignup} />;

                    case AuthPaths.LOGIN:
                      return <Login loading={loading} handleLogin={handleLogin} />;

                    case AuthPaths.FORGOT_PASSWORD:
                      return <ForgotPassword />;

                    case AuthPaths.CREATOR_SIGNUP:
                      return <CreatorSignup handleCreatorSignUp={handleCreatorSignup} loading={loading} />;
                  }
                })()}
                <div className="bg-muted relative hidden content-center md:block">{Icons.appIcon(AppSizes.ICON_384)}</div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    </Suspense>
  );
}
