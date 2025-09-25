"use client";

import Link from "next/link";
import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { HomeIcon, UserIcon } from "lucide-react";

const components: {
  title: string;
  href: string;
  icon: React.ReactNode;
  variant:
    | "default"
    | "secondary"
    | "link"
    | "destructive"
    | "outline"
    | "ghost"
    | null
    | undefined;
}[] = [
  {
    title: "Home",
    href: "/",
    icon: <HomeIcon />,
    variant: "default",
  },
  {
    title: "Profile",
    href: "/profile",
    icon: <UserIcon />,
    variant: "secondary",
  },
];

export function NavMenus() {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList className="space-x-2">
        {components.map((nav) => (
          <NavigationMenuItem key={nav.title}>
            <Link href={nav.href}>
              <Button variant={nav.variant} className="cursor-pointer">
                {nav.icon}
                <span className="hidden sm:block">{nav.title}</span>
              </Button>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
