import axios from "../axiosInstance";
import { getApiErrorMessage } from "../handleApiError";
import type { Category } from "./types";

export async function getCategories(): Promise<Category[]> {
    const response = await axios.get<Category[]>("/categories");
    return response.data;
}

export async function createCategory(name: string): Promise<Category> {
    try {
        const res = await axios.post<Category>("/categories", {name});
        return res.data;
    } catch (error: any) {
        throw new Error(getApiErrorMessage(error));
    }
}

export async function deleteCategory(id: string): Promise<void> {
    try {
        await axios.delete(`/categories/${id}`);
    } catch (error: any) {
        throw new Error(getApiErrorMessage(error));
    }
}