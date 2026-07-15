import { mutationOptions } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/query-client';
import { createEmployee, updateEmployee, deleteEmployee } from './service';
import { employeeKeys } from './queries';
import type { EmployeeMutationPayload } from './types';

export const createEmployeeMutation = mutationOptions({
  mutationFn: (data: EmployeeMutationPayload) => createEmployee(data),
  onSuccess: () => {
    getQueryClient().invalidateQueries({ queryKey: employeeKeys.all });
  }
});

export const updateEmployeeMutation = mutationOptions({
  mutationFn: ({ id, values }: { id: number; values: EmployeeMutationPayload }) =>
    updateEmployee(id, values),
  onSuccess: () => {
    getQueryClient().invalidateQueries({ queryKey: employeeKeys.all });
  }
});

export const deleteEmployeeMutation = mutationOptions({
  mutationFn: (id: number) => deleteEmployee(id),
  onSuccess: () => {
    getQueryClient().invalidateQueries({ queryKey: employeeKeys.all });
  }
});
