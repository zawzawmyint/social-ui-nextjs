import { fetchAllPosts } from "@/services/post/postEndpoints";
import React from "react";
import { PostCard } from "./PostCard";
import { Post } from "@/utils/types/definitations/definitations";
import { fetchUserPosts } from "@/services/user/userEndpoints";

const Posts = async () => {
  const res = await fetchAllPosts();
  return (
    <div className="space-y-4">
      {res.data.map((item) => (
        <PostCard key={item.id} post={item} />
      ))}
      {res.data.length === 0 && (
        <div className="text-lg font-medium text-destructive">
          {"No posts found. ;("}
        </div>
      )}
    </div>
  );
};

export default Posts;
