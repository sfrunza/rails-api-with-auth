import PageContainer from '@/components/page-container';
import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetSettingsQuery } from '@/services/settings-api';
import { ChevronLeftIcon } from 'lucide-react';
import { Link, useParams } from 'react-router';
import { MoversMatrix } from './movers-matrix';

export default function MovingSizePage() {
  const { id } = useParams();
  const { data, isLoading } = useGetSettingsQuery();

  const movingSize = data?.move_size_options.find(
    (size) => size.id === parseInt(id as string)
  );

  return (
    <PageContainer className="grid h-[calc(100vh-64px)] grid-rows-[max-content_auto] p-4 lg:px-0 lg:py-4 lg:pr-4">
      <Card className="max-w-2xl p-0 overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-6">
            <Button variant="outline" size="icon" asChild>
              <Link to={'..'}>
                <ChevronLeftIcon />
              </Link>
            </Button>
            <div className="flex justify-center">{movingSize?.name}</div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading && (
            <div className="flex h-96 items-center justify-center">
              <Spinner />
            </div>
          )}
          {movingSize && <MoversMatrix moversCount={movingSize.movers_count} />}
        </CardContent>
      </Card>
    </PageContainer>
  );
}
