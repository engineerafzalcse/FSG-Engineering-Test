'use client';

import { useState } from 'react';
import { useAppForm, useFormFields } from '@/components/ui/tanstack-form';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { Icons } from '@/components/icons';
import { useMutation } from '@tanstack/react-query';
import { createEmployeeMutation, updateEmployeeMutation } from '../api/mutations';
import type { Employee } from '../api/types';
import { toast } from 'sonner';
import * as z from 'zod';
import { employeeSchema, type EmployeeFormValues } from '../schemas/employee';
import { ROLE_OPTIONS } from './employees-table/options';

const STATUS_OPTIONS = [
  { value: 'Active', label: 'Active' },
  { value: 'On Leave', label: 'On Leave' },
  { value: 'Inactive', label: 'Inactive' }
];

interface EmployeeFormSheetProps {
  employee?: Employee;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EmployeeFormSheet({ employee, open, onOpenChange }: EmployeeFormSheetProps) {
  const isEdit = !!employee;

  const createMutation = useMutation({
    ...createEmployeeMutation,
    onSuccess: () => {
      toast.success('Employee created successfully');
      onOpenChange(false);
      form.reset();
    },
    onError: () => toast.error('Failed to create employee')
  });

  const updateMutation = useMutation({
    ...updateEmployeeMutation,
    onSuccess: () => {
      toast.success('Employee updated successfully');
      onOpenChange(false);
    },
    onError: () => toast.error('Failed to update employee')
  });

  const form = useAppForm({
    defaultValues: {
      first_name: employee?.first_name ?? '',
      last_name: employee?.last_name ?? '',
      email: employee?.email ?? '',
      phone: employee?.phone ?? '',
      role: employee?.role ?? '',
      status: employee?.status ?? 'Active'
    } as EmployeeFormValues,
    validators: {
      onSubmit: employeeSchema
    },
    onSubmit: async ({ value }) => {
      if (isEdit) {
        await updateMutation.mutateAsync({ id: employee.id, values: value });
      } else {
        await createMutation.mutateAsync(value);
      }
    }
  });

  const { FormTextField, FormSelectField } = useFormFields<EmployeeFormValues>();

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='flex flex-col'>
        <SheetHeader>
          <SheetTitle>{isEdit ? 'Edit Employee' : 'New Employee'}</SheetTitle>
          <SheetDescription>
            {isEdit
              ? 'Update the employee details below.'
              : 'Fill in the details to create a new employee.'}
          </SheetDescription>
        </SheetHeader>

        <div className='flex-1 overflow-auto'>
          <form.AppForm>
            <form.Form id='employee-form-sheet' className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <FormTextField
                  name='first_name'
                  label='First Name'
                  required
                  placeholder='John'
                  validators={{
                    onBlur: z.string().min(2, 'First name must be at least 2 characters')
                  }}
                />
                <FormTextField
                  name='last_name'
                  label='Last Name'
                  required
                  placeholder='Doe'
                  validators={{
                    onBlur: z.string().min(2, 'Last name must be at least 2 characters')
                  }}
                />
              </div>

              <FormTextField
                name='email'
                label='Email'
                required
                type='email'
                placeholder='john@example.com'
                validators={{
                  onBlur: z.string().email('Please enter a valid email')
                }}
              />

              <FormTextField
                name='phone'
                label='Phone'
                required
                type='tel'
                placeholder='(555) 123-4567'
                validators={{
                  onBlur: z.string().min(1, 'Phone number is required')
                }}
              />

              <FormSelectField
                name='role'
                label='Role'
                required
                options={ROLE_OPTIONS}
                placeholder='Select role'
                validators={{
                  onBlur: z.string().min(1, 'Please select a role')
                }}
              />

              <FormSelectField
                name='status'
                label='Status'
                required
                options={STATUS_OPTIONS}
                placeholder='Select status'
                validators={{
                  onBlur: z.string().min(1, 'Please select a status')
                }}
              />
            </form.Form>
          </form.AppForm>
        </div>

        <SheetFooter>
          <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type='submit' form='employee-form-sheet' isLoading={isPending}>
            <Icons.check /> {isEdit ? 'Update Employee' : 'Create Employee'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export function EmployeeFormSheetTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Icons.add className='mr-2 h-4 w-4' /> Add Employee
      </Button>
      <EmployeeFormSheet open={open} onOpenChange={setOpen} />
    </>
  );
}
