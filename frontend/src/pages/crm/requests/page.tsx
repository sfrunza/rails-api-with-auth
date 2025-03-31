import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageContainer from '@/components/page-container';
import {
  statusBgColors,
  statusTextColors,
  tabOptions,
} from '@/constants/request';
import RequestsTable from './requests-table';
import { useAppDispatch, useAppSelector } from '@/store';
// import { TablePagination } from './table-pagination';
import { setFilter, setPage, TFilter } from '@/slices/requests-slice';
import {
  useGetRequestsQuery,
  useGetStatusCountsQuery,
} from '@/services/requests-api';

export default function RequestsPage() {
  const dispatch = useAppDispatch();
  const { data: statusCounts } = useGetStatusCountsQuery();
  const { filter, page } = useAppSelector((state) => state.requests);
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
        <ScrollArea className="pb-2">
          <TabsList className="h-12">
            {tabOptions.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={`${
                  statusTextColors[tab.value]
                } data-[state=active]:${
                  statusTextColors[tab.value]
                } h-full w-[180px] space-x-2`}
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
      {/* {requestsData && (
        <TablePagination totalPages={requestsData.total_pages} />
      )} */}
    </PageContainer>
  );
}
