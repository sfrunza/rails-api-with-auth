import { PageContainer } from '@/components/page-container';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  statusBgColors,
  statusTextColors,
  tabOptions,
} from '@/constants/request';
import { cn } from '@/lib/utils';
import {
  useGetRequestsQuery,
  useGetStatusCountsQuery,
} from '@/services/requests-api';
import { setFilter, setPage, TFilter } from '@/slices/requests-slice';
import { useAppDispatch, useAppSelector } from '@/store';
import { RequestsTable } from './requests-table';
import { TablePagination } from './table-pagination';

export default function RequestsPage() {
  const dispatch = useAppDispatch();
  const { filter, page } = useAppSelector((state) => state.requests);
  const { data: statusCounts } = useGetStatusCountsQuery();
  const { data: requestsData } = useGetRequestsQuery({ filter, page });

  return (
    <PageContainer className="h-full p-4">
      <Tabs
        value={filter}
        onValueChange={(val) => {
          dispatch(setFilter(val as TFilter));
          dispatch(setPage(1));
        }}
      >
        <ScrollArea>
          <TabsList className="h-12">
            {tabOptions.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={cn(
                  'h-full w-[180px] space-x-2',
                  `data-[state=active]:${statusTextColors[tab.value]}`,
                  statusTextColors[tab.value]
                )}
              >
                <span>{tab.label}</span>
                <span
                  className={`${
                    statusBgColors[tab.value]
                  } rounded-full px-1 text-xs font-semibold text-muted`}
                >
                  {statusCounts?.[tab.value] ?? '0'}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Tabs>
      <RequestsTable requests={requestsData?.requests ?? []} />
      {requestsData && (
        <TablePagination totalPages={requestsData.total_pages} />
      )}
    </PageContainer>
  );
}
