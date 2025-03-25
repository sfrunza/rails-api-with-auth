import SettingPageWrapper from '../setting-page-wrapper';
import { Card, CardContent } from '@/components/ui/card';
import ServiceForm from './service-form';
import ServiceList from './service-list';

export default function MovingServicesPage() {
  return (
    <SettingPageWrapper title="Moving Services">
      <Card className="max-w-xl">
        <CardContent className="space-y-6">
          <ServiceForm />
          <ServiceList />
        </CardContent>
      </Card>
    </SettingPageWrapper>
  );
}
