import { API_BASE_URL } from "@/config/config";
import { getSessionToken } from "@/utils/auth-utils";
import type {
  ApiResponse,
  Post,
} from "@/utils/types/definitations/definitations";

export type PostsResponse = ApiResponse<Post[]>;
export type PostResponse = ApiResponse<Post>;

export async function fetchAllPosts(): Promise<PostsResponse> {
  // Get the session token
  const token = await getSessionToken();

  // console.log("token", token);

  if (!token) {
    throw new Error("Unauthorized: No valid session found");
  }
  const endpoint = `/api/posts`;

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["posts"] },
      // cache: "force-cache",
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(
        `Failed to fetch posts: ${response.status} ${response.statusText}. Details: ${errorData}`
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Error fetching posts:", error);
    throw new Error("Error feching posts");
  }
}
