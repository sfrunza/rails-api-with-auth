import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { LoadingButton } from '@/components/loading-button';
import { SelectDropdown } from '@/components/select-dropdown';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { cn, formatPhone } from '@/lib/utils';
import {
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
} from '@/services/employees-api';
import { type User } from '@/types/user';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { toast } from 'sonner';
import { PhoneInput } from '@/components/ui/phone-input';
import { Separator } from '@/components/ui/separator';

export const userRoles = [
  {
    label: 'Admin',
    value: 'admin',
  },
  {
    label: 'Manager',
    value: 'manager',
  },
  {
    label: 'Foreman',
    value: 'foreman',
  },
  {
    label: 'Driver',
    value: 'driver',
  },
  {
    label: 'Helper',
    value: 'helper',
  },
] as const;

const formSchema = z.object({
  first_name: z.string().min(2, {
    message: 'First name must be at least 2 characters.',
  }),
  last_name: z.string().min(2, {
    message: 'Last name must be at least 2 characters.',
  }),
  email_address: z.string().email({
    message: 'Invalid email address.',
  }),
  phone: z
    .string()
    .refine((phoneNumber) => isValidPhoneNumber(phoneNumber, 'US'), {
      message: 'Invalid phone number',
    }),
  active: z.boolean().optional(),
  role: z.string().optional(),
  password: z.string().optional(),
});

type Inputs = z.infer<typeof formSchema>;

export function ProfileForm({
  user,
  callback,
}: {
  user?: User | null;
  callback?: () => void;
}) {
  const [updateEmployee, { isLoading }] = useUpdateEmployeeMutation();
  const [createEmployee, { isLoading: isCreating }] =
    useCreateEmployeeMutation();

  const form = useForm<Inputs>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: user?.first_name ?? '',
      last_name: user?.last_name ?? '',
      email_address: user?.email_address ?? '',
      phone: user?.phone ?? '',
      role: user?.role ?? 'helper',
      active: user?.active ?? true,
      password: '',
    },
  });

  async function onSubmit(values: Inputs) {
    if (user) {
      const newData = await updateEmployee({
        id: user?.id ?? 0,
        data: values,
      }).unwrap();

      if (newData) {
        toast.success(`${newData.first_name} updated successfully`);
        form.reset({ ...newData, password: '' });
      }
    } else {
      const newData = await createEmployee({
        data: values,
      }).unwrap();

      if (newData) {
        toast.success(`${newData.first_name} created successfully`);
        form.reset({ ...newData, password: '' });
        if (callback) {
          callback();
        }
      }
    }
  }

  console.log(form.formState.errors);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                <FormLabel className="col-span-2">First Name</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="off" className="col-span-4" />
                </FormControl>
                <FormMessage className="col-span-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                <FormLabel className="col-span-2">Last Name</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="off" className="col-span-4" />
                </FormControl>
                <FormMessage className="col-span-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email_address"
            render={({ field }) => (
              <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                <FormLabel className="col-span-2">Email</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="off" className="col-span-4" />
                </FormControl>
                <FormMessage className="col-span-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                <FormLabel className="col-span-2">Phone</FormLabel>
                <FormControl>
                  <PhoneInput
                    {...field}
                    value={formatPhone(field.value ?? '')}
                    handleValueChange={field.onChange}
                    className="col-span-4"
                  />
                </FormControl>
                <FormMessage className="col-span-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                <FormLabel className="col-span-2">Position</FormLabel>
                <SelectDropdown
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                  placeholder="Select a role"
                  className="col-span-4 w-full"
                  items={userRoles.map(({ label, value }) => ({
                    label,
                    value,
                  }))}
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                <FormLabel className="col-span-2">Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="off"
                    type="password"
                    className="col-span-4"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Employee is active
                  </FormLabel>
                  <FormDescription>
                    If the employee is active, they will be able to login to the
                    system.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Separator />
        <div
          className={cn('flex transition-opacity duration-500 sm:justify-end', {
            'invisible opacity-0': !form.formState.isDirty,
            'visible opacity-100': form.formState.isDirty,
          })}
        >
          <div className="flex min-h-9 w-full gap-4 sm:w-auto">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => form.reset()}
            >
              Cancel
            </Button>
            <LoadingButton
              type="submit"
              className="w-full sm:w-auto"
              disabled={isLoading || isCreating}
              loading={isLoading || isCreating}
            >
              Save changes
            </LoadingButton>
          </div>
        </div>
      </form>
    </Form>
  );
}
