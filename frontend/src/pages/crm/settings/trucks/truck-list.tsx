import { TruckIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { LoadingButton } from '@/components/loading-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { type Truck } from '@/types/truck';

import {
  useBulkUpdateTrucksMutation,
  useGetTrucksQuery,
} from '@/services/trucks-api';
import { toast } from 'sonner';

export default function TruckList() {
  const { data: trucks, isLoading, isError } = useGetTrucksQuery();
  const [bulkUpdateTrucks, { isLoading: isBulkUpdating }] =
    useBulkUpdateTrucksMutation();
  const [items, setItems] = useState<Truck[]>([]);
  const [isTouched, setIsTouched] = useState<boolean>(false);

  useEffect(() => {
    if (trucks) {
      setItems(trucks);
    }
  }, [trucks]);

  async function handleSaveChanges() {
    await bulkUpdateTrucks({ trucks: items }).unwrap();
    setIsTouched(false);
    toast.success('Changes saved');
  }

  function handleChange(
    truck: Truck,
    name: keyof Truck,
    value: (typeof truck)[keyof Truck]
  ) {
    const newPackingList = items.map((t) =>
      t.id === truck.id
        ? {
            ...t,
            [name]: value,
          }
        : t
    );

    setItems(newPackingList);
    setIsTouched(true);
  }

  if (isError) {
    return (
      <div className="flex w-full items-center justify-center text-muted-foreground">
        <p>Failed to fetch trucks</p>
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-col gap-6">
      <div className="space-y-4">
        {isLoading && (
          <>
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton className="h-9 w-full" key={i} />
            ))}
          </>
        )}
        {items?.map((truck, idx) => (
          <div
            key={truck.id}
            className="flex items-center gap-6 font-medium md:gap-10"
          >
            <div className="flex min-w-fit items-center gap-4 text-sm text-muted-foreground">
              <TruckIcon className="size-5" />
              <span>Truck {idx + 1}</span>
            </div>
            <Switch
              checked={truck.is_active}
              onCheckedChange={(checked) => {
                const value = checked;
                handleChange(truck, 'is_active', value);
              }}
            />
            <Input
              value={truck.name}
              onChange={(e) => {
                const value = e.target.value;
                handleChange(truck, 'name', value);
              }}
            />
          </div>
        ))}
      </div>
      <div className="border-t pt-4">
        <div
          className={cn('flex transition-opacity duration-500 sm:justify-end', {
            'invisible opacity-0': !isTouched,
            'visible opacity-100': isTouched,
          })}
        >
          <div className="flex min-h-9 w-full gap-4 sm:w-auto">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => {
                setItems(trucks!);
                setIsTouched(false);
              }}
            >
              Cancel
            </Button>
            <LoadingButton
              type="button"
              className="w-full sm:w-auto"
              disabled={isBulkUpdating}
              loading={isBulkUpdating}
              onClick={handleSaveChanges}
            >
              Save changes
            </LoadingButton>
          </div>
        </div>
      </div>
    </div>
  );
}
