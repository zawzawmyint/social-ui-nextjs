import { z } from "zod";

export const createPostValidationSchema = () => {
  return z.object({
    title: z
      .string("Title is required.")
      .min(2, { message: "Minimum 2 required" })
      .max(50, { message: "Maximum 50" }),
    content: z
      .string("Content is required")
      .min(20, { message: "Minimum 20 required." })
      .max(1000, "Content is 500 maximum"),
  });
};
