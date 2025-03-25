import { SquarePenIcon } from 'lucide-react';
import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { LoadingButton } from '@/components/loading-button';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  useCreateMoveSizeMutation,
  useDeleteMoveSizeMutation,
  useUpdateMoveSizeMutation,
} from '@/services/move-sizes-api';
import { type MoveSize } from '@/types/move-size';
import { MoversMatrix } from './movers-matrix';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const DEFAULT_MATRIX = [
  [2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 3, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2],
];

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  dispersion: z.number(),
  truck_count: z.number(),
  volume: z.number(),
  weight: z.number(),
  crew_size_settings: z.array(z.array(z.number())),
  image: z.instanceof(File),
});

type Inputs = z.infer<typeof formSchema>;

type MoveSizeFormProps = {
  data?: MoveSize;
};

function getImageData(event: ChangeEvent<HTMLInputElement>) {
  const file = event.target.files && event.target.files[0];
  const displayUrl = file ? URL.createObjectURL(file) : '';

  return { file, displayUrl };
}

export default function MoveSizeForm({ data }: MoveSizeFormProps) {
  const [createMoveSize, { isLoading: isCreating }] =
    useCreateMoveSizeMutation();
  const [updateMoveSize, { isLoading: isUpdating }] =
    useUpdateMoveSizeMutation();
  const [deleteMoveSize, { isLoading: isDeleting }] =
    useDeleteMoveSizeMutation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isMobile = useIsMobile();
  const isEditing = !!data;
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<Inputs>({
    defaultValues: {
      name: '',
      description: '',
      dispersion: 0,
      truck_count: 0,
      volume: 0,
      weight: 0,
      crew_size_settings: DEFAULT_MATRIX,
      image: undefined,
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name,
        description: data.description,
        dispersion: data.dispersion,
        truck_count: data.truck_count,
        volume: data.volume,
        weight: data.weight,
        crew_size_settings:
          data.crew_size_settings.length > 0
            ? data.crew_size_settings
            : DEFAULT_MATRIX,
      });
      setPreview(data.image_url);
    }
  }, [data]);

  function onClose() {
    form.reset();
    setIsOpen((prev) => !prev);
  }

  async function onSubmit(values: Inputs) {
    if (isEditing) {
      await updateMoveSize({ id: data.id, ...values }).unwrap();
      toast.success('Changes successfully saved');
    } else {
      await createMoveSize(values).unwrap();
      toast.success('Move size successfully added');
    }
    form.reset();
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild className={`${!isEditing ? 'ml-auto' : null}`}>
        {isEditing ? (
          <Button
            variant="outline"
            className="text-primary hover:text-primary"
            size={isMobile ? 'icon' : 'default'}
          >
            <SquarePenIcon />
            <span className="hidden md:inline-flex">Edit</span>
          </Button>
        ) : (
          <Button>Add move size</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit' : 'Add'} move size</DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="-mx-6 max-h-[calc(100vh-250px)] overflow-y-auto px-6 pb-4 space-y-4">
              <FormField
                control={form.control}
                name="image"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input
                        {...fieldProps}
                        placeholder="Image"
                        type="file"
                        accept="image/png, image/jpeg"
                        multiple={false}
                        onChange={(event) => {
                          const { file, displayUrl } = getImageData(event);
                          setPreview(displayUrl);
                          onChange(file);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div
                className="flex justify-center items-center"
                // className="flex justify-center size-40 flex-col w-full justify-center items-center rounded-lg border-2 border-dashed"
              >
                {preview && (
                  <div className="relative size-40 p-1 rounded-md border-2 border-dashed">
                    <img
                      src={preview}
                      alt="Company logo"
                      className="h-full w-full rounded-md object-contain"
                    />
                  </div>
                )}
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} autoComplete="off" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={16} autoComplete="off" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dispersion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dispersion %</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        pattern="[0-9]+"
                        inputMode="numeric"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="truck_count"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trucks count for this size</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        pattern="[0-9]+"
                        inputMode="numeric"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="volume"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Volume</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        pattern="[0-9]+"
                        inputMode="numeric"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        pattern="[0-9]+"
                        inputMode="numeric"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="crew_size_settings"
                render={({ field }) => (
                  <FormItem>
                    <p className="text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
                      Crew size settings
                    </p>
                    <FormControl>
                      <MoversMatrix
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
              <div>
                {isEditing && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="mt-2 sm:mt-0 w-full">
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this move size?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>No, cancel</AlertDialogCancel>
                        <LoadingButton
                          type="button"
                          loading={isDeleting}
                          disabled={isDeleting}
                          className="mt-2 sm:mt-0"
                          onClick={async () => {
                            await deleteMoveSize({ id: data?.id! }).unwrap();
                            toast.success('Move size successfully deleted');
                            onClose();
                          }}
                        >
                          Yes, delete
                        </LoadingButton>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>

              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <DialogClose>Cancel</DialogClose>
                <LoadingButton
                  type="submit"
                  loading={isCreating || isUpdating}
                  disabled={isCreating || isUpdating}
                >
                  {isEditing ? 'Save changes' : 'Add move size'}
                </LoadingButton>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
