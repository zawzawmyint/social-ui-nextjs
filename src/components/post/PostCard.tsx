"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Post } from "@/utils/types/definitations/definitations";
import PostProfile from "./PostProfile";
import { Button } from "../ui/button";
import { Heart, MessageCircle } from "lucide-react";
import Comments from "./comment/Comments";
import { useState } from "react";
import PostActions from "./PostActions";
import { useSession } from "next-auth/react";

export function PostCard({ post }: { post: Post }) {
  const { data: session } = useSession();
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  return (
    <Card className="w-full shadow-lg hover:shadow-xl border p-4 gap-1 ">
      <CardHeader className="p-0">
        <PostProfile post={post} />
        {session?.user?.id === post.userId && <PostActions post={post} />}
      </CardHeader>
      <CardContent className="p-0 space-y-2">
        <p className="text-sm font-medium sr-only">{post.title} : </p>
        <p className="text-sm">{post.content}</p>
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="sm">
            <Heart /> {post.reactions.length}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCommentsOpen(!isCommentsOpen)}
          >
            <MessageCircle /> {post.comments.length}
          </Button>
        </div>
      </CardContent>
      <CardFooter className="px-0 mt-4">
        {isCommentsOpen && (
          <Comments postId={post.id} comments={post.comments} />
        )}
      </CardFooter>
    </Card>
  );
}
