export type { Project, ProjectPriority, ProjectStatus } from '@/constants/mock-api-projects';

export type ProjectFilters = {
  page?: number;
  limit?: number;
  statuses?: string;
  search?: string;
  sort?: string;
  source?: 'server' | 'client';
};

export type ProjectsResponse = {
  success: boolean;
  time: string;
  message: string;
  total_projects: number;
  offset: number;
  limit: number;
  projects: import('@/constants/mock-api-projects').Project[];
};

export type ProjectByIdResponse =
  | {
      success: true;
      time: string;
      message: string;
      project: import('@/constants/mock-api-projects').Project;
    }
  | {
      success: false;
      message: string;
    };

export type ProjectMutationPayload = {
  name: string;
  description: string;
  status: import('@/constants/mock-api-projects').ProjectStatus;
  priority: import('@/constants/mock-api-projects').ProjectPriority;
  lead: string;
  due_date: string;
};
