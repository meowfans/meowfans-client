'use client';
import { Icons } from '@/lib/icons/Icons';
import { Button } from '@workspace/ui/components/button';
import { ReturnToPreviousPage } from '@workspace/ui/globals/ReturnToPreviousPage';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  return (
    <>
      <div className="fixed z-50 top-0 left-0  right-0 flex flex-row bg-white dark:bg-black items-center justify-between border-b bg-gradient-to-bl px-2  h-16">
        <div className="flex flex-row items-center gap-2">
          <ReturnToPreviousPage />
          <div className="cursor-pointer">{Icons.appIcon()}</div>
          <p className="font-semibold text-xl animate-pulse">{'MeowFans'}</p>
        </div>
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="w-full max-w-sm flex flex-col items-center justify-center gap-4 break-normal px-4">
          <Button className="max-w-48 w-full" onClick={() => router.back()}>
            Return to home
          </Button>
        </div>
      </div>
    </>
  );
}
