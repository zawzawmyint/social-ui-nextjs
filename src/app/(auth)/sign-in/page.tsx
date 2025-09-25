import { auth } from "@/auth";
import Auth from "@/components/auth/Auth";
import Logo from "@/components/generic/Logo";
import BaseContainer from "@/components/global/BaseContainer";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  // Add error handling and more specific checks
  if (session && session.user) {
    redirect("/");
  }
  return (
    <div className="bg-gradient-to-bl from-white to-fuchsia-700 min-h-screen">
      <BaseContainer>
        <div className="max-w-md mx-auto mt-20 ">
          <div className="grid place-items-center">
            <Logo />
          </div>
          <h1 className="text-sm font-medium mb-5 mt-2 text-center">
            Connect with friends and share moments
          </h1>
          <Auth />
        </div>
      </BaseContainer>
    </div>
  );
};

export default Page;
