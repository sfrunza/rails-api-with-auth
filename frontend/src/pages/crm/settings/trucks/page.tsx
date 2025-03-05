import SettingPageWrapper from '../setting-page-wrapper';
import { Card, CardContent } from '@/components/ui/card';
import TruckForm from './truck-form';
import TruckList from './truck-list';

export default function TrucksPage() {
  return (
    <SettingPageWrapper title="Trucks">
      <Card className="max-w-xl">
        <CardContent className="space-y-4">
          <TruckForm />
          <TruckList />
        </CardContent>
      </Card>
    </SettingPageWrapper>
  );
}
