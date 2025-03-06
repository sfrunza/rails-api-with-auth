import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SettingPageWrapper from '../setting-page-wrapper';
import CompanyForm from './company-form';
import BrandingUploads from './branding-uploads';
import { Setting, useGetSettingsQuery } from '@/services/settings-api';
import { Spinner } from '@/components/spinner';

export default function CompanyPage() {
  const { data, isLoading } = useGetSettingsQuery();

  return (
    <SettingPageWrapper title="Company">
      {isLoading ? (
        <div className="flex h-96 max-w-xl items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="space-y-4">
          <Card className="max-w-xl">
            <CardHeader>
              <CardTitle>Company</CardTitle>
              <CardDescription>
                Manage your company information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CompanyForm data={data as Setting} />
            </CardContent>
          </Card>
          <Card className="max-w-xl">
            <CardHeader>
              <CardTitle>Branding</CardTitle>
            </CardHeader>
            <CardContent>
              <BrandingUploads />
            </CardContent>
          </Card>
        </div>
      )}
    </SettingPageWrapper>
  );
}
