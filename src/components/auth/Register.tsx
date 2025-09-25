"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { createRegisterValidationSchema } from "@/utils/validation-schema/auth-validation-schema";
import { registerNewUser } from "@/actions/AuthApiActions";
import { AuthRenderArea } from "./AuthRenderArea";
import {
  LoginFormValues,
  RegisterFormValues,
} from "@/utils/validation-types/validation-types";
import SubmitButton from "../generic/SubmitButton";
import AuthTitleAndSubtitle from "./AuthTitleAndSubtitle";

export function Register({
  setIsLogin,
}: {
  setIsLogin: (val: boolean) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const RegisterValidationSchema = createRegisterValidationSchema();
  const form = useForm<z.infer<typeof RegisterValidationSchema>>({
    resolver: zodResolver(RegisterValidationSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof RegisterValidationSchema>) {
    startTransition(async () => {
      const { name, email, password } = data;

      try {
        await registerNewUser(name, email, password);
        toast.success("SUCCESS", {
          description: "Signed up successfully",
        });
        setIsLogin(true);
      } catch (error) {
        console.log(error);
        toast.error("Error", {
          description:
            error instanceof Error ? error.message : "Registration failed",
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="space-y-4 border shadow p-4 rounded-xl">
          <AuthTitleAndSubtitle
            title="Create account"
            subtitle="Join our communit and start sharing."
          />
          <AuthRenderArea<RegisterFormValues> form={form} isRegister />
          <SubmitButton isPending={isPending} fullWidth text="Sign in" />
        </div>
      </form>
    </Form>
  );
}
