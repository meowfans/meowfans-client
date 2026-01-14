import { ProfileCharts } from '@/lib/constants';
import { ExtendedBadge } from '@workspace/ui/globals/ExtendedBadge';
import { ExtendedCard } from '@workspace/ui/globals/ExtendedCard';
import { TrendingUp } from 'lucide-react';

interface Props {
  setChart: React.Dispatch<React.SetStateAction<ProfileCharts>>;
}

export const ViewRate: React.FC<Props> = ({ setChart }) => {
  return (
    <ExtendedCard
      title="View Rate"
      className="w-full flex cursor-pointer min-w-55 md:min-w-0 transition-colors hover:bg-muted/30 focus-within:ring-2 focus-within:ring-ring"
      role="button"
      descriptionClassName="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl"
      description="4.5%"
      tabIndex={0}
      action={<ExtendedBadge variant={'outline'} Icon={TrendingUp} label="+4.5%" />}
      footer={
        <div className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Steady growth increase <TrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Meets growth projections</div>
        </div>
      }
      onClick={() => setChart(ProfileCharts.ViewRate)}
    />
  );
};
