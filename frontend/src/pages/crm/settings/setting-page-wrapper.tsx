import { PageContainer } from '@/components/page-container';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeftIcon } from 'lucide-react';
import { Link } from 'react-router';

type PageProps = {
  children: React.ReactNode;
  className?: string;
  title: string;
};

export default function SettingPageWrapper({
  children,
  title,
  className,
}: PageProps) {
  return (
    <PageContainer className="space-y-4 bg-muted dark:bg-background">
      <div className="flex w-full items-center gap-4 px-4 pt-4 lg:border-none">
        <div className="lg:hidden">
          <Button variant="outline" size="icon" asChild>
            <Link to="/crm/settings">
              <ChevronLeftIcon />
            </Link>
          </Button>
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className={cn('overflow-y-auto p-4', className)}>{children}</div>
    </PageContainer>
  );
}
