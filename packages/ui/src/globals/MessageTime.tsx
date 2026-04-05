import { formatDistanceToNow } from 'date-fns';
import { getTime } from '../lib/helpers';
import { cn } from '../lib/utils';

interface MessageTimeProps {
  createdAt: string | number | Date;
  updatedAt?: string | number | Date | null;
  className?: string;
}

export const MessageTime: React.FC<MessageTimeProps> = ({ createdAt, updatedAt, className }) => {
  const isUpdated = updatedAt && getTime(updatedAt) > getTime(createdAt);

  return (
    <div className={cn('flex flex-col items-end', className)}>
      <p className="text-[9px] font-bold text-muted-foreground/30 uppercase tracking-tighter">
        {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
      </p>
      {isUpdated && <p className="text-[7px] font-black text-primary/40 uppercase tracking-widest -mt-0.5">Edited</p>}
    </div>
  );
};
