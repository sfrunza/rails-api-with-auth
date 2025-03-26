import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Outlet, useParams } from 'react-router';
import SettingPageWrapper from '../setting-page-wrapper';
import MoveSizeForm from './move-size/move-size-form';
import MoveSizeList from './move-size/move-size-list';
import EntranceTypeForm from './entrance-type/entrance-type-form';
import EntranceTypeList from './entrance-type/entrance-type-list';

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
            <EntranceTypeForm />
          </CardHeader>
          <CardContent>
            <EntranceTypeList />
          </CardContent>
        </Card>
      </div>
    </SettingPageWrapper>
  );
}
