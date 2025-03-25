import { LoadingButton } from '@/components/loading-button';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import {
  useBulkUpdateMoveSizesMutation,
  useGetMoveSizesQuery,
} from '@/services/move-sizes-api';
import { type MoveSize } from '@/types/move-size';
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
import { toast } from 'sonner';
import MoveSizeItem from './move-size-item';

export default function MoveSizeList() {
  const { data: moveSizes, isLoading, isError } = useGetMoveSizesQuery();
  const [bulkUpdateMoveSizes, { isLoading: isBulkUpdating }] =
    useBulkUpdateMoveSizesMutation();

  const [items, setItems] = useState<MoveSize[]>([]);
  const [orderChanged, setOrderChanged] = useState<boolean>(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (moveSizes) {
      setItems(moveSizes);
    }
  }, [moveSizes]);

  function handleDragEnd(event: any) {
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

  if (isError) {
    return (
      <div className="flex w-full items-center justify-center text-muted-foreground">
        <p>Failed to fetch move sizes</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {isLoading && (
        <div className="space-y-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton className="h-19.5 w-full" key={i} />
          ))}
        </div>
      )}
      {moveSizes && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToParentElement]}
        >
          <SortableContext items={items}>
            <div className="space-y-2">
              {items.map((item) => (
                <MoveSizeItem key={item.id} item={item} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
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
              setItems(moveSizes!);
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
              const moveSizes = items.map(({ id, index }) => ({
                id,
                index,
              }));
              await bulkUpdateMoveSizes({ moveSizes }).unwrap();
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
