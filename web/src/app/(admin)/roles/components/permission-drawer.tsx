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
import {
  getRoleMenuList,
  getRoleFunctionList,
  registerRoleMenu,
  deregisterRoleMenu,
  registerRoleFunction,
  deregisterRoleFunction,
} from "@/services/permissionApi";

import { Menu } from "@/types/menu";
import { FuncType } from "@/types/function";
import { toast } from "sonner";

export type PermissionDrawerRef = {
  open: (role?: Role) => void;
  close: () => void;
};

type PermissionMenu = Menu & {
  checked?: boolean;
};

type PermissionFunction = FuncType & {
  checked?: boolean;
};

type Props = {};

function PermissionDrawer(props: Props, ref: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState<Role | null>(null);
  const [menuList, setMenuList] = useState<PermissionMenu[]>([]);
  const [functionList, setFunctionList] = useState<PermissionFunction[]>([]);

  const fetchPermissionMenuList = async (data: PermissionMenu[]) => {
    if (!role) return;

    const params = new URLSearchParams();
    params.append("searchType", "roleId");
    params.append("searchValue", role._id!);
    
    const res = await getRoleMenuList(params);
    if (res.code === 0) {
      const newMenuList = data.map((menu) => {
        menu.checked = res.data.find((i) => i.menuId === menu._id)
          ? true
          : false;
        return menu;
      });

      setMenuList(newMenuList);
    }
  };

  const fetchPermissionFunctionList = async (data: PermissionFunction[]) => {
    if (!role) return;

    const params = new URLSearchParams();
    params.append("searchType", "roleId");
    params.append("searchValue", role._id!);

    const res = await getRoleFunctionList(params);
    if (res.code === 0) {
      const newFuncList = data.map((func) => {
        func.checked = res.data.find((i) => i.functionId === func._id)
          ? true
          : false;
        return func;
      });

      setFunctionList(newFuncList);
    }
  };

  useEffect(() => {
    ~(async () => {
      const [fetchMenuListRes, fetchFunctionListRes] = await Promise.all([
        fetchMenuList(),
        fetchFunctionList(),
      ]);
      if (fetchMenuListRes.code === 0) {
        fetchPermissionMenuList(fetchMenuListRes.data);
        setMenuList(fetchMenuListRes.data);
      }
      if (fetchFunctionListRes.code === 0) {
        fetchPermissionFunctionList(fetchFunctionListRes.data);
        setFunctionList(fetchFunctionListRes.data);
      }
    })();
  }, [role]);

  function close() {
    setIsOpen(false);
  }

  async function fetchMenuList() {
    const params = new URLSearchParams();
    const res = await getMenuList(params);
    return res;
  }

  async function fetchFunctionList() {
    const params = new URLSearchParams();
    const res = await getFunctionList(params);
    return res;
  }

  async function handleTogglePermissionMenu(menuId: string, checked: boolean) {
    if (checked) {
      const res = await registerRoleMenu({ roleId: role!._id!, menuId });
      if (res.code === 0) {
        toast.success("Permission register successfully.");
        setMenuList((prev) =>
          prev.map((i) => {
            if (i._id === menuId) {
              i.checked = true;
            }
            return i;
          })
        );
      } else {
        toast.error(res.message);
      }
    } else {
      const res = await deregisterRoleMenu({ roleId: role!._id!, menuId });
      if (res.code === 0) {
        toast.success("Permission deregister successfully.");
        setMenuList((prev) =>
          prev.map((i) => {
            if (i._id === menuId) {
              i.checked = false;
            }
            return i;
          })
        );
      } else {
        toast.error(res.message);
      }
    }
  }

  async function handleTogglePermissionFunction(
    functionId: string,
    checked: boolean
  ) {
    if (checked) {
      const res = await registerRoleFunction({
        roleId: role!._id!,
        functionId,
      });
      if (res.code === 0) {
        toast.success("Permission register successfully.");
        setFunctionList((prev) =>
          prev.map((i) => {
            if (i._id === functionId) {
              i.checked = true;
            }
            return i;
          })
        );
      } else {
        toast.error(res.message);
      }
    } else {
      const res = await deregisterRoleFunction({
        roleId: role!._id!,
        functionId,
      });
      if (res.code === 0) {
        toast.success("Permission deregister successfully.");
        setFunctionList((prev) =>
          prev.map((i) => {
            if (i._id === functionId) {
              i.checked = false;
            }
            return i;
          })
        );
      } else {
        toast.error(res.message);
      }
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
                <div
                  key={i._id}
                  className="flex items-center space-x-2 mb-4 cursor-pointer"
                >
                  <Checkbox
                    id={i._id}
                    value={i._id}
                    checked={i.checked}
                    onCheckedChange={(checked: boolean) =>
                      handleTogglePermissionMenu(i._id!, checked)
                    }
                  />
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
                <div
                  key={i._id}
                  className="flex items-center space-x-2 mb-4 cursor-pointer"
                >
                  <Checkbox
                    id={i._id}
                    value={i._id}
                    checked={i.checked}
                    onCheckedChange={(checked: boolean) =>
                      handleTogglePermissionFunction(i._id!, checked)
                    }
                  />
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
