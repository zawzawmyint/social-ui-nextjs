"use server";

import { API_BASE_URL } from "@/config/config";
import { PostResponse } from "@/services/post/postEndpoints";
import { getSessionToken } from "@/utils/auth-utils";
import { revalidateTag } from "next/cache";

export async function addComment(
  postId: string,
  formData: FormData
): Promise<PostResponse> {
  // Get the session token
  const token = await getSessionToken();

  // console.log("addComment token", token);

  // console.log("addComment", postId, formData.get("content"));
  if (!token) {
    throw new Error("Unauthorized: No valid session found");
  }

  const endpoint = `/api/posts/${postId}/comments`;
  console.log(endpoint);

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `Failed to add comment: ${response.statusText}`
    );
  }

  const data = await response.json();

  revalidateTag("posts");
  revalidateTag(`user-posts`);
  return data;
}
