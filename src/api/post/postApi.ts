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
            resolve(fakePosts.filter((p) => p.status === "published"));
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
                    (p) =>
                        p.status === "draft" &&
                        p.author.id.toString() === userId,
                ),
            );
        }, 300);
    });
}

export function fakeUpdatePost(postId: number, updated: Partial<Post>): Promise<Post> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const index = fakePosts.findIndex((p) => p.id === postId);
            if (index === -1) {
                reject(new Error("Post not found"));
                return;
            }

            fakePosts[index] = {
                ...fakePosts[index],
                ...updated,
                updatedAt: new Date().toISOString(),
            };

            resolve(fakePosts[index]);
        }, 400);
    });
}
