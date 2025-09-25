import { z } from "zod";

export const createCommentValidationSchema = () => {
  return z.object({
    comment: z.string("Comment is required.").min(1, "Comment is required."),
  });
};
