"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

export function StudentNavbar() {
  return (
    <NavigationMenu viewport={false} className="flex justify-between w-screen">
      <p className="text-black text-2xl">QRity</p>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/student/dashboard/courses">Courses</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Button
            onClick={() => signOut({ callbackUrl: "/" })}
            // variant="destructive"
            
          >
            <LogOut/>
            Log Out
          </Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

