import SettingPageWrapper from '../setting-page-wrapper'
import { Card, CardContent } from '@/components/ui/card'
import ServiceForm from './service-form'
import ServiceList from './service-list'
import { Separator } from '@/components/ui/separator'

export default function MovingServicesPage() {
  return (
    <SettingPageWrapper title="Moving Services">
      <Card className="max-w-xl">
        <CardContent className="space-y-4">
          <ServiceForm />
          <Separator />
          <ServiceList />
        </CardContent>
      </Card>
    </SettingPageWrapper>
  )
}
