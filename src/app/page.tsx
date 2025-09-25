import { auth } from "@/auth";
import BaseContainer from "@/components/global/BaseContainer";
import Posts from "@/components/post/Post";
import PostAdd from "@/components/post/PostAdd";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Page() {
  const session = await auth();

  // Add error handling and more specific checks
  if (!session || !session.user) {
    redirect("/sign-in");
  }

  return (
    <BaseContainer>
      <PostAdd />
      <Suspense key={"posts"} fallback={<div>Loading....</div>}>
        <Posts />
      </Suspense>
    </BaseContainer>
  );
}
