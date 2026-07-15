'use client';

import { LabelList, Pie, PieChart } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';

const chartData = [
  { status: 'planning', projects: 5, fill: 'var(--color-planning)' },
  { status: 'inProgress', projects: 8, fill: 'var(--color-inProgress)' },
  { status: 'onHold', projects: 3, fill: 'var(--color-onHold)' },
  { status: 'completed', projects: 8, fill: 'var(--color-completed)' }
];

const chartConfig = {
  projects: {
    label: 'Projects'
  },
  planning: {
    label: 'Planning',
    color: 'var(--chart-1)'
  },
  inProgress: {
    label: 'In Progress',
    color: 'var(--chart-2)'
  },
  onHold: {
    label: 'On Hold',
    color: 'var(--chart-3)'
  },
  completed: {
    label: 'Completed',
    color: 'var(--chart-4)'
  }
} satisfies ChartConfig;

export function PieGraph() {
  return (
    <Card className='flex h-full flex-col'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>
          Project Status
          <Badge variant='outline'>
            <Icons.trendingUp />
            +5.2%
          </Badge>
        </CardTitle>
        <CardDescription>Current portfolio distribution</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-1 items-center justify-center pb-0'>
        <ChartContainer
          config={chartConfig}
          className='[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[300px] min-h-[250px]'
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey='status' hideLabel />} />
            <Pie
              data={chartData}
              innerRadius={30}
              dataKey='projects'
              radius={10}
              cornerRadius={8}
              paddingAngle={4}
            >
              <LabelList
                dataKey='projects'
                stroke='none'
                fontSize={12}
                fontWeight={500}
                fill='currentColor'
                formatter={(value: number) => value.toString()}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
