"use client";

import {
  UserFormDefaultValues,
  UserValidationSchema,
} from "@/lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createUser } from "@/lib/actions/user.actions";
import { revalidatePath } from "next/cache";

export function UserForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserValidationSchema>>({
    resolver: zodResolver(UserValidationSchema),
    defaultValues: UserFormDefaultValues,
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof UserValidationSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const res = await createUser(values.username);
    if (res !== "User created") {
      form.setError("username", {
        type: "manual",
        message: res,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
