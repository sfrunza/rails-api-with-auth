import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Outlet, useParams } from 'react-router';
import SettingPageWrapper from '../setting-page-wrapper';
import MoveSizeList from './move-size-list';
import MoveSizeForm from './move-size-form';
import { Button } from '@/components/ui/button';

export default function CalculatorPage() {
  const params = useParams();

  if (params.id) {
    return <Outlet />;
  }

  return (
    <SettingPageWrapper title="Calculator">
      <div className="space-y-4">
        <Card className="max-w-3xl">
          <CardHeader className="flex flex-row justify-between">
            <CardTitle>Move Size</CardTitle>
            <MoveSizeForm />
          </CardHeader>
          <CardContent>
            <MoveSizeList />
          </CardContent>
        </Card>
        <Card className="max-w-3xl">
          <CardHeader className="flex flex-row justify-between">
            <CardTitle>Stairs</CardTitle>
            <Button>Add Stairs</Button>
          </CardHeader>
          <CardContent className="space-y-2">asdasd</CardContent>
        </Card>
      </div>
    </SettingPageWrapper>
  );
}
