import { LoaderIcon } from 'lucide-react';

export default function Loading() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center align-middle my-auto">
      <div className="w-full max-w-sm flex flex-col items-center justify-center gap-4 break-normal px-4">
        <LoaderIcon className="animate-spin" />
      </div>
    </div>
  );
}
