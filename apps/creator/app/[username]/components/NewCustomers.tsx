import { ProfileCharts } from '@/lib/constants';
import { ExtendedBadge } from '@workspace/ui/globals/ExtendedBadge';
import { ExtendedCard } from '@workspace/ui/globals/ExtendedCard';
import { TrendingDown } from 'lucide-react';

interface Props {
  setChart: React.Dispatch<React.SetStateAction<ProfileCharts>>;
}

export const NewCustomers: React.FC<Props> = ({ setChart }) => {
  return (
    <ExtendedCard
      title="New Customers"
      className="w-full flex cursor-pointer min-w-55 md:min-w-0 transition-colors hover:bg-muted/30 focus-within:ring-2 focus-within:ring-ring"
      role="button"
      descriptionClassName="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl"
      tabIndex={0}
      description="1,234"
      onClick={() => setChart(ProfileCharts.NEW_CUSTOMERS)}
      footer={
        <div className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Down 20% this period <TrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">Acquisition needs attention</div>
        </div>
      }
      action={<ExtendedBadge variant={'outline'} Icon={TrendingDown} label="-20%" />}
    />
  );
};
