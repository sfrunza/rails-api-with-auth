import { Card, CardContent } from '@/components/ui/card';
import SettingPageWrapper from '../setting-page-wrapper';
import CalendarRatesList from './calendar-rates-list';

export default function CalendarRatesPage() {
  return (
    <SettingPageWrapper title="Calendar Rates">
      <Card className="max-w-2xl">
        <CardContent className="py-4">
          <CalendarRatesList />
        </CardContent>
      </Card>
    </SettingPageWrapper>
  );
}
