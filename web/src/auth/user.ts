import { Menu } from "@/types/menu";
import { UserInfoCookie } from "@/types/user";
import type { NextRequest } from "next/server";

export function checkLoggedIn(request: NextRequest): boolean {
  const userEmailCookie = request.cookies.get("user-email");
  if (!userEmailCookie) return false;
  return Boolean(userEmailCookie?.value) ?? false;
}

export function checkMenuPermission(request: NextRequest): boolean {
  const menuPermissionsJSON = request.cookies.get("menu-permissions")?.value;
  const menuPermissions = JSON.parse(menuPermissionsJSON ?? "[]");
  if (!menuPermissions || !Array.isArray(menuPermissions)) return false;

  const pathname = request.nextUrl.pathname;
  const hasPermission = menuPermissions.find(
    (menu: Menu) => menu.pathname === pathname
  );
  return Boolean(hasPermission) ?? false;
}

export function deleteLoggedInCookie() {
  const cookies = [
    "user-email",
    "user-id",
    "user-full-name",
    "user-role-id",
    "menu-permissions",
    "function-permissions",
  ];
  cookies.forEach((cookie) => {
    document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
}

export function getUserInfoCookie(): UserInfoCookie {
  const userInfoCookie: UserInfoCookie = {
    email: "",
    id: "",
    "full-name": "",
    "role-id": "",
  };

  if (!window || !window.document) return userInfoCookie;

  const cookies = document.cookie?.split("; ");

  cookies.forEach((cookie) => {
    const [name, value] = cookie.split("=");
    const nameParts = name.split("user-");
    userInfoCookie[nameParts[1] as keyof UserInfoCookie] = value;
  });

  return userInfoCookie;
}

export function setUserInfoCookie(userInfo: UserInfoCookie) {
  const cookies = Object.entries(userInfo);
  cookies.forEach(([key, value]) => {
    document.cookie = `user-${key}=${value}; path=/;`;
  });
}
