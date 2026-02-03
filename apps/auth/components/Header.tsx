import { ReturnToPreviousPage } from '@workspace/ui/globals/ReturnToPreviousPage';
import { AuthPaths } from '@workspace/ui/lib/enums';
import { usePathname } from 'next/navigation';

export const Header = () => {
  const pathname = usePathname();
  switch (pathname) {
    case AuthPaths.LOGIN:
      return (
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <ReturnToPreviousPage className="md:hidden" />
          </div>
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground text-balance">Login to your Meow account</p>
          </div>
        </div>
      );

    case AuthPaths.SIGNUP:
      return (
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <ReturnToPreviousPage className="md:hidden" />
          </div>
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">Hi new user!</h1>
            <p className="text-muted-foreground text-balance">Start creating your meow account</p>
          </div>
        </div>
      );

    case AuthPaths.FORGOT_PASSWORD:
      return (
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <ReturnToPreviousPage className="md:hidden" />
          </div>
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">Forgot your password!</h1>
            <p className="text-muted-foreground text-balance text-xs">
              Please enter the email you&apos;d like your password reset information sent to
            </p>
          </div>
        </div>
      );

    case AuthPaths.CREATOR_SIGNUP:
      return (
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <ReturnToPreviousPage className="md:hidden" />
          </div>
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">Start your journey being a creator!</h1>
            <p className="text-muted-foreground text-balance">Join the meow community</p>
          </div>
        </div>
      );
  }
};
