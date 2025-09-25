"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { createLoginValidationSchema } from "@/utils/validation-schema/auth-validation-schema";
import { AuthRenderArea } from "./AuthRenderArea";
import { LoginFormValues } from "@/utils/validation-types/validation-types";
import SubmitButton from "../generic/SubmitButton";
import AuthTitleAndSubtitle from "./AuthTitleAndSubtitle";
import { logIn } from "@/actions/AuthApiActions";

export function Login() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const LoginValidationSchema = createLoginValidationSchema();
  const form = useForm<z.infer<typeof LoginValidationSchema>>({
    resolver: zodResolver(LoginValidationSchema),
    mode: "onTouched",
    defaultValues: {
      email: "zack@gmail.com",
      password: "11111111",
    },
  });

  async function onSubmit(data: z.infer<typeof LoginValidationSchema>) {
    startTransition(async () => {
      const { email, password } = data;

      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      try {
        const result = await logIn(formData);
        if (result.success) {
          toast.success("SUCCESS", {
            description: "Login successfully",
          });
          // Manually handle redirect after successful login
          router.push("/"); // or your desired route
          router.refresh();
          location.reload();
        } else {
          toast.error("Error", {
            description: result.error || "Login Failed",
          });
        }
      } catch (error) {
        console.log(error);
        toast.error("Error", {
          description: error instanceof Error ? error.message : "Login failed",
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="space-y-4 border shadow p-4 rounded-xl">
          <AuthTitleAndSubtitle
            title="Welcome back"
            subtitle="Enter your credentials to access your account."
          />
          <AuthRenderArea<LoginFormValues> form={form} />
          <SubmitButton isPending={isPending} fullWidth text="Sign in" />
        </div>
      </form>
    </Form>
  );
}
