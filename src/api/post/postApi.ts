import apiClient from "../apiClient.ts";
import type { Post } from "./types.ts";
import { fakePosts } from "./fakePosts.ts";

export async function getPostById(id: string | number): Promise<Post> {
    const response = await apiClient.get(`/posts/${id}`);
    return response.data;
}

/**
 * Public posts (HomePage)
 */
export function fetchPublishedPosts(): Promise<Post[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fakePosts.filter(p => p.status === "published"));
    }, 300);
  });
}

/**
 * Drafts (authorized)
 */
export function fetchMyDrafts(userId: string): Promise<Post[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(
                fakePosts.filter(
                    p => p.status === "draft" && p.author.id.toString() === userId
                )
            );
        }, 300);
    });
}