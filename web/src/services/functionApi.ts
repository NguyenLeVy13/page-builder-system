import axiosClient from "./axiosClient";
import type {
  Function,
  FunctionCreatedResponse,
  FunctionDeletedResponse,
  FunctionListResponse,
  FunctionResponse,
  FunctionUpdatedResponse,
} from "../types/function";

const group = "functions";

export async function getFunctionList(
  params: URLSearchParams
): Promise<FunctionListResponse> {
  const url = `${group}`;
  return axiosClient.get(url, { params });
}

export function findFunction(id: string): Promise<FunctionResponse> {
  const url = `${group}/${id}`;
  return axiosClient.get(url);
}

export function createFunction(
  data: Function
): Promise<FunctionCreatedResponse> {
  const url = `${group}`;
  return axiosClient.post(url, data);
}

export function updateFunction(
  id: string,
  data: Function
): Promise<FunctionUpdatedResponse> {
  const url = `${group}/${id}`;
  return axiosClient.put(url, data);
}

export function deleteFunction(id: string): Promise<FunctionDeletedResponse> {
  const url = `${group}/${id}`;
  return axiosClient.delete(url);
}
