import { auth } from "@/auth";
import BaseContainer from "@/components/global/BaseContainer";
import Posts from "@/components/post/Post";
import UserPosts from "@/components/user/UserPosts";
import UserProfileDetails from "@/components/user/UserProfileDetails";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Page() {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in");
  }
  return (
    <BaseContainer>
      <Suspense key={"user-profile-details"} fallback={<div>Loading....</div>}>
        <UserProfileDetails userId={session.user.id as string} />
      </Suspense>
      <h2 className="text-2xl font-bold mt-10">Your Posts</h2>
      <Suspense key={"user-posts"} fallback={<div>Loading....</div>}>
        <UserPosts userId={session.user.id as string} />
      </Suspense>
    </BaseContainer>
  );
}
