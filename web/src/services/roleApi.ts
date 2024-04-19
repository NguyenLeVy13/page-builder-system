import axiosClient from "./axiosClient";
import type {
  Role,
  RoleCreatedResponse,
  RoleDeletedResponse,
  RoleListResponse,
  RoleResponse,
  RoleUpdatedResponse,
} from "../types/role";

const group = "roles";

export async function getRoleList(
  params: URLSearchParams
): Promise<RoleListResponse> {
  const url = `${group}`;
  return axiosClient.get(url, { params });
}

export function findRole(id: string): Promise<RoleResponse> {
  const url = `${group}/${id}`;
  return axiosClient.get(url);
}

export function createRole(
  data: Role
): Promise<RoleCreatedResponse> {
  const url = `${group}`;
  return axiosClient.post(url, data);
}

export function updateRole(
  id: string,
  data: Role
): Promise<RoleUpdatedResponse> {
  const url = `${group}/${id}`;
  return axiosClient.put(url, data);
}

export function deleteRole(id: string): Promise<RoleDeletedResponse> {
  const url = `${group}/${id}`;
  return axiosClient.delete(url);
}
