import { queryOptions } from '@tanstack/react-query';
import { getEmployees } from './service';
import type { Employee, EmployeeFilters } from './types';

export type { Employee };

export const employeeKeys = {
  all: ['employees'] as const,
  list: (filters: EmployeeFilters) => [...employeeKeys.all, 'list', filters] as const,
  detail: (id: number) => [...employeeKeys.all, 'detail', id] as const
};

export const employeesQueryOptions = (filters: EmployeeFilters) =>
  queryOptions({
    queryKey: employeeKeys.list(filters),
    queryFn: () => getEmployees(filters)
  });
