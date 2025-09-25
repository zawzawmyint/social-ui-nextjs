"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { createPostValidationSchema } from "@/utils/validation-schema/post-validation-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import PostRenderArea from "./PostRenderArea";
import { Button } from "../ui/button";
import {
  GalleryHorizontal,
  GalleryThumbnails,
  Image,
  LoaderCircle,
  MedalIcon,
  Podcast,
  Video,
} from "lucide-react";
import { addPost } from "@/actions/PostApiActions";
import { logFormDataKeysValues } from "@/utils/helper";

const PostAdd = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const PostFormValidationSchema = createPostValidationSchema();
  const form = useForm<z.infer<typeof PostFormValidationSchema>>({
    resolver: zodResolver(PostFormValidationSchema),
    mode: "onChange",
    defaultValues: {
      title: "Lorem ipsum dolor sit amet",
      content: "",
    },
  });

  const onPostAddSubmit = async (
    data: z.infer<typeof PostFormValidationSchema>
  ) => {
    startTransition(async () => {
      const { title, content } = data;

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content || "");

      logFormDataKeysValues(formData);

      try {
        const result = await addPost(formData);

        // check the result status
        // will throw exception if it is not success
        if (!result.success) {
          toast.error("ERROR", {
            description: result.message || "Failed to add post",
          });
          return;
        }

        toast.success("SUCCESS", {
          description: "Post added successfully.",
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
    <Card className="border shadow gap-0">
      <CardHeader className="py-0">
        <CardTitle className="flex items-center gap-2 font-medium">
          <MedalIcon />
          Create a post
        </CardTitle>
      </CardHeader>
      <CardContent className="gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onPostAddSubmit)}>
            {/* post render area  */}
            <PostRenderArea form={form} />
            <div className="mt-3">
              <Button
                type="submit"
                disabled={!form.formState.isValid || isPending}
                className="w-full"
              >
                {isPending ? (
                  <span className="flex items-center gap-4">
                    <LoaderCircle className="animate-spin" /> {"Submitting..."}
                  </span>
                ) : (
                  "Share Post"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PostAdd;
