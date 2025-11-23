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
  XAxis
} from 'recharts';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '../components/chart';
import { ShadCnChartTypes } from '../lib';

interface Props {
  chartType?: ShadCnChartTypes;
  yDataKey: string;
  xDataKey: string;
  dataTable: any[];
}

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

export const ApplyShadCnChart: React.FC<Props> = ({ chartType, dataTable, xDataKey, yDataKey }) => {
  switch (chartType) {
    case ShadCnChartTypes.RADAR_CHART:
      return (
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <RadarChart data={dataTable}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey={xDataKey} />
            <PolarGrid />
            <Radar
              dataKey={yDataKey}
              fill="var(--color-desktop)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1
              }}
            />
          </RadarChart>
        </ChartContainer>
      );

    case ShadCnChartTypes.AREA_CHART:
      return (
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={dataTable}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey={xDataKey} tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value.slice(0, 3)} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Area dataKey={xDataKey} type="natural" fill="var(--color-mobile)" fillOpacity={0.4} stroke="var(--color-mobile)" stackId="a" />
            <Area
              dataKey={yDataKey}
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent payload={''} />} />
          </AreaChart>
        </ChartContainer>
      );

    case ShadCnChartTypes.BAR_CHART:
      return (
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={dataTable}
            margin={{
              top: 20
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey={xDataKey} tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey={yDataKey} fill="var(--color-desktop)" radius={8}>
              <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
            </Bar>
          </BarChart>
        </ChartContainer>
      );

    case ShadCnChartTypes.LINE_CHART:
      return (
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={dataTable}
            margin={{
              top: 20,
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey={xDataKey} tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value.slice(0, 3)} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Line
              dataKey={yDataKey}
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={{
                fill: 'var(--color-desktop)'
              }}
              activeDot={{
                r: 6
              }}
            >
              <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
            </Line>
          </LineChart>
        </ChartContainer>
      );

    default:
      return (
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <RadarChart data={dataTable}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey={xDataKey} />
            <PolarGrid />
            <Radar
              dataKey={yDataKey}
              fill="var(--color-desktop)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1
              }}
            />
          </RadarChart>
        </ChartContainer>
      );
  }
};
