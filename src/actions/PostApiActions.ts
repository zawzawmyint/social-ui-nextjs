"use server";

import { API_BASE_URL } from "@/config/config";
import { PostResponse } from "@/services/post/postEndpoints";
import { getSessionToken } from "@/utils/auth-utils";
import { revalidateTag } from "next/cache";

export async function addPost(formData: FormData): Promise<PostResponse> {
  // Get the session token
  const token = await getSessionToken();

  if (!token) {
    throw new Error("Unauthorized: No valid session found");
  }

  const endpoint = "/api/posts";
  // console.log(endpoint);

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
      errorData.message || `Failed to add post: ${response.statusText}`
    );
  }

  const data = await response.json();

  revalidateTag("posts");
  revalidateTag(`user-posts`);
  return data;
}
export async function updatePost(
  id: string,
  formData: FormData
): Promise<PostResponse> {
  // Get the session token
  const token = await getSessionToken();

  if (!token) {
    throw new Error("Unauthorized: No valid session found");
  }

  const endpoint = `/api/posts/${id}`;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `Failed to update post: ${response.statusText}`
    );
  }

  const data = await response.json();

  revalidateTag("posts");
  revalidateTag(`user-posts`);
  return data;
}

export async function deletePost(id: string): Promise<PostResponse> {
  // Get the session token
  const token = await getSessionToken();

  if (!token) {
    throw new Error("Unauthorized: No valid session found");
  }

  const endpoint = `/api/posts/${id}`;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `Failed to delete post: ${response.statusText}`
    );
  }

  const data = await response.json();
  revalidateTag("posts");
  revalidateTag(`user-posts`);
  return data;
}
