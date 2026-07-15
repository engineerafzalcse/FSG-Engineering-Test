import PageContainer from '@/components/layout/page-container';
import EmployeeListingPage from '@/features/employees/components/employee-listing';
import { searchParamsCache } from '@/lib/searchparams';
import type { SearchParams } from 'nuqs/server';
import { employeesInfoContent } from '@/features/employees/info-content';
import { EmployeeFormSheetTrigger } from '@/features/employees/components/employee-form-sheet';

export const metadata = {
  title: 'Dashboard: Employees'
};

interface PageProps {
  searchParams: Promise<SearchParams>;
}

export default async function EmployeesPage(props: PageProps) {
  const searchParams = await props.searchParams;
  searchParamsCache.parse(searchParams);

  return (
    <PageContainer
      pageTitle='Employees'
      pageDescription='Manage employee details, roles, and availability.'
      infoContent={employeesInfoContent}
      pageHeaderAction={<EmployeeFormSheetTrigger />}
    >
      <EmployeeListingPage />
    </PageContainer>
  );
}
