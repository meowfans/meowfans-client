import { ProfileCharts } from '@/lib/constants';
import { ExtendedBadge } from '@workspace/ui/globals/ExtendedBadge';
import { ExtendedCard } from '@workspace/ui/globals/ExtendedCard';
import { TrendingUp } from 'lucide-react';

interface Props {
  setChart: React.Dispatch<React.SetStateAction<ProfileCharts>>;
}

export const TotalRevenue: React.FC<Props> = ({ setChart }) => {
  return (
    <ExtendedCard
      description="1,250.00"
      title="Total Revenue"
      className="w-full flex cursor-pointer min-w-55 md:min-w-0 transition-colors hover:bg-muted/30 focus-within:ring-2 focus-within:ring-ring"
      role="button"
      descriptionClassName="text-2xl font-semibold"
      action={<ExtendedBadge variant={'outline'} Icon={TrendingUp} label="+12.5%" />}
      footer={
        <div className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <TrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Visitors for the last 6 months</div>
        </div>
      }
      tabIndex={0}
      onClick={() => setChart(ProfileCharts.TotalRevenue)}
    />
  );
};
