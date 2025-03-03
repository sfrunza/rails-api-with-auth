import { CSSProperties } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVerticalIcon, TrashIcon } from 'lucide-react'
import { toast } from 'sonner'

import { cn } from '@/lib/utils'
import { useDeleteServiceMutation } from '@/services/services-api'
import { Switch } from '@/components/ui/switch'
import { LoadingButton } from '@/components/loading-button'
import { Service } from '@/types/service'
import { Button } from '@/components/ui/button'

export default function ServiceItem({
  id,
  item,
  onEnabledChange
}: {
  id: number
  item: Service
  onEnabledChange: (index: number, value: boolean) => void
}) {
  const [deleteService, { isLoading: isDeleting }] = useDeleteServiceMutation()
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: id })

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : 'auto',
    position: isDragging ? 'relative' : 'static'
    // touchAction: 'none'
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'grid grid-cols-[max-content_1fr_max-content_max-content] border rounded-md items-center gap-2 p-2',
        {
          'bg-background shadow-lg': isDragging
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
      <div className="overflow-hidden">
        <p className="truncate text-sm font-medium">{item.name}</p>
      </div>
      <Switch
        checked={item.enabled}
        onCheckedChange={(val) => {
          onEnabledChange(item.id, val)
        }}
      />
      {!item.is_default ? (
        <LoadingButton
          loading={isDeleting}
          disabled={isDeleting}
          variant="ghost"
          size="icon"
          className="hover:text-red-600"
          onClick={async () => {
            await deleteService({ id: item.id }).unwrap()
            toast.success(`${item.name} successfully deleted`)
          }}
        >
          <TrashIcon />
        </LoadingButton>
      ) : (
        <div className="size-9" />
      )}
    </div>
  )
}
