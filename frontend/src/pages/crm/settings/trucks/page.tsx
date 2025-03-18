import SettingPageWrapper from '../setting-page-wrapper';
import { Card, CardContent } from '@/components/ui/card';
import TruckForm from './truck-form';
import TruckList from './truck-list';
import { Separator } from '@/components/ui/separator';
// import { useLoaderData } from 'react-router';

export default function TrucksPage() {
  // const trucks = useLoaderData();
  // console.log('trucks', trucks);
  return (
    <SettingPageWrapper title="Trucks">
      <Card className="max-w-xl">
        <CardContent className="space-y-4">
          <TruckForm />
          <Separator />
          <TruckList />
        </CardContent>
      </Card>
    </SettingPageWrapper>
  );
}
