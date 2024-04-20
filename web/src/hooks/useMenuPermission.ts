export default function useMenuPermission() {
  return {
    check(pathname: string) {
      const menuPermissionsJSON = document.cookie
        .split("; ")
        .find((row) => row.startsWith("menu-permissions="))
        ?.split("=")[1];
      const menuPermissions = JSON.parse(menuPermissionsJSON ?? "[]");
      if (!menuPermissions || !Array.isArray(menuPermissions)) return false;

      console.log(pathname);
      console.log(menuPermissions);

      const hasPermission = menuPermissions.find(
        (menu) => menu.pathname === pathname
      );
      return Boolean(hasPermission) ?? false;
    }
  }
}