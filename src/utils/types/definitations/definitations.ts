export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
export interface Post {
  id: string;
  userId: string;
  title: string;
  content: string;
  image?: any;
  createdAt: string;
  updatedAt: string;
  user: User;
  comments: Comment[];
  reactions: Reaction[];
}

export interface Reaction {
  id: string;
  type: string;
  postId: string;
  userId: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  postId: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}
