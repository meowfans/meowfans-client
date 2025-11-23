'use client';

import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { ChartConfig } from '@workspace/ui/components/chart';
import { ApplyShadCnChart } from '@workspace/ui/globals/ApplyShadCnChart';
import { ShadCnChartTypes } from '@workspace/ui/lib/enums';
import { TriggerModal } from '@workspace/ui/modals/TriggerModal';
import { ChartArea, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { ChartDataTypes } from './CreatorProfile';

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)'
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--chart-2)'
  }
} satisfies ChartConfig;

interface Props {
  data: ChartDataTypes;
}

export const AppliedChart: React.FC<Props> = ({ data }) => {
  const [chartOpen, setChartOpen] = useState<boolean>(false);
  const [chartType, setChartType] = useState<ShadCnChartTypes>(ShadCnChartTypes.RADAR_CHART);
  return (
    <Card className="w-full hidden md:flex">
      <CardHeader className="items-center">
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>{data.description}</CardDescription>
        <CardAction>
          <TriggerModal onChangeModalState={() => setChartOpen(true)} modalIcon={{ icon: ChartArea }} />
        </CardAction>
      </CardHeader>
      <CardContent className="pb-0">
        <ApplyShadCnChart dataTable={data.chartData} xDataKey={data.XDataKey} yDataKey={data.YDataKey} chartType={chartType} />
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by {data.type}% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground flex items-center gap-2 leading-none">January - June 2024</div>
      </CardFooter>
    </Card>
  );
};
