import * as z from 'zod';
import { PROJECT_PRIORITIES, PROJECT_STATUSES } from '@/constants/mock-api-projects';

export const projectSchema = z.object({
  name: z.string().min(3, 'Project name must be at least 3 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  status: z.enum(PROJECT_STATUSES, { message: 'Please select a status.' }),
  priority: z.enum(PROJECT_PRIORITIES, { message: 'Please select a priority.' }),
  lead: z.string().min(2, 'Project lead must be at least 2 characters.'),
  due_date: z.string().min(1, 'Due date is required.')
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
