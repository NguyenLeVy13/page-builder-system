import axiosClient from "./axiosClient";
import type {
  Menu,
  MenuCreatedResponse,
  MenuDeletedResponse,
  MenuListResponse,
  MenuResponse,
  MenuUpdatedResponse,
} from "../types/menu";

const group = "menu";

export async function getMenuList(
  params: URLSearchParams
): Promise<MenuListResponse> {
  const url = `${group}`;
  return axiosClient.get(url, { params });
}

export function findMenu(id: string): Promise<MenuResponse> {
  const url = `${group}/${id}`;
  return axiosClient.get(url);
}

export function createMenu(
  data: Menu
): Promise<MenuCreatedResponse> {
  const url = `${group}`;
  return axiosClient.post(url, data);
}

export function updateMenu(
  id: string,
  data: Menu
): Promise<MenuUpdatedResponse> {
  const url = `${group}/${id}`;
  return axiosClient.put(url, data);
}

export function deleteMenu(id: string): Promise<MenuDeletedResponse> {
  const url = `${group}/${id}`;
  return axiosClient.delete(url);
}
