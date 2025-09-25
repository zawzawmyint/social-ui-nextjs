import { z } from "zod";

export const passwordSchema = () => {
  return z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" });
};
export const createLoginValidationSchema = () => {
  return z.object({
    email: z.email({ message: "Please enter a valid email address" }),
    password: passwordSchema(),
  });
};
export const createRegisterValidationSchema = () => {
  return z.object({
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .min(4, { message: "Name must be at least 4 characters long" })
      .max(20, { message: "Name cannot exceed 20 characters" }),
    email: z.email({ message: "Please enter a valid email address" }),
    password: passwordSchema(),
    imageUrl: z.string().optional(),
  });
};
