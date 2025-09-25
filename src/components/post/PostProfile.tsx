import Image from "next/image";
import React from "react";
import PostProfileImage from "./comment/PostProfileImage";
import { Post } from "@/utils/types/definitations/definitations";
import { formatDate } from "@/utils/helper";

const PostProfile = ({ post }: { post: Post }) => {
  return (
    <div className="flex items-center gap-2">
      <PostProfileImage />
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">{post.user?.name || "Zack"}</p>
        <p className="text-xs text-gray-500">{formatDate(post.createdAt)}</p>
      </div>
    </div>
  );
};

export default PostProfile;
