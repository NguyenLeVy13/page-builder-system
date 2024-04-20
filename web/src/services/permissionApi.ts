import axiosClient from "./axiosClient";

import type {
  RoleMenu,
  RoleMenuListResponse,
  RoleMenuRegistedResponse,
  RoleMenuDeregistedResponse,
} from "../types/role-menu";
import type {
  RoleFunction,
  RoleFunctionListResponse,
  RoleFunctionRegistedResponse,
  RoleFunctionDeregistedResponse,
} from "../types/role-function";

const menuGroup = "roleMenu";
const funcGroup = "roleFunctions";

export async function getRoleMenuList(
  params: URLSearchParams
): Promise<RoleMenuListResponse> {
  const url = `${menuGroup}`;
  return axiosClient.get(url, { params });
}

export function registerRoleMenu(data: RoleMenu): Promise<RoleMenuRegistedResponse> {
  const url = `${menuGroup}/register`;
  return axiosClient.post(url, data);
}

export function deregisterRoleMenu(data: RoleMenu): Promise<RoleMenuDeregistedResponse> {
  const url = `${menuGroup}/deregister`;
  return axiosClient.post(url, data);
}

export async function getRoleFunctionList(
  params: URLSearchParams
): Promise<RoleFunctionListResponse> {
  const url = `${funcGroup}`;
  return axiosClient.get(url, { params });
}

export function registerRoleFunction(data: RoleFunction): Promise<RoleFunctionRegistedResponse> {
  const url = `${funcGroup}/register`;
  return axiosClient.post(url, data);
}

export function deregisterRoleFunction(data: RoleFunction): Promise<RoleFunctionDeregistedResponse> {
  const url = `${funcGroup}/deregister`;
  return axiosClient.post(url, data);
}
