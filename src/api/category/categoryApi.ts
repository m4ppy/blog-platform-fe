import axios from "../axiosInstance";
import type { Category } from "./types";

export async function getCategories(): Promise<Category[]> {
    const response = await axios.get<Category[]>("/categories");
    return response.data;
}

export async function createCategory(name: string): Promise<Category> {
    const res = await axios.post<Category>("/categories", {name});
    return res.data;
}

export async function deleteCategory(id: string): Promise<void> {
    await axios.delete(`/categories/${id}`);
}