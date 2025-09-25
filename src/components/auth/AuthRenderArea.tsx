"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface AuthRenderAreaProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  isRegister?: boolean;
}
export function AuthRenderArea<T extends FieldValues>({
  form,
  isRegister = false,
}: AuthRenderAreaProps<T>) {
  return (
    <div className="space-y-6">
      {isRegister && (
        <FormField
          control={form.control}
          name={"name" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder={"Enter your name..."}
                  {...field}
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      <FormField
        control={form.control}
        name={"email" as Path<T>}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                placeholder={"Enter your email..."}
                {...field}
                autoComplete="off"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={"password" as Path<T>}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                placeholder={"Enter your password..."}
                type="password"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {isRegister && (
        <FormField
          control={form.control}
          name={"imageUrl" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Picture Url(optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder={"https://example.com/your-photo.png"}
                  {...field}
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
}
