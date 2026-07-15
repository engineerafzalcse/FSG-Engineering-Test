import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const recentUpdates = [
  {
    project: 'Wind Farm Asset Portal',
    update: 'Status changed to In Progress',
    time: '12 minutes ago'
  },
  {
    project: 'Safety Compliance Workspace',
    update: 'Priority changed to Critical',
    time: '48 minutes ago'
  },
  {
    project: 'Field Operations Mobile App',
    update: 'Project lead updated',
    time: '2 hours ago'
  },
  {
    project: 'Energy Forecasting Dashboard',
    update: 'Due date moved to October 18',
    time: 'Yesterday'
  },
  {
    project: 'Employee Training Portal',
    update: 'Project marked Completed',
    time: 'Yesterday'
  }
];

export function RecentActivity() {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Recent Updates</CardTitle>
        <CardDescription>Latest changes across active projects.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-6'>
          {recentUpdates.map((item) => (
            <div key={`${item.project}-${item.time}`} className='space-y-1'>
              <div className='flex items-start justify-between gap-4'>
                <p className='text-sm font-medium'>{item.project}</p>
                <span className='text-muted-foreground shrink-0 text-xs'>{item.time}</span>
              </div>
              <p className='text-muted-foreground text-sm'>{item.update}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
