'use client';

import { PaymentsEntity } from '@workspace/gql/generated/graphql';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function buildChartData(payments: PaymentsEntity[]) {
  const totalsMap = new Map<number, { total: number; year: number }>();
  for (const payment of payments) {
    const date = new Date(payment.month);
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const existing = totalsMap.get(monthIndex);
    totalsMap.set(monthIndex, {
      total: (existing?.total ?? 0) + payment.total,
      year: existing?.year ?? year
    });
  }
  const currentYear = new Date().getFullYear();
  return MONTHS.map((name, index) => ({
    name,
    total: totalsMap.get(index)?.total ?? 0,
    year: totalsMap.get(index)?.year ?? currentYear
  }));
}

interface AnalyticsOverviewProps {
  payments: PaymentsEntity[];
}

export const AnalyticsOverview: React.FC<AnalyticsOverviewProps> = ({ payments }) => {
  const data = buildChartData(payments);
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>Monthly revenue estimate for the current year.</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <Tooltip
              cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4, radius: 4 }}
              labelFormatter={(label, payload) =>
                `${label} ${payload?.[0]?.payload?.year ?? ''}`
              }
              formatter={(value: number) => [
                `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                'Revenue'
              ]}
              contentStyle={{
                background: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: 8,
                padding: '10px 14px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)'
              }}
              labelStyle={{ color: 'hsl(var(--muted-foreground))', fontSize: 12, marginBottom: 4 }}
              itemStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600, fontSize: 15 }}
            />
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
            <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
