"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import PostRenderArea from "./PostRenderArea";
import { Post } from "@/utils/types/definitations/definitations";
import { createPostValidationSchema } from "@/utils/validation-schema/post-validation-schema";
import { MedalIcon } from "lucide-react";
import DialogBtnWrapper from "../generic/DialogButtonWrapper";
import DialogCancelButton from "../generic/DialogCancelButton";
import SubmitButton from "../generic/SubmitButton";
import { logFormDataKeysValues } from "@/utils/helper";
import { updatePost } from "@/actions/PostApiActions";
const PostEdit = ({
  post,
  setIsOpenDialog,
}: {
  post: Post;
  setIsOpenDialog: (val: boolean) => void;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const PostFormValidationSchema = createPostValidationSchema();
  const form = useForm<z.infer<typeof PostFormValidationSchema>>({
    resolver: zodResolver(PostFormValidationSchema),
    mode: "onTouched",
    defaultValues: {
      title: post.title || "lorem lorem",
      content: post.content || "",
    },
  });

  const onPostEditSubmit = async (
    data: z.infer<typeof PostFormValidationSchema>
  ) => {
    startTransition(async () => {
      const { title, content } = data;

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content || "");

      logFormDataKeysValues(formData);

      try {
        const result = await updatePost(post.id, formData);

        // check the result status
        // will throw exception if it is not success
        if (!result.success) {
          toast.error("ERROR", {
            description: result.message || "Failed to update post",
          });
          return;
        }

        toast.success("SUCCESS", {
          description: "Post updated successfully.",
        });
        setIsOpenDialog(false);
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
    <Card className="border shadow gap-0">
      <CardHeader className="py-0">
        <CardTitle className="flex items-center gap-2 font-medium">
          <MedalIcon />
          Update your post
        </CardTitle>
      </CardHeader>
      <CardContent className="gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onPostEditSubmit)}>
            {/* post render area  */}
            <PostRenderArea form={form} />
            <DialogBtnWrapper>
              <DialogCancelButton />
              <SubmitButton isPending={isPending} />
            </DialogBtnWrapper>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PostEdit;
