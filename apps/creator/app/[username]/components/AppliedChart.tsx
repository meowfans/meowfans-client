'use client';

import { ApplyShadCnChart } from '@workspace/ui/globals/ApplyShadCnChart';
import { Dropdown } from '@workspace/ui/globals/Dropdown';
import { GenericCard } from '@workspace/ui/globals/GenericCard';
import { ShadCnChartTypes } from '@workspace/ui/lib/enums';
import { ChartArea, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { ChartDataTypes } from './CreatorProfile';

interface Props {
  data: ChartDataTypes;
}

export const AppliedChart: React.FC<Props> = ({ data }) => {
  const [chartType, setChartType] = useState<ShadCnChartTypes>(ShadCnChartTypes.RADAR_CHART);

  return (
    <GenericCard
      title={data.title}
      description={data.description}
      icon={ChartArea}
      iconClassName="bg-primary/10 text-primary"
      headerExtra={
        <Dropdown
          enumValue={ShadCnChartTypes}
          onFilterBy={(val) => setChartType(val)}
          trigger={{ label: chartType.replace(/_/, ' ') }}
          label="Select your preferred chart"
          title="Apply chart diagram"
          filterBy={chartType}
        />
      }
      footer={
        <div className="flex flex-col gap-2 text-sm w-full">
          <div className="flex items-center gap-2 leading-none font-medium">
            Trending by {data.type}% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground flex items-center gap-2 leading-none">January - June 2024</div>
        </div>
      }
      footerClassName="pt-0"
      contentClassName="pb-2"
    >
      <ApplyShadCnChart
        dataTable={data.chartData}
        xDataKey={data.XDataKey}
        yDataKey={data.YDataKey}
        chartType={chartType}
        XDataLabel={data.XDataKey}
        yDataLabel={data.YDataKey}
      />
    </GenericCard>
  );
};
