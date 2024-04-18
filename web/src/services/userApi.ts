import {
  User,
  UserDeletedResponse,
  UserInfoLogin,
  UserListResponse,
  UserLoginResponse,
  UserRegisterResponse,
  UserResponse,
  UserUpdateInfoRequest,
  UserUpdatePasswordRequest,
  UserUpdateResponse,
  UserUpdateRoleRequest,
} from "@/types/user";
import axiosClient from "./axiosClient";

const group = "users";

export async function getUserList(
  params: URLSearchParams
): Promise<UserListResponse> {
  const url = `${group}`;
  return axiosClient.get(url, { params });
}

export function findUser(id: string): Promise<UserResponse> {
  const url = `${group}/${id}`;
  return axiosClient.get(url);
}

export function register(data: User): Promise<UserRegisterResponse> {
  const url = `${group}/register`;
  return axiosClient.post(url, data);
}

export function login(data: UserInfoLogin): Promise<UserLoginResponse> {
  const url = `${group}/login`;
  return axiosClient.post(url, data);
}

export function updatePasswordById(
  id: string,
  data: UserUpdatePasswordRequest
): Promise<UserUpdateResponse> {
  const url = `${group}/${id}/updatePasswordById`;
  return axiosClient.put(url, data);
}

export function updateRoleById(
  id: string,
  data: UserUpdateRoleRequest
): Promise<UserUpdateResponse> {
  const url = `${group}/${id}/updateRoleById`;
  return axiosClient.put(url, data);
}

export function updateInfoById(
  id: string,
  data: UserUpdateInfoRequest
): Promise<UserUpdateResponse> {
  const url = `${group}/${id}/updateInfoById`;
  return axiosClient.put(url, data);
}

export function deleteUser(id: string): Promise<UserDeletedResponse> {
  const url = `${group}/${id}`;
  return axiosClient.delete(url);
}
