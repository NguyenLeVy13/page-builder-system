import { FunctionPermission } from "@/types/permission";
import { useState, useEffect } from "react";

export default function useFunctionPermission() {
  const [funcPermissions, setFuncPermissions] = useState<FunctionPermission[]>([]);

  function getFuncPermissions() {
    const funcPermissionsJSON = document.cookie
      .split("; ")
      .find((row) => row.startsWith("function-permissions="))
      ?.split("=")[1];
    setFuncPermissions(JSON.parse(funcPermissionsJSON ?? "[]"));
  }

  useEffect(() => {
    getFuncPermissions();
  }, [])

  return {
    check(key: string) {
      const hasPermission = funcPermissions.find(
        (menu) => menu.key === key
      );
      return Boolean(hasPermission) ?? false;
    }
  }
}