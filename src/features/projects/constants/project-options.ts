import { PROJECT_PRIORITIES, PROJECT_STATUSES } from '@/constants/mock-api-projects';

export const STATUS_OPTIONS = PROJECT_STATUSES.map((status) => ({
  value: status,
  label: status
}));

export const PRIORITY_OPTIONS = PROJECT_PRIORITIES.map((priority) => ({
  value: priority,
  label: priority
}));
