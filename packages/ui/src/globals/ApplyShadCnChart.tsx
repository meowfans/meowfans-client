'use client';

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

  switch (chartType) {
    case ShadCnChartTypes.RADAR_CHART:
      return (
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-62.5">
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
        <ChartContainer config={chartConfig}>
          <AreaChart data={dataTable} margin={{ left: 12, right: 12 }}>
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
        <ChartContainer config={chartConfig}>
          <BarChart data={dataTable} margin={{ top: 20 }}>
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
        <ChartContainer config={chartConfig}>
          <LineChart data={dataTable} margin={{ top: 20, left: 12, right: 12 }}>
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
