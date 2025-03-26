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
import { useCreateEntranceTypeMutation } from '@/services/entrance-types-api';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(5),
  form_name: z.string().min(1),
});

type Inputs = z.infer<typeof formSchema>;

export default function EntranceTypeForm() {
  const [createEntranceType, { isLoading: isCreating }] =
    useCreateEntranceTypeMutation();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const form = useForm<Inputs>({
    defaultValues: {
      name: '',
      form_name: '',
    },
  });

  function onClose() {
    form.reset();
    setIsOpen((prev) => !prev);
  }

  async function onSubmit(values: Inputs) {
    await createEntranceType(values).unwrap();
    toast.success(`${values.name} successfully added`);
    form.reset();
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild className="ml-auto">
        <Button>Add stairs</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add stairs</DialogTitle>
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
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="form_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Form name</FormLabel>
                  <FormControl>
                    <Input placeholder="Form name" {...field} />
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
