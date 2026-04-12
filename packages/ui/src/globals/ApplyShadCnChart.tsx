/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  XAxis,
  YAxis
} from 'recharts';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '../components/chart';
import { ShadCnChartTypes } from '../lib';
import { Dropdown } from './Dropdown';

interface Props {
  chartType?: ShadCnChartTypes;
  xDataKey: string;
  yDataKey: string;
  XDataLabel: string;
  yDataLabel: string;
  dataTable: any[];
}

const cssVar = (key: string) => `var(--color-${key})`;

export const ApplyShadCnChart: React.FC<Props> = ({ chartType, dataTable, xDataKey, yDataKey, XDataLabel, yDataLabel }) => {
  const chartConfig = {
    [xDataKey]: { label: XDataLabel, color: 'var(--chart-1)' },
    [yDataKey]: { label: yDataLabel, color: 'var(--chart-2)' }
  } satisfies ChartConfig;
  const [_chartType, setChartType] = useState<ShadCnChartTypes>(chartType || ShadCnChartTypes.BAR_CHART);

  const renderChart = () => {
    switch (_chartType) {
      case ShadCnChartTypes.RADAR_CHART:
        return (
          <ChartContainer config={chartConfig} className="mx-auto w-full h-full max-h-[350px]">
            <RadarChart data={dataTable}>
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <PolarAngleAxis dataKey={xDataKey} />
              <PolarGrid />
              <Radar dataKey={yDataKey} fill={cssVar(yDataKey)} fillOpacity={0.6} dot={{ r: 4, fillOpacity: 1 }} />
            </RadarChart>
          </ChartContainer>
        );

      case ShadCnChartTypes.AREA_CHART:
        return (
          <ChartContainer config={chartConfig} className="w-full h-full min-h-[200px]">
            <AreaChart data={dataTable} margin={{ left: 12, right: 12, top: 10, bottom: 10 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey={xDataKey} tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(v) => String(v).slice(0, 3)} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />

              <Area dataKey={xDataKey} type="natural" fill={cssVar(xDataKey)} stroke={cssVar(xDataKey)} fillOpacity={0.4} stackId="a" />
              <Area dataKey={yDataKey} type="natural" fill={cssVar(yDataKey)} stroke={cssVar(yDataKey)} fillOpacity={0.4} stackId="a" />

              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        );

      case ShadCnChartTypes.BAR_CHART:
        return (
          <ChartContainer config={chartConfig} className="w-full h-full min-h-[200px]">
            <BarChart data={dataTable} margin={{ top: 20, right: 10, left: 10, bottom: 10 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey={xDataKey} tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(v) => String(v).slice(0, 3)} />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />

              <Bar dataKey={yDataKey} fill={cssVar(yDataKey)} radius={8}>
                <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
              </Bar>
            </BarChart>
          </ChartContainer>
        );

      case ShadCnChartTypes.LINE_CHART:
        return (
          <ChartContainer config={chartConfig} className="w-full h-full min-h-[200px]">
            <LineChart data={dataTable} margin={{ top: 20, left: 12, right: 12, bottom: 10 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey={xDataKey} tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(v) => String(v).slice(0, 3)} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />

              <Line
                dataKey={yDataKey}
                type="natural"
                stroke={cssVar(yDataKey)}
                strokeWidth={2}
                dot={{ fill: cssVar(yDataKey) }}
                activeDot={{ r: 6 }}
              >
                <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
              </Line>
            </LineChart>
          </ChartContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex justify-end pr-4">
        <Dropdown
          enumValue={ShadCnChartTypes}
          filterBy={_chartType}
          onFilterBy={setChartType}
          trigger={{ label: _chartType }}
          label={_chartType}
          title="Chart type"
        />
      </div>
      <div className="flex-1 min-h-0">{renderChart()}</div>
    </div>
  );
};
