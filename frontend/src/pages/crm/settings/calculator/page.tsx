import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SettingPageWrapper from '../setting-page-wrapper';
import { type Setting, useGetSettingsQuery } from '@/services/settings-api';
import { Spinner } from '@/components/spinner';
import { Link, Outlet, useParams } from 'react-router';

export default function CalculatorPage() {
  const params = useParams();
  const { data, isLoading } = useGetSettingsQuery();

  if (isLoading) {
    return (
      <div className="flex h-96 max-w-xl items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (params.id) {
    return <Outlet />;
  }

  return (
    <SettingPageWrapper title="Calculator">
      {isLoading ? (
        <div className="flex h-96 max-w-xl items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="space-y-4">
          <Card className="max-w-xl">
            <CardHeader>
              <CardTitle>Moving Size</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <MovingSizeList
                movingSizeOptions={
                  data?.move_size_options as Setting['move_size_options']
                }
              />
            </CardContent>
          </Card>
          <Card className="max-w-xl">
            <CardHeader>
              <CardTitle>Floor Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <FloorOptionsList
                floorOptions={data?.floor_options as Setting['floor_options']}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </SettingPageWrapper>
  );
}

interface MovingSizeListProps {
  movingSizeOptions: Setting['move_size_options'];
}

function MovingSizeList({ movingSizeOptions }: MovingSizeListProps) {
  return (
    <div>
      {movingSizeOptions?.map((size) => (
        <div key={size.id}>
          <Link to={`${size.id}`}>{size.name}</Link>
        </div>
      ))}
    </div>
  );
}

interface FloorOptionsListProps {
  floorOptions: Setting['floor_options'];
}

function FloorOptionsList({ floorOptions }: FloorOptionsListProps) {
  return (
    <div>
      {floorOptions?.map((option) => (
        <div key={option.id}>{option.name}</div>
      ))}
    </div>
  );
}
