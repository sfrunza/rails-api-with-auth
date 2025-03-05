import { CSSProperties } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVerticalIcon, TrashIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { type ExtraService } from '@/types/extra-service';
import { LoadingButton } from '@/components/loading-button';
import { useDeleteExtraServiceMutation } from '@/services/extra-services-api';
import { toast } from 'sonner';
import { PriceInput } from '@/components/ui/price-input';
import { Button } from '@/components/ui/button';

export default function ExtraServiceItem({
  id,
  item,
  onChange,
}: {
  id: number;
  item: ExtraService;
  onChange: (itemId: number, value: Partial<ExtraService>) => void;
}) {
  const [deleteExtraService, { isLoading: isDeleting }] =
    useDeleteExtraServiceMutation();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : 'auto',
    position: isDragging ? 'relative' : 'static',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'grid grid-cols-[max-content_3fr_1fr_1fr_1fr] items-center gap-4 p-2',
        {
          'bg-background': isDragging,
        }
      )}
    >
      <Button
        size="icon"
        variant="ghost"
        className="flex min-w-6 cursor-grab"
        {...attributes}
        {...listeners}
      >
        <GripVerticalIcon />
      </Button>
      <Input
        value={item.name}
        onChange={(e) => {
          const value = e.target.value;
          onChange(item.id, { name: value });
        }}
        name={item.name}
      />

      <PriceInput
        value={item.price}
        onValueChange={(val) => {
          onChange(item.id, {
            price: val,
          });
        }}
      />
      <Switch
        checked={item.enabled}
        onCheckedChange={(val) => {
          onChange(item.id, { enabled: val });
        }}
      />
      <div className="flex justify-end">
        <LoadingButton
          disabled={isDeleting}
          loading={isDeleting}
          variant="ghost"
          className="hover:text-red-600"
          onClick={async () => {
            await deleteExtraService({ id: item.id }).unwrap();
            toast.success(`${item.name} successfully deleted`);
          }}
        >
          <span className="flex gap-2">
            <TrashIcon className="size-4" />
            Delete
          </span>
        </LoadingButton>
      </div>
    </div>
  );
}
