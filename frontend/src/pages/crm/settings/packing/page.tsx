import SettingPageWrapper from '../setting-page-wrapper';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import PackingForm from './packing-form';
import PackingList from './packing-list';

export default function PackingPage() {
  return (
    <SettingPageWrapper title="Packing Services">
      <Card className="max-w-2xl">
        <CardHeader>
          <PackingForm />
        </CardHeader>
        <CardContent>
          <PackingList />
        </CardContent>
      </Card>
    </SettingPageWrapper>
  );
}
