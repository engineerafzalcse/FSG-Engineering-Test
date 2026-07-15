export type { Employee } from '@/constants/mock-api-employees';

export type EmployeeFilters = {
  page?: number;
  limit?: number;
  roles?: string;
  search?: string;
  sort?: string;
};

export type EmployeesResponse = {
  success: boolean;
  time: string;
  message: string;
  total_employees: number;
  offset: number;
  limit: number;
  employees: import('@/constants/mock-api-employees').Employee[];
};

export type EmployeeMutationPayload = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
};
