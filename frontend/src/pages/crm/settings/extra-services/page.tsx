import SettingPageWrapper from '../setting-page-wrapper';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import ExtraServiceList from './extra-service-list';
import ExtraServiceForm from './extra-service-form';

export default function ExtraServicesPage() {
  return (
    <SettingPageWrapper title="Extra Services">
      <Card className="max-w-4xl gap-0">
        <CardHeader className="flex flex-row items-center">
          <ExtraServiceForm />
        </CardHeader>
        <CardContent className="p-4">
          <ExtraServiceList />
        </CardContent>
      </Card>
    </SettingPageWrapper>
  );
}
