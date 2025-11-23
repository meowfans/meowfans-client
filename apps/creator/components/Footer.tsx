'use client';

import { Button } from '@workspace/ui/components/button';

interface Props {
  message?: string;
  onClick?: () => unknown;
}

export const Footer: React.FC<Props> = ({ message, onClick }) => {
  return (
    <div className="shadow-md p-4 flex justify-center gap-3 rounded-2xl">
      <Button className="px-6 py-3 rounded-xl font-semibold cursor-pointer" onClick={onClick}>
        Load more
      </Button>
      {message && <p className="text-center text-sm text-gray-500 mt-2 mb-4">{message}</p>}
    </div>
  );
};
