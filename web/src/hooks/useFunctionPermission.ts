export default function useFunctionPermission() {
  return {
    check(key: string) {
      const functionPermissionsJSON = document.cookie
        .split("; ")
        .find((row) => row.startsWith("function-permissions="))
        ?.split("=")[1];
      const functionPermissions = JSON.parse(functionPermissionsJSON ?? "[]");
      if (!functionPermissions || !Array.isArray(functionPermissions)) return false;

      const hasPermission = functionPermissions.find(
        (func) => func.key === key
      );
      return Boolean(hasPermission) ?? false;
    }
  }
}