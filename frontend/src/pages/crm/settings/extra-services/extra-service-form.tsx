import { useState } from 'react';
import { useForm } from 'react-hook-form';
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
import { useCreateExtraServiceMutation } from '@/services/extra-services-api';
import { toast } from 'sonner';
import { PlusIcon } from 'lucide-react';
import { PriceInput } from '@/components/ui/price-input';
// import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  name: z.string().min(5),
  price: z.number().min(1),
  enabled: z.boolean(),
});

type Inputs = z.infer<typeof formSchema>;

export default function ExtraServiceForm() {
  const [createExtraService, { isLoading: isCreating }] =
    useCreateExtraServiceMutation();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const form = useForm<Inputs>({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      price: 0,
      enabled: true,
    },
  });

  function onClose() {
    form.reset();
    setIsOpen((prev) => !prev);
  }

  async function onSubmit(values: Inputs) {
    await createExtraService(values).unwrap();
    toast.success(`${values.name} successfully added`);
    form.reset();
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild className="ml-auto">
        <Button size="icon">
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add extra service</DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Service name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <PriceInput
                      name="price"
                      value={field.value}
                      onValueChange={(val) => {
                        form.setValue('price', val);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose>Cancel</DialogClose>
              <LoadingButton
                type="submit"
                loading={isCreating}
                disabled={isCreating}
              >
                Add service
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
