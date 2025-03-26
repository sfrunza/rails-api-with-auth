import { EntranceType } from '@/types/entrance-type';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVerticalIcon, TrashIcon } from 'lucide-react';
import { CSSProperties } from 'react';

import { LoadingButton } from '@/components/loading-button';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { useDeleteEntranceTypeMutation } from '@/services/entrance-types-api';

interface EntranceTypeItemProps {
  item: EntranceType;
  onChange: (itemId: number, values: Partial<EntranceType>) => void;
}

export default function EntranceTypeItem({
  item,
  onChange,
}: EntranceTypeItemProps) {
  const [deleteEntranceType, { isLoading: isDeleting }] =
    useDeleteEntranceTypeMutation();
  const isMobile = useIsMobile();
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
    <div className="flex items-center gap-2" ref={setNodeRef} style={style}>
      <GripVerticalIcon
        className="size-5 min-w-5 cursor-grab text-muted-foreground"
        {...attributes}
        {...listeners}
      />
      <div
        className={cn('grid auto-cols-auto grid-flow-col gap-2', {
          'bg-background': isDragging,
        })}
      >
        <Input
          type="text"
          value={item.name}
          onChange={(e) => {
            onChange(item.id, { name: e.target.value });
          }}
        />
        <Input
          type="text"
          value={item.form_name}
          onChange={(e) => {
            onChange(item.id, { form_name: e.target.value });
          }}
        />
        <LoadingButton
          loading={isDeleting}
          disabled={isDeleting}
          variant="secondary"
          size={isMobile ? 'icon' : 'default'}
          onClick={() => {
            deleteEntranceType({ id: item.id });
          }}
        >
          <span className="flex items-center gap-2">
            <TrashIcon className="size-4" />
            {isMobile ? null : 'Delete'}
          </span>
        </LoadingButton>
      </div>
    </div>
  );
}
