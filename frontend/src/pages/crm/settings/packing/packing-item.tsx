import { CSSProperties } from 'react';
import { toast } from 'sonner';
import { GripVerticalIcon, TrashIcon } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useDeletePackingMutation } from '@/services/packings-api';
import { Button } from '@/components/ui/button';
import { LoadingButton } from '@/components/loading-button';
import { type Packing } from '@/types/packing';
import PackingForm from './packing-form';

export default function PackingItem({ item }: { item: Packing }) {
  const isMobile = useIsMobile();
  const [deletePacking, { isLoading: isDeleting }] = useDeletePackingMutation();
  const isDefaultItem = item.is_default;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : 'auto',
    position: isDragging ? 'relative' : 'static',
  };

  return (
    <div
      ref={!isDefaultItem ? setNodeRef : null}
      style={style}
      className={cn(
        'grid grid-cols-[max-content_1fr_auto_auto] border rounded-md items-center gap-2 p-4',
        {
          'bg-background shadow-lg': isDragging,
        }
      )}
    >
      <Button
        size="icon"
        variant="ghost"
        className="flex min-w-6 cursor-grab"
        disabled={isDefaultItem}
        {...(!isDefaultItem ? attributes : {})}
        {...(!isDefaultItem ? listeners : {})}
      >
        <GripVerticalIcon />
      </Button>
      <div className="overflow-hidden">
        <p className="truncate text-sm font-medium">{item.name}</p>
      </div>
      <PackingForm data={item} />
      {isDefaultItem ? (
        <Button variant="ghost" disabled size={isMobile ? 'icon' : 'default'}>
          <span className="hidden md:inline-flex ml-4">Default</span>
        </Button>
      ) : null}
      {!isDefaultItem && (
        <LoadingButton
          disabled={isDeleting}
          loading={isDeleting}
          variant="secondary"
          onClick={async () => {
            await deletePacking({ id: item.id }).unwrap();
            toast.success(`${item.name} successfully deleted`);
          }}
          size={isMobile ? 'icon' : 'default'}
        >
          <span className="flex items-center gap-2">
            <TrashIcon />
            <span className="hidden md:inline-flex">Delete</span>
          </span>
        </LoadingButton>
      )}
    </div>
  );
}
