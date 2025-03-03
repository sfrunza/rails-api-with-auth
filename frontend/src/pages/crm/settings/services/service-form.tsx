import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { useCreateServiceMutation } from "@/services/services-api";
import { LoadingButton } from "@/components/loading-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Service name must be at least 5 characters" }),
});

type Inputs = z.infer<typeof formSchema>;

export default function ServiceForm() {
  const [createService, { isLoading: isCreating }] = useCreateServiceMutation();

  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: Inputs) {
    await createService(values).unwrap();
    toast.success(`${values.name} successfully added`);
    form.reset();
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mb-4 flex gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Service name"
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton loading={isCreating} disabled={isCreating}>
            Add service
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
}
