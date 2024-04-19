"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Role } from "@/types/role";
import { forwardRef, useImperativeHandle, useState } from "react";

export type PermissionDrawerRef = {
  open: (role?: Role) => void;
  close: () => void;
};

type Props = {};

function PermissionDrawer(props: Props, ref: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState<Role | null>(null);

  function close() {
    setIsOpen(false);
  }

  useImperativeHandle(
    ref,
    () => ({
      open: (role?: Role) => {
        setRole(role || null);
        setIsOpen(true);
      },
      close,
    }),
    []
  );

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Permission: {role?.name || "Undefined"}</SheetTitle>
          <SheetDescription>
            Click on the permission to toggle it.
          </SheetDescription>
        </SheetHeader>
        <Separator className="mt-3" />

        {/* Sheet body */}
        <div className="mt-3">
          <Tabs defaultValue="menu" className="w-[400px]">
            <TabsList className="mb-2">
              <TabsTrigger value="menu">Menu</TabsTrigger>
              <TabsTrigger value="functions">Functions</TabsTrigger>
            </TabsList>
            <TabsContent value="menu">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Role menu
                </label>
              </div>
            </TabsContent>
            <TabsContent value="functions">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Role functions
                </label>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <SheetFooter className="mt-3">
          <SheetClose asChild>
            <Button type="submit">Done</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default forwardRef(PermissionDrawer);
