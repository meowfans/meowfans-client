import { LoaderIcon } from 'lucide-react';

export default function Loading() {
  return (
    <div className="w-full md:h-[calc(100vh-68px)] h-[calc(100vh-136px)] flex items-center justify-center align-middle my-auto">
      <div className="w-full max-w-sm flex items-center justify-center gap-4 break-normal px-4">
        <LoaderIcon className="animate-spin" />
      </div>
    </div>
  );
}
