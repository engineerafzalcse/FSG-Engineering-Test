import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/query-client';
import { projectByIdOptions } from '@/features/projects/api/queries';
import PageContainer from '@/components/layout/page-container';
import ProjectViewPage from '@/features/projects/components/project-view-page';

export const metadata = {
  title: 'Dashboard : Project View'
};

type PageProps = { params: Promise<{ projectId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  const queryClient = getQueryClient();

  if (params.projectId !== 'new') {
    void queryClient.prefetchQuery(projectByIdOptions(Number(params.projectId)));
  }

  return (
    <PageContainer>
      <div className='flex-1 space-y-4'>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ProjectViewPage projectId={params.projectId} />
        </HydrationBoundary>
      </div>
    </PageContainer>
  );
}
