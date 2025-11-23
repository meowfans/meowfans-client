import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { BadgeDollarSign } from 'lucide-react';

export const MessageInput = () => {
  return (
    <div className="fixed flex items-center gap-2 bottom-0 left-0 md:left-[var(--sidebar-width)] right-0 md:right-[var(--sidebar-width)] border shadow min-h-10 bg-white dark:bg-black">
      <div className="relative flex items-center rounded-md border focus-within:ring-1 focus-within:ring-ring px-2 w-full">
        <Button variant={'outline'}>
          <BadgeDollarSign className="h-5 w-5 text-muted-foreground" />
        </Button>
        <Input placeholder="Enter your message" className="border-0 focus-visible:ring-0 shadow-none min-h-15" />
      </div>
      <Button type="submit" variant="outline">
        Send
      </Button>
    </div>
  );
};
