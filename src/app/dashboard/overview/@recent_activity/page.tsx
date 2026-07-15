import { delay } from '@/constants/mock-api';
import { RecentActivity } from '@/features/overview/components/recent-activity';

export default async function RecentActivityPage() {
  await delay(250);
  return <RecentActivity />;
}
