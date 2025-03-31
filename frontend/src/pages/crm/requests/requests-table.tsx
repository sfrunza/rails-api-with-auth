import { useState } from 'react';

import { format } from 'date-fns';
import { useNavigate } from 'react-router';

import { cn, formatDate, formatPhone } from '@/lib/utils';

import { statusBgColors, statusTextColors } from '@/constants/request';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
// import { formatMoney } from "@/lib/helpers";
import { badgeVariants } from '@/components/ui/badge';
import { priceObjectToString } from '@/lib/helpers';
import { TRequest } from '@/types/request';
import { User2Icon } from 'lucide-react';

// type TStorageIcons = {
//   [key: string]: string;
// };

// const storageIcons: TStorageIcons = {
//   "Moving & Storage": "/svg-icons/warehouse.svg",
//   "Overnight Truck Storage": "/svg-icons/truck.svg",
// };

export default function RequestsTable({ requests }: { requests: TRequest[] }) {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  function handleRowClick(id: number) {
    if (selectedId === id) {
      navigate(`/dashboard/requests/${id}`);
    } else {
      setSelectedId(id);
    }
  }

  return (
    <div className="min-h-[calc(100vh-200px)]">
      <Table className="min-w-[1850px]">
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Move date</TableHead>
            <TableHead>Customer, phone</TableHead>
            <TableHead>Moving from</TableHead>
            <TableHead>Moving to</TableHead>
            <TableHead>Size of move</TableHead>
            <TableHead>Crew</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>Updated at</TableHead>
            <TableHead className="text-right">Est. Quote</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests?.map((request: TRequest) => {
            const fullName = request.customer
              ? `${request.customer?.first_name} ${request.customer?.last_name}`
              : '';
            // const withStorage =
            //   request.service.name === "Moving & Storage" ||
            //   request.service.name === "Overnight Truck Storage";
            // const isMovingFromStorage = request.is_moving_from_storage;
            // const hasPairedRequest = request?.paired_request;
            // const showStorageOrigin =
            //   withStorage && isMovingFromStorage && hasPairedRequest;

            // const showStorageDestination =
            //   withStorage && !isMovingFromStorage && hasPairedRequest;

            return (
              <TableRow
                key={request.id}
                className={cn(
                  'h-16 text-xs font-medium hover:cursor-pointer',
                  selectedId === request.id && 'bg-muted'
                )}
                onClick={() => handleRowClick(request?.id!)}
                onSelect={() => handleRowClick(request?.id!)}
              >
                <TableCell className="text-sm font-bold">
                  {request.id}
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      badgeVariants({ variant: 'outline' }),
                      'relative overflow-hidden'
                    )}
                  >
                    <span
                      className={`${
                        statusBgColors[request.status]
                      } absolute inset-0 opacity-15`}
                    />
                    <span
                      className={`${
                        statusTextColors[request.status]
                      } capitalize`}
                    >
                      {request.status.replace('_', ' ')}
                    </span>
                  </span>
                </TableCell>
                <TableCell>{request.service?.name}</TableCell>
                <TableCell>
                  {formatDate(request.moving_date)}
                  <br />
                  <DaysUntilMove movingDate={request.moving_date} />
                </TableCell>
                <TableCell>
                  {fullName ?? ''}
                  <br />
                  {formatPhone(request.customer?.phone)}
                </TableCell>
                <TableCell>
                  Brookline, MA <br />
                  02446
                  {/* {showStorageOrigin ? (
                    <div className="flex items-center gap-2">
                      <img
                        src={storageIcons[request.service.name]}
                        className="size-6"
                      />
                      From storage
                    </div>
                  ) : (
                    <>
                      {request.origin.city}
                      <br />
                      {request.origin.state} {request.origin.zip}
                    </>
                  )} */}
                </TableCell>
                <TableCell className="items-center gap-2">
                  Boston, MA <br />
                  02166
                  {/* {showStorageDestination ? (
                    <div className="flex items-center gap-2">
                      <img
                        src={storageIcons[request.service.name]}
                        className="size-6"
                      />
                      To storage
                    </div>
                  ) : (
                    <>
                      {request.destination.city}
                      <br />
                      {request.destination.state} {request.destination.zip}
                    </>
                  )} */}
                </TableCell>
                <TableCell>{request.size}</TableCell>
                <TableCell>
                  {request.crew_size && (
                    <span className="flex items-center gap-1">
                      <User2Icon className="size-4" />
                      {request.crew_size}
                    </span>
                  )}
                </TableCell>
                <TableCell>{format(request.created_at, 'P')}</TableCell>
                <TableCell>{format(request.updated_at, 'P')}</TableCell>
                <TableCell className="text-right">
                  {priceObjectToString(request.total_price)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

function DaysUntilMove({ movingDate }: { movingDate: string | null }) {
  if (!movingDate) {
    return null;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time portion for accurate day comparison
  const movingDateObj = new Date(movingDate);
  movingDateObj.setHours(0, 0, 0, 0);

  const diffTime = movingDateObj.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Early return for past dates
  if (diffDays < 0) {
    return null;
  }

  let value: string;
  switch (diffDays) {
    case 0:
      value = 'today';
      break;
    case 1:
      value = 'tomorrow';
      break;
    default:
      value = `in ${diffDays} days`;
  }

  const color = diffDays < 2 ? 'text-destructive' : 'text-green-600';
  return <span className={color}>{value}</span>;
}
