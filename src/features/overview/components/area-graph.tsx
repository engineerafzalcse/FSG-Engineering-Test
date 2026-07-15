'use client';

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import React from 'react';

const chartData = [
  { month: 'January', planned: 42, completed: 31 },
  { month: 'February', planned: 55, completed: 43 },
  { month: 'March', planned: 48, completed: 39 },
  { month: 'April', planned: 62, completed: 51 },
  { month: 'May', planned: 58, completed: 49 },
  { month: 'June', planned: 67, completed: 56 },
  { month: 'July', planned: 51, completed: 45 },
  { month: 'August', planned: 72, completed: 61 },
  { month: 'September', planned: 64, completed: 57 },
  { month: 'October', planned: 59, completed: 52 },
  { month: 'November', planned: 70, completed: 63 },
  { month: 'December', planned: 46, completed: 41 }
];

const chartConfig = {
  planned: {
    label: 'Planned Tasks',
    color: 'var(--chart-1)'
  },
  completed: {
    label: 'Completed Tasks',
    color: 'var(--chart-2)'
  }
} satisfies ChartConfig;

export function AreaGraph() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Workload Trend
          <Badge variant='outline'>
            <Icons.trendingUp />
            +5.2%
          </Badge>
        </CardTitle>
        <CardDescription>Planned and completed tasks during 2026</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} strokeDasharray='3 3' />
            <XAxis
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <DottedBackgroundPattern config={chartConfig} />
            </defs>
            <Area
              dataKey='completed'
              type='natural'
              fill='url(#dotted-background-pattern-completed)'
              fillOpacity={0.4}
              stroke='var(--color-completed)'
              stackId='a'
              strokeWidth={0.8}
            />
            <Area
              dataKey='planned'
              type='natural'
              fill='url(#dotted-background-pattern-planned)'
              fillOpacity={0.4}
              stroke='var(--color-planned)'
              stackId='a'
              strokeWidth={0.8}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

const DottedBackgroundPattern = ({ config }: { config: ChartConfig }) => {
  const items = Object.fromEntries(
    Object.entries(config).map(([key, value]) => [key, value.color])
  );
  return (
    <>
      {Object.entries(items).map(([key, value]) => (
        <pattern
          key={key}
          id={`dotted-background-pattern-${key}`}
          x='0'
          y='0'
          width='7'
          height='7'
          patternUnits='userSpaceOnUse'
        >
          <circle cx='5' cy='5' r='1.5' fill={value} opacity={0.5}></circle>
        </pattern>
      ))}
    </>
  );
};
