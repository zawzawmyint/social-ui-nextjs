import { fetchAllPosts } from "@/services/post/postEndpoints";
import React from "react";
import { PostCard } from "../post/PostCard";
import { Post } from "@/utils/types/definitations/definitations";
import { fetchUserPosts } from "@/services/user/userEndpoints";
import Link from "next/link";

const UserPosts = async ({ userId }: { userId: string }) => {
  const res = await fetchUserPosts(userId);
  return (
    <div className="space-y-4">
      {res.data?.created?.map((item) => (
        <PostCard key={item.id} post={item} />
      ))}
      {res.data?.created?.length === 0 && (
        <div className="text-lg font-medium">
          {"No posts here."}
          <Link href={"/"} className="text-sm underline ml-2 text-gray-500">
            Share your thoughts
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserPosts;
