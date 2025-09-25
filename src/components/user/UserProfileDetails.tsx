import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { fetchUserDetails } from "@/services/user/userEndpoints";
import PostProfileImage from "../post/comment/PostProfileImage";

const UserProfileDetails = async ({ userId }: { userId: string }) => {
  const user = await fetchUserDetails(userId);
  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-bold">Profile</h2>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <PostProfileImage width={100} height={100} />
          <div className="space-y-1">
            <p className="text-gray-600 text-lg font-bold">
              {user?.name || "User Profile Details"}
            </p>
            <p className="text-gray-600 text-sm">
              {user?.email || "User email"}
            </p>
            <div className="flex items-center gap-4 mt-5">
              <p className="text-gray-600 text-sm flex flex-col items-center">
                {user?._count?.posts || "0"}{" "}
                <span className="text-xs">posts</span>
              </p>
              <p className="text-gray-600 text-sm flex flex-col items-center">
                {user?._count?.reactionsOnPosts || "0"}{" "}
                <span className="text-xs">likes</span>
              </p>
              <p className="text-gray-600 text-sm flex flex-col items-center">
                {user?._count?.commentsOnPosts || "0"}{" "}
                <span className="text-xs">comments</span>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileDetails;
