import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/query-client';
import { searchParamsCache } from '@/lib/searchparams';
import { employeesQueryOptions } from '../api/queries';
import { EmployeesTable } from './employees-table';

export default function EmployeeListingPage() {
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('name');
  const pageLimit = searchParamsCache.get('perPage');
  const roles = searchParamsCache.get('role');
  const sort = searchParamsCache.get('sort');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(roles && { roles }),
    ...(sort && { sort })
  };

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(employeesQueryOptions(filters));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EmployeesTable />
    </HydrationBoundary>
  );
}
