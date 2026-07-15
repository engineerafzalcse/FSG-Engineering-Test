import type { InfobarContent } from '@/components/ui/infobar';

export const employeesInfoContent: InfobarContent = {
  title: 'Employee Management',
  sections: [
    {
      title: 'Overview',
      description:
        'Search employees, filter by role, and manage employee details without leaving the table.',
      links: []
    },
    {
      title: 'Server State',
      description:
        'The page uses server prefetching, React Query hydration, and URL-backed table state for responsive navigation and cache-aware updates.',
      links: []
    }
  ]
};
