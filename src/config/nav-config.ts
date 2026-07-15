import type { NavGroup } from '@/types';

export const navGroups: NavGroup[] = [
  {
    label: 'Overview',
    items: [
      {
        title: 'Dashboard',
        url: '/dashboard/overview',
        icon: 'dashboard',
        isActive: false,
        shortcut: ['d', 'd'],
        items: []
      },
      {
        title: 'Projects',
        url: '/dashboard/projects',
        icon: 'project',
        shortcut: ['p', 'p'],
        isActive: false,
        items: []
      },
      {
        title: 'Employees',
        url: '/dashboard/employees',
        icon: 'employee',
        shortcut: ['u', 'u'],
        isActive: false,
        items: []
      }
    ]
  },
  {
    label: 'Account',
    items: [
      {
        title: 'Profile',
        url: '/dashboard/profile',
        icon: 'profile',
        shortcut: ['m', 'm'],
        isActive: false,
        items: []
      }
    ]
  }
];
