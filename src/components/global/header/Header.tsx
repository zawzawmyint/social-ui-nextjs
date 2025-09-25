import Logo from "@/components/generic/Logo";
import React, { Suspense } from "react";
import ProfileBtn from "@/components/user/ProfileBtn";
import { NavMenus } from "./NavMenus";
import { auth } from "@/auth";
import LogoutButton from "@/components/auth/LogoutButton";

const Header = async () => {
  const session = await auth();

  // Don't redirect here - let the page components handle auth redirects
  if (!session || !session.user) {
    return null; // or return a minimal header for unauthenticated state
  }

  return (
    <div className="sticky top-0 left-0 z-50 shadow-md p-2 bg-background">
      <nav className="flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center gap-4">
          <Logo />
          <NavMenus />
        </div>
        <div className="flex items-center">
          <ProfileBtn name={session?.user?.name as string} />
          <Suspense fallback={<div>...</div>}>
            <LogoutButton />
          </Suspense>
        </div>
      </nav>
    </div>
  );
};

export default Header;
