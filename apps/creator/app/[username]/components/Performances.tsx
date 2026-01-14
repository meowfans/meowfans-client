import { ProfileCharts } from '@/lib/constants';
import { ExtendedBadge } from '@workspace/ui/globals/ExtendedBadge';
import { ExtendedCard } from '@workspace/ui/globals/ExtendedCard';
import { TrendingUp } from 'lucide-react';

interface Props {
  setChart: React.Dispatch<React.SetStateAction<ProfileCharts>>;
}

export const Interaction: React.FC<Props> = ({ setChart }) => {
  return (
    <ExtendedCard
      className="w-full flex cursor-pointer min-w-55 md:min-w-0 transition-colors hover:bg-muted/30 focus-within:ring-2 focus-within:ring-ring"
      role="button"
      tabIndex={0}
      title="Interaction"
      footer={
        <div className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Steady performance increase <TrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Meets performance projections</div>
        </div>
      }
      descriptionClassName="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl"
      description="10.5%"
      action={<ExtendedBadge variant={'outline'} Icon={TrendingUp} label="+10.5%" />}
      onClick={() => setChart(ProfileCharts.Interaction)}
    />
  );
};
