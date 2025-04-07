import { PageContainer } from '@/components/page-container';
import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useGetEmployeeByIdQuery } from '@/services/employees-api';
import { format } from 'date-fns';
import { ChevronLeftIcon } from 'lucide-react';
import { Link, useParams } from 'react-router';
import { ProfileForm } from './profile-form';

export default function UserProfilePage() {
  const { id } = useParams();
  const { data, isLoading } = useGetEmployeeByIdQuery({
    id: id as string,
  });

  return (
    <PageContainer className="space-y-4 bg-muted dark:bg-background">
      <div className="space-y-2">
        <div className="flex w-full items-center gap-4 px-4 pt-4 lg:border-none">
          <Button variant="outline" size="icon" asChild>
            <Link to="/crm/settings/department">
              <ChevronLeftIcon />
            </Link>
          </Button>
          <h3 className="text-lg font-semibold">
            {data && `${data?.first_name} ${data?.last_name}`}
          </h3>
        </div>
        <div className="flex h-5 px-4 space-x-2 text-muted-foreground text-sm">
          <span>Employee ID: {data?.id ?? ''}</span>
          <Separator orientation="vertical" />
          <span>
            Creation Date:{' '}
            {data?.created_at ? format(data?.created_at, 'dd MMM, yyyy') : ''}
          </span>
        </div>
      </div>
      <div className="overflow-y-auto p-4">
        <Card className="max-w-2xl">
          <CardContent>
            {isLoading && (
              <div className="flex h-96 items-center justify-center">
                <Spinner />
              </div>
            )}
            {data && <ProfileForm user={data} />}
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
