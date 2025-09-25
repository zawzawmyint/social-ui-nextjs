import React from "react";
import PostProfile from "../PostProfile";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Comment } from "@/utils/types/definitations/definitations";
import PostProfileImage from "./PostProfileImage";
import { formatDate } from "@/utils/helper";

const CommentCard = ({ comment }: { comment: Comment }) => {
  return (
    <div className="flex justify-center items-baseline gap-2">
      <div>
        <PostProfileImage width={25} height={25} />
      </div>
      <Card className="w-full p-3 gap-1 border shadow">
        <div className="flex items-center gap-2">
          <h4 className="text-xs font-bold">{comment.user.name}</h4>
          <p className="text-xs text-gray-500">
            {formatDate(comment.createdAt)}
          </p>
        </div>
        <p className="text-sm">{comment.content}</p>
      </Card>
    </div>
  );
};

export default CommentCard;
