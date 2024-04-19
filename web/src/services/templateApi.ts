import axiosClient from "./axiosClient";
import type {
  Template,
  TemplateCreatedResponse,
  TemplateDeletedResponse,
  TemplateListResponse,
  TemplateResponse,
  TemplateUpdatedResponse,
} from "../types/template";

const group = "templates";

export async function getTemplateList(
  params: URLSearchParams
): Promise<TemplateListResponse> {
  const url = `${group}`;
  return axiosClient.get(url, { params });
}

export function findTemplate(id: string): Promise<TemplateResponse> {
  const url = `${group}/${id}`;
  return axiosClient.get(url);
}

export function createTemplate(
  data: Template
): Promise<TemplateCreatedResponse> {
  const url = `${group}`;
  return axiosClient.post(url, data);
}

export function updateTemplate(
  id: string,
  data: Template
): Promise<TemplateUpdatedResponse> {
  const url = `${group}/${id}`;
  return axiosClient.put(url, data);
}

export function deleteTemplate(id: string): Promise<TemplateDeletedResponse> {
  const url = `${group}/${id}`;
  return axiosClient.delete(url);
}
