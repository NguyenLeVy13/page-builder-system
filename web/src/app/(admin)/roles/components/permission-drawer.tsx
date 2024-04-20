"use client";
import { forwardRef, useImperativeHandle, useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
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

import { getMenuList } from "@/services/menuApi";
import { getFunctionList } from "@/services/functionApi";
import { Menu } from "@/types/menu";
import { FuncType } from "@/types/function";

export type PermissionDrawerRef = {
  open: (role?: Role) => void;
  close: () => void;
};

type Props = {};

function PermissionDrawer(props: Props, ref: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState<Role | null>(null);
  const [menuList, setMenuList] = useState<Menu[]>([]);
  const [functionList, setFunctionList] = useState<FuncType[]>([]);

  useEffect(() => {
    fetchMenuList();
    fetchFunctionList();
  }, []);

  function close() {
    setIsOpen(false);
  }

  async function fetchMenuList() {
    const params = new URLSearchParams();
    const res = await getMenuList(params);
    if (res.code === 0) {
      setMenuList(res.data);
    }
  }

  async function fetchFunctionList() {
    const params = new URLSearchParams();
    const res = await getFunctionList(params);
    if (res.code === 0) {
      setFunctionList(res.data);
    }
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
              {menuList.map((i) => (
                <div key={i._id} className="flex items-center space-x-2 mb-4 cursor-pointer">
                  <Checkbox id={i._id} value={i._id} />
                  <label
                    htmlFor={i._id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {i.name}
                  </label>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="functions">
              {functionList.map((i) => (
                <div key={i._id} className="flex items-center space-x-2 mb-4 cursor-pointer">
                  <Checkbox id={i._id} value={i._id} />
                  <label
                    htmlFor={i._id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {i.name}
                  </label>
                </div>
              ))}
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
