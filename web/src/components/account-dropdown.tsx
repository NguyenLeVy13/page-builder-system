"use client";
import { useRouter } from "next/navigation";

import { CircleUser } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { deleteLoggedInCookie, getUserInfoCookie } from "@/auth/user";
import { useMemo } from "react";

function AccountDropdown() {
  const router = useRouter();
  const userInfoCookie = useMemo(() => getUserInfoCookie(), []);

  function handleLogout() {
    deleteLoggedInCookie();
    router.push("/login");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{userInfoCookie['full-name']}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">Account</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AccountDropdown;
