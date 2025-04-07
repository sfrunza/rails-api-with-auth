import { cn } from '@/lib/utils';
import { Outlet, useParams } from 'react-router';
import MessagesPage from './page';

export default function MessagesLayout() {
  const { id } = useParams();
  return (
    <div className="grid h-full lg:grid-cols-[22rem_1fr]">
      <MessagesPage />
      {id ? (
        <Outlet />
      ) : (
        <div className="p-4">
          <div
            className={cn(
              'inset-0 h-full hidden w-full items-center justify-center lg:flex rounded-xl border bg-primary-foreground shadow-sm'
            )}
          >
            <p className="font-semibold">Select a request</p>
          </div>
        </div>
      )}
    </div>
  );
}
