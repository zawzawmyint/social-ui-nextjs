import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import PostProfileImage from "./PostProfileImage";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { createCommentValidationSchema } from "@/utils/validation-schema/comment-validation-schema";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { addComment } from "@/actions/CommentApiActions";

const CommentAdd = ({ postId }: { postId: string }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const CommentFormValidationSchema = createCommentValidationSchema();
  const form = useForm<z.infer<typeof CommentFormValidationSchema>>({
    resolver: zodResolver(CommentFormValidationSchema),
    mode: "onChange",
    defaultValues: {
      comment: "",
    },
  });
  const onCommentAddSubmit = async (
    data: z.infer<typeof CommentFormValidationSchema>
  ) => {
    startTransition(async () => {
      const { comment } = data;

      if (!comment) {
        return;
      }

      const formData = new FormData();
      formData.append("content", comment);

      try {
        const result = await addComment(postId, formData);

        // check the result status
        // will throw exception if it is not success
        if (!result.success) {
          toast.error("ERROR", {
            description: result.message || "Failed to add comment",
          });
          return;
        }

        toast.success("SUCCESS", {
          description: "Comment added successfully.",
        });
        form.reset();
        router.refresh(); // This will trigger a refetch of tagged data
      } catch (error) {
        console.log(error);
        toast.error("ERROR", {
          description:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred",
        });
      }
    });
  };
  return (
    <div className="flex items-center gap-2">
      <PostProfileImage width={25} height={25} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onCommentAddSubmit)}
          className="flex items-center gap-2 w-full"
        >
          {/* comment render area  */}
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder={"Add a comment"}
                    {...field}
                    className=""
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <Button
            variant="default"
            size="icon"
            disabled={!form.formState.isValid || isPending}
          >
            <Send />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CommentAdd;
