import { getAccessToken } from "../../auth/authStorage.ts";
import axiosInstance from "../axiosInstance.ts";
import type { Post, PostRequest } from "./types.ts";

export async function getPostById(id: string | number): Promise<Post> {
    const response = await axiosInstance.get(`/posts/${id}`);
    return response.data;
}

export async function fetchPosts(): Promise<Post[]> {
    const response = await axiosInstance.get("/posts");
    return response.data;
}

export async function fetchMyDrafts(token: string): Promise<Post[]> {
    const response = await axiosInstance.get("/posts/drafts", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export async function createPost(data: PostRequest): Promise<Post> {
    const token = getAccessToken();
    const response = await axiosInstance.post("/posts", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export async function updatePost(
    id: string | number,
    data: PostRequest,
): Promise<Post> {
    const response = await axiosInstance.put(`/posts/${id}`, data);
    return response.data;
}

export async function deletePost(id: string | number): Promise<void> {
    await axiosInstance.delete(`/posts/${id}`);
}