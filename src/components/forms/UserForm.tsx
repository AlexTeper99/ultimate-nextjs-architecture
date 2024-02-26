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
import { UserType } from "@/lib/models/user.model";
import { useOptimistic } from "react";

interface Props {
  users: UserType[];
}

export const UserForm: React.FC<Props> = ({ users }) => {
  const [optimisticState, addOptimistic] = useOptimistic(
    users,
    (users, newUser: UserType) => {
      return [...users, newUser];
    }
  );

  // 1. Define your form.
  const form = useForm<z.infer<typeof UserValidationSchema>>({
    resolver: zodResolver(UserValidationSchema),
    defaultValues: UserFormDefaultValues,
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof UserValidationSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    addOptimistic({
      id: Math.random().toString(),
      username: values.username,
    });

    const res = await createUser(values.username);
    if (res !== "User created") {
      if (res.error === "Username already exists") {
        form.setError("username", {
          type: "manual",
          message: res.error,
        });
      } else {
        alert(res.error);
      }
    }
  }

  return (
    <>
      <Form {...form}>
        <form action={() => onSubmit(form.getValues())} className="space-y-8">
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

      <div className="pt-10">
        {optimisticState.map(({ username, id }) => (
          <h2 key={id}>{username}</h2>
        ))}
      </div>
    </>
  );
};
