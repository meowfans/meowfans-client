import { Badge } from '@workspace/ui/components/badge';
import { SAvatar } from '@workspace/ui/globals/SAvatar';
import { ChevronDown } from 'lucide-react';
import moment from 'moment';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Channel } from './Channels';

enum ChannelBadgeVariant {
  General = 'default',
  Design = 'outline',
  Support = 'secondary',
  Random = 'destructive'
}

type ChannelType = 'General' | 'Design' | 'Support' | 'Random';
interface Props {
  channels: Channel[];
}

export const ChannelList: React.FC<Props> = ({ channels }) => {
  const { id } = useParams();
  return (
    <div className="flex flex-col shadow-accent-foreground space-y-1">
      {channels.map((c, idx) => {
        const channelVariant = ChannelBadgeVariant[c.name as ChannelType];
        const formattedCurrency = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(c.members);
        return (
          <div key={idx} className="flex flex-row justify-between border min-h-10 p-1 m-1 rounded-2xl">
            <Link href={`/channels/${id}`}>
              <div className="flex flex-row space-x-2 items-center">
                <SAvatar url="" />
                <div className="flex flex-col space-x-3">
                  <div className="flex flex-row space-x-1">
                    <p className="font-bold">{c.lastMessage?.sender}</p>
                    <Badge variant={channelVariant}>{c.name}</Badge>
                  </div>
                  <p className="text-xs font-semibold">{c.lastMessage?.text}</p>
                </div>
              </div>
              <div className="flex flex-row items-center space-x-3">
                <p>{formattedCurrency}</p>
                <p className="text-xs">{moment(c.lastMessage?.timestamp).format('hh:mm')}</p>
                <ChevronDown />
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
