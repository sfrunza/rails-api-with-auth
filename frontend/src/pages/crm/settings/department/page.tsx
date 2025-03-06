import { Spinner } from '@/components/spinner';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useGetEmployeesQuery } from '@/services/employees-api';
import { useState } from 'react';
import { Outlet, useParams } from 'react-router';
import SettingPageWrapper from '../setting-page-wrapper';
import AddUserModal from './add-user-modal';
import { FilterTabs, Tab } from './filter-tabs';
import { UsersTable } from './users-table';

export default function DepartmentPage() {
  const params = useParams();
  const { data: users, isLoading } = useGetEmployeesQuery();
  const [filter, setFilter] = useState<Tab>('all');

  const filteredUsers = users?.filter((user) =>
    filter === 'all' ? user : user.role === filter
  );

  function handleSetFilter(value: Tab) {
    setFilter(value);
  }

  if (params.id) {
    return <Outlet />;
  }

  return (
    <SettingPageWrapper title="Department">
      <Card>
        <CardHeader>
          <AddUserModal />
        </CardHeader>
        <CardContent className="space-y-2">
          <FilterTabs filter={filter} handleSetFilter={handleSetFilter} />
          {isLoading && (
            <div className="flex h-96 items-center justify-center">
              <Spinner />
            </div>
          )}
          {filteredUsers && <UsersTable users={filteredUsers ?? []} />}
        </CardContent>
      </Card>
    </SettingPageWrapper>
  );
}
