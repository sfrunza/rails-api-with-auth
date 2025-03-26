import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { PlusIcon, SquarePenIcon } from 'lucide-react';
import { toast } from 'sonner';

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
import { type Packing } from '@/types/packing';
import {
  useCreatePackingMutation,
  useUpdatePackingMutation,
} from '@/services/packings-api';

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  labor_increase: z.number(),
});

type Inputs = z.infer<typeof formSchema>;

type PackingFormProps = {
  data?: Packing;
};

export default function PackingForm({ data }: PackingFormProps) {
  const [createPacking, { isLoading: isCreating }] = useCreatePackingMutation();
  const [updatePacking, { isLoading: isUpdating }] = useUpdatePackingMutation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isMobile = useIsMobile();
  const isEditing = !!data;

  const form = useForm<Inputs>({
    defaultValues: {
      name: '',
      description: '',
      labor_increase: 0,
    },
  });

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data]);

  function onClose() {
    form.reset();
    setIsOpen((prev) => !prev);
  }

  async function onSubmit(values: Inputs) {
    if (isEditing) {
      await updatePacking({ id: data.id, ...values }).unwrap();
      toast.success('Packing successfully updated');
    } else {
      await createPacking(values).unwrap();
      toast.success('Packing successfully added');
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
          <Button size="icon">
            <PlusIcon />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit' : 'Add'} packing service
          </DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="-mx-6 max-h-[calc(100vh-280px)] overflow-y-auto px-6 pb-4 space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                      <Textarea rows={16} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="labor_increase"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Labor increse (%)</FormLabel>
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
            </div>
            <DialogFooter>
              <DialogClose>Cancel</DialogClose>
              <LoadingButton
                type="submit"
                loading={isCreating || isUpdating}
                disabled={isCreating || isUpdating}
              >
                {isEditing ? 'Save changes' : 'Add packing'}
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
