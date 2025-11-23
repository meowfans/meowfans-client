import { Badge } from '@workspace/ui/components/badge';
import { CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { ProfileCharts } from '@/lib/constants';
import { Card } from '@radix-ui/themes';
import { TrendingUp } from 'lucide-react';

interface Props {
  setChart: React.Dispatch<React.SetStateAction<ProfileCharts>>;
}

export const Performances: React.FC<Props> = ({ setChart }) => {
  return (
    <Card className="w-full flex" onClick={() => setChart(ProfileCharts.PERFORMANCES)}>
      <CardHeader>
        <CardDescription>Growth Rate</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">4.5%</CardTitle>
        <CardAction>
          <Badge variant="outline">
            <TrendingUp />
            +4.5%
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          Steady performance increase <TrendingUp className="size-4" />
        </div>
        <div className="text-muted-foreground">Meets growth projections</div>
      </CardFooter>
    </Card>
  );
};
