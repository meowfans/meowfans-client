import { Badge } from '@workspace/ui/components/badge';
import { CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { ProfileCharts } from '@/lib/constants';
import { Card } from '@radix-ui/themes';
import { TrendingDown } from 'lucide-react';

interface Props {
  setChart: React.Dispatch<React.SetStateAction<ProfileCharts>>;
}

export const NewCustomers: React.FC<Props> = ({ setChart }) => {
  return (
    <Card className="w-full flex cursor-pointer" onClick={() => setChart(ProfileCharts.NEW_CUSTOMERS)}>
      <CardHeader>
        <CardDescription>New Customers</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">1,234</CardTitle>
        <CardAction>
          <Badge variant="outline">
            <TrendingDown />
            -20%
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          Down 20% this period <TrendingDown className="size-4" />
        </div>
        <div className="text-muted-foreground">Acquisition needs attention</div>
      </CardFooter>
    </Card>
  );
};
