"use client";

import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LogoutButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      // Use NextAuth's signOut directly
      await signOut({
        redirect: false, // Don't auto-redirect, handle it manually
      });
      // Manual redirect after successful logout
      router.push("/sign-in");
      router.refresh(); // Refresh to update server components
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleLogout}
      disabled={isLoading}
      className="text-destructive hover:text-destructive cursor-pointer"
    >
      <LogOutIcon color="red" />
      <span className="hidden sm:block">
        {isLoading ? "Logging out..." : "Logout"}
      </span>
    </Button>
  );
};

export default LogoutButton;
