'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppForm, useFormFields } from '@/components/ui/tanstack-form';
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from '@/features/projects/constants/project-options';
import { projectSchema, type ProjectFormValues } from '@/features/projects/schemas/project';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import * as z from 'zod';
import { createProjectMutation, updateProjectMutation } from '../api/mutations';
import type { Project } from '../api/types';

interface ProjectFormProps {
  initialData: Project | null;
  pageTitle: string;
}

export default function ProjectForm({ initialData, pageTitle }: ProjectFormProps) {
  const router = useRouter();
  const isEdit = initialData !== null;

  const createMutation = useMutation({
    ...createProjectMutation,
    onSuccess: () => {
      toast.success('Project created successfully');
      router.push('/dashboard/projects');
    },
    onError: () => toast.error('Failed to create project')
  });

  const updateMutation = useMutation({
    ...updateProjectMutation,
    onSuccess: () => {
      toast.success('Project updated successfully');
      router.push('/dashboard/projects');
    },
    onError: () => toast.error('Failed to update project')
  });

  const form = useAppForm({
    defaultValues: {
      name: initialData?.name ?? '',
      description: initialData?.description ?? '',
      status: initialData?.status ?? 'Planning',
      priority: initialData?.priority ?? 'Medium',
      lead: initialData?.lead ?? '',
      due_date: initialData?.due_date.slice(0, 10) ?? ''
    } as ProjectFormValues,
    validators: { onSubmit: projectSchema },
    onSubmit: async ({ value }) => {
      if (isEdit) {
        await updateMutation.mutateAsync({ id: initialData.id, values: value });
      } else {
        await createMutation.mutateAsync(value);
      }
    }
  });

  const { FormTextField, FormSelectField, FormTextareaField } = useFormFields<ProjectFormValues>();

  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>{pageTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <form.AppForm>
          <form.Form className='space-y-8'>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <FormTextField
                name='name'
                label='Project Name'
                required
                placeholder='Enter project name'
                validators={{
                  onBlur: z.string().min(3, 'Project name must be at least 3 characters.')
                }}
              />

              <FormTextField
                name='lead'
                label='Project Lead'
                required
                placeholder='Enter project lead'
                validators={{
                  onBlur: z.string().min(2, 'Project lead must be at least 2 characters.')
                }}
              />

              <FormSelectField
                name='status'
                label='Status'
                required
                options={STATUS_OPTIONS}
                placeholder='Select status'
              />

              <FormSelectField
                name='priority'
                label='Priority'
                required
                options={PRIORITY_OPTIONS}
                placeholder='Select priority'
              />

              <FormTextField name='due_date' label='Due Date' required type='date' />
            </div>

            <FormTextareaField
              name='description'
              label='Description'
              required
              placeholder='Describe the project scope and desired outcome'
              maxLength={500}
              rows={5}
              validators={{
                onBlur: z.string().min(10, 'Description must be at least 10 characters.')
              }}
            />

            <div className='flex justify-end gap-2'>
              <Button type='button' variant='outline' onClick={() => router.back()}>
                Back
              </Button>
              <form.SubmitButton>{isEdit ? 'Update Project' : 'Create Project'}</form.SubmitButton>
            </div>
          </form.Form>
        </form.AppForm>
      </CardContent>
    </Card>
  );
}
