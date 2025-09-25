import { API_BASE_URL } from "@/config/config";
import { getSessionToken } from "@/utils/auth-utils";
import type {
  ApiResponse,
  Post,
  User,
} from "@/utils/types/definitations/definitations";

export type PostsResponse = ApiResponse<{ created: Post[] }>;

export async function fetchUserPosts(userId: string): Promise<PostsResponse> {
  // Get the session token
  const token = await getSessionToken();

  if (!token) {
    throw new Error("Unauthorized: No valid session found");
  }
  const endpoint = `/api/posts/user/${userId}`;

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["user-posts"] },
      // cache: "force-cache",
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(
        `Failed to fetch user posts: ${response.status} ${response.statusText}. Details: ${errorData}`
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Error fetching user posts:", error);
    throw new Error("Error feching user posts");
  }
}
export async function fetchUserDetails(userId: string): Promise<
  User & {
    _count: {
      posts: number;
      commentsOnPosts: number;
      reactionsOnPosts: number;
    };
  }
> {
  // Get the session token
  const token = await getSessionToken();

  if (!token) {
    throw new Error("Unauthorized: No valid session found");
  }
  const endpoint = `/api/auth/profile`;

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["user-posts"] },
      // cache: "force-cache",
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(
        `Failed to fetch user details: ${response.status} ${response.statusText}. Details: ${errorData}`
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Error fetching user details:", error);
    throw new Error("Error feching user details");
  }
}
