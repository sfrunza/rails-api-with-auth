import { cn } from '@/lib/utils';

type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
};
export default function PageContainer({
  children,
  className,
}: PageContainerProps) {
  return (
    <div className={cn('overflow-y-auto pb-6', className)}>{children}</div>
  );
}
