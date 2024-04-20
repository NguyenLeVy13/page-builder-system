"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Package2 } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import {
  DesktopIcon,
  StackIcon,
  TokensIcon,
  ComponentBooleanIcon,
  LightningBoltIcon,
  MixIcon,
  MagicWandIcon,
  PersonIcon,
} from "@radix-ui/react-icons";

import useMenuPermission from "@/hooks/useMenuPermission";

const menuItems: { name: string; path: string; icon: any }[] = [
  { name: "Dashboard", path: "/dashboard", icon: <DesktopIcon /> },
  { name: "Templates", path: "/templates", icon: <StackIcon /> },
  { name: "Blocks", path: "/blocks", icon: <MixIcon /> },
  { name: "Builder", path: "/builder/new/blank", icon: <ComponentBooleanIcon /> },
  { name: "Roles", path: "/roles", icon: <LightningBoltIcon /> },
  { name: "Menu", path: "/menu", icon: <TokensIcon /> },
  { name: "Functions", path: "/functions", icon: <MagicWandIcon /> },
  { name: "Users", path: "/users", icon: <PersonIcon /> },
];

function Navigation() {
  const pathname = usePathname();
  const menuPermission = useMenuPermission();

  return (
    <>
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        {menuItems.filter(i => menuPermission.check(i.path)).map((i) => (
          <Link
            key={i.path}
            href={i.path}
            className={`transition-colors hover:text-foreground flex items-center ${
              pathname === i.path ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            <span className="me-1">{i.icon}</span>
            {i.name}
          </Link>
        ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            {menuItems.filter(i => menuPermission.check(i.path)).map((i) => (
              <Link
                key={i.path}
                href={i.path}
                className={`transition-colors hover:text-foreground ${
                  pathname === i.path
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {i.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default Navigation;
