"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTransition, useState } from "react";
import { Post } from "@/utils/types/definitations/definitations";
import { deletePost } from "@/actions/PostApiActions";
import AddEditItemDialog from "../generic/AddEditDialog";
import PostEdit from "./PostEdit";
import { CardAction } from "../ui/card";
import { CardActionDelete } from "../generic/CardActionDelete";

const PostActions = ({
  post,
  isDetails = false,
}: {
  post: Post;
  isDetails?: boolean;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      try {
        const result = await deletePost(post.id);
        // check the result status
        // will throw exception if it is not success
        if (!result.success) {
          toast.error("ERROR", {
            description: "Failed to delete post.",
          });
          return;
        }
        toast.success("SUCCESS", {
          description: "Post deleted successfully.",
        });
        if (isDetails) {
          router.push("/posts");
        } else {
          router.refresh();
        }
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
    <CardAction className="flex items-center gap-1 flex-wrap">
      <AddEditItemDialog isOpenDialog={open} setIsOpenDialog={setOpen} isEdit>
        <PostEdit post={post} setIsOpenDialog={setOpen} />
      </AddEditItemDialog>
      <CardActionDelete handleDelete={handleDelete} isPending={isPending} />
    </CardAction>
  );
};

export default PostActions;
