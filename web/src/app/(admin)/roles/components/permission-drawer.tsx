"use client";
import {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useCallback,
} from "react";

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
import { FuncType, FunctionListResponse } from "@/types/function";

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

  const fetchPermissionMenuList = useCallback(async (data: PermissionMenu[]) => {
    const params = new URLSearchParams();
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
  }, []);

  const fetchPermissionFunctionList = useCallback(async (data: PermissionFunction[]) => {
    const params = new URLSearchParams();
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
  }, []);

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
  }, []);

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
                <div
                  key={i._id}
                  className="flex items-center space-x-2 mb-4 cursor-pointer"
                >
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
