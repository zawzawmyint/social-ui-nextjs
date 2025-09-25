import React from "react";
import CommentCard from "./CommentCard";
import { Comment } from "@/utils/types/definitations/definitations";
import CommentAdd from "./CommentAdd";

const Comments = ({
  postId,
  comments,
}: {
  postId: string;
  comments: Comment[];
}) => {
  return (
    <div className="w-full space-y-4">
      <CommentAdd postId={postId} />
      <div className="h-full max-h-40 overflow-y-auto no-scrollbar scroll-smooth space-y-2">
        {comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
