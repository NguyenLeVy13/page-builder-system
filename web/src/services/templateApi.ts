import axiosClient from "./axiosClient";
import type { Template } from "../types/template";

const group = "templates"

const templateApi = {
	getList(params: URLSearchParams) {
		const url = `${group}`;
		return axiosClient.get(url, { params });
	},
	getItem(id: string) {
		const url = `${group}/${id}`;
		return axiosClient.get(url);
	},
	add(data: Template) {
		const url = `${group}`;
		return axiosClient.post(url, data);
	},
	updated(data: Template) {
		const url = `${group}/${data.id}`;
		return axiosClient.put(url, data);
	},
	remove(id: string) {
		const url = `${group}/${id}`;
		return axiosClient.delete(url);
	},
};

export default templateApi;