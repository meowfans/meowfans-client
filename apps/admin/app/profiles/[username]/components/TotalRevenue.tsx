import { Badge } from '@workspace/ui/components/badge';
import { CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { ProfileCharts } from '@/lib/constants';
import { Card } from '@radix-ui/themes';
import { TrendingUp } from 'lucide-react';

interface Props {
  setChart: React.Dispatch<React.SetStateAction<ProfileCharts>>;
}

export const TotalRevenue: React.FC<Props> = ({ setChart }) => {
  return (
    <Card className="w-full flex cursor-pointer" onClick={() => setChart(ProfileCharts.TOTAL_REVENUE)}>
      <CardHeader>
        <CardDescription>Total Revenue</CardDescription>
        <CardTitle className="text-2xl font-semibold">$1,250.00</CardTitle>
        <CardAction>
          <Badge variant="outline">
            <TrendingUp />
            +12.5%
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          Trending up this month <TrendingUp className="size-4" />
        </div>
        <div className="text-muted-foreground">Visitors for the last 6 months</div>
      </CardFooter>
    </Card>
  );
};
