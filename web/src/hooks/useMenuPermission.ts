import { MenuPermission } from "@/types/permission";
import { useState, useEffect } from "react";

export default function useMenuPermission() {
  const [menuPermissions, setMenuPermissions] = useState<MenuPermission[]>([]);

  function getMenuPermissions() {
    const menuPermissionsJSON = document.cookie
      .split("; ")
      .find((row) => row.startsWith("menu-permissions="))
      ?.split("=")[1];
    setMenuPermissions(JSON.parse(menuPermissionsJSON ?? "[]"));
  }

  useEffect(() => {
    getMenuPermissions();
  }, [])

  return {
    check(pathname: string) {
      const hasPermission = menuPermissions.find(
        (menu) => menu.pathname === pathname || pathname.includes(menu.pathname)
      );
      return Boolean(hasPermission) ?? false;
    }
  }
}