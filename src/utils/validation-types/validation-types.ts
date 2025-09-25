import { z } from "zod";
import { createPostValidationSchema } from "../validation-schema/post-validation-schema";
import {
  createLoginValidationSchema,
  createRegisterValidationSchema,
} from "../validation-schema/auth-validation-schema";
// post
export type PostFormValues = z.infer<
  ReturnType<typeof createPostValidationSchema>
>;
export type LoginFormValues = z.infer<
  ReturnType<typeof createLoginValidationSchema>
>;
export type RegisterFormValues = z.infer<
  ReturnType<typeof createRegisterValidationSchema>
>;
