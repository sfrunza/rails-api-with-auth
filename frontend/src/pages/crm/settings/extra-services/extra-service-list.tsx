import { LoadingButton } from '@/components/loading-button';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { type ExtraService } from '@/types/extra-service';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
import ExtraServiceItem from './extra-service-item';
import {
  useBulkUpdateExtraServicesMutation,
  useGetExtraServicesQuery,
} from '@/services/extra-services-api';
import { toast } from 'sonner';

export default function ExtraServiceList() {
  const {
    data: extraServices,
    isLoading,
    isError,
  } = useGetExtraServicesQuery({});
  const [bulkUpdateExtraServices, { isLoading: isBulkUpdating }] =
    useBulkUpdateExtraServicesMutation();

  const [items, setItems] = useState<ExtraService[]>([]);
  const [orderChanged, setOrderChanged] = useState<boolean>(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (extraServices) {
      setItems(extraServices);
    }
  }, [extraServices]);

  function onDragEnd(event: any) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);
      const updatedItems = newItems.map((item, index) => ({
        ...item,
        index,
      }));

      setItems(updatedItems);
      setOrderChanged(true);
    }
  }

  function onChange(itemId: number, values: Partial<ExtraService>) {
    setItems((prev) => {
      return prev.map((item) =>
        item.id === itemId ? { ...item, ...values } : item
      );
    });
    setOrderChanged(true);
  }

  if (isError) {
    return (
      <div className="flex w-full items-center justify-center text-muted-foreground">
        <p>Failed to fetch extra services</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <ScrollArea className="w-full">
        <div className="mb-4 grid grid-cols-[max-content_3fr_1fr_1fr_1fr] items-center gap-4 text-sm font-medium text-muted-foreground">
          <p className="size-9" />
          <p>Service name</p>
          <p>Service cost, $</p>
          <p>Enable</p>
          <p></p>
        </div>
        <Separator />
        {isLoading && <LoadingSkeleton />}
        {extraServices && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
            modifiers={[restrictToParentElement]}
          >
            <SortableContext items={items}>
              <div className="pt-4 min-w-[700px] space-y-2">
                {items.map((item) => (
                  <ExtraServiceItem
                    key={item.id}
                    id={item.id}
                    item={item}
                    onChange={onChange}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <Separator />
      <div
        className={cn('flex transition-opacity duration-500 sm:justify-end', {
          'invisible opacity-0': !orderChanged,
          'visible opacity-100': orderChanged,
        })}
      >
        <div className="flex min-h-9 w-full gap-4 sm:w-auto">
          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => {
              setItems(extraServices!);
              setOrderChanged(false);
            }}
          >
            Cancel
          </Button>
          <LoadingButton
            type="button"
            className="w-full sm:w-auto"
            disabled={isBulkUpdating}
            loading={isBulkUpdating}
            onClick={async () => {
              await bulkUpdateExtraServices({
                extra_services: items,
              }).unwrap();
              setOrderChanged(false);
              toast.success('Changes saved');
              setOrderChanged(false);
            }}
          >
            Save changes
          </LoadingButton>
        </div>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4 py-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-[max-content_3fr_1fr_1fr_1fr] gap-4"
        >
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
        </div>
      ))}
    </div>
  );
}
