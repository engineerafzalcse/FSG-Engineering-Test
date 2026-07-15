'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import ProjectForm from './project-form';
import { projectByIdOptions } from '../api/queries';

type TProjectViewPageProps = {
  projectId: string;
};

export default function ProjectViewPage({ projectId }: TProjectViewPageProps) {
  if (projectId === 'new') {
    return <ProjectForm initialData={null} pageTitle='Create New Project' />;
  }

  return <EditProjectView projectId={Number(projectId)} />;
}

function EditProjectView({ projectId }: { projectId: number }) {
  const { data } = useSuspenseQuery(projectByIdOptions(projectId));

  if (!data?.success || !data?.project) {
    notFound();
  }

  return <ProjectForm initialData={data.project} pageTitle='Edit Project' />;
}
