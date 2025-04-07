import { PageContainer } from '@/components/page-container';
import { Card } from '@/components/ui/card';
import { useParams } from 'react-router';
import { TopHeader } from './components/top-header';

export default function RequestPage() {
  const { id } = useParams();

  return (
    <PageContainer>
      <TopHeader id={id} />
      <div className="grid grid-cols-2 w-full gap-4">
        <Card>
          <div>RequestPage {id}</div>
        </Card>
        <Card>
          <div>RequestPage {id}</div>
        </Card>
      </div>
    </PageContainer>
  );
}
