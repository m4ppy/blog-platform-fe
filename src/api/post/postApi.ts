import apiClient from "../apiClient.ts";
import type { Post } from "./types.ts";
import { fakePosts } from "./fakePosts.ts";
import type { User } from "../auth/types.ts";
import { getStoredUser } from "../../auth/authStorage.ts";

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

let nextPostId = fakePosts.length
    ? Math.max(...fakePosts.map((p) => p.id)) + 1
    : 1;

const user: User = getStoredUser()!;

export function fakeCreatePost(
    data: Partial<Post>,
): Promise<Post> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const now = new Date().toISOString();

            const newPost: Post = {
                id: nextPostId++,
                title: data.title ?? "",
                content: data.content ?? "",
                category: data.category ?? "",
                tags: data.tags ?? [],
                status: data.status ?? "draft",
                author: {
                    id: user.id,
                    name: user.name,    
                },
                readingTime: 1,
                createdAt: now,
                updatedAt: now,
            };

            fakePosts.unshift(newPost);
            resolve(newPost);
        }, 400);
    });
}

export function fakeUpdatePost(
  postId: number | null,
  data: Partial<Post>
): Promise<Post> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // ----------------------------------
      // CREATE
      // ----------------------------------
      if (postId === null) {
        const newPost: Post = {
          id: fakePosts.length + 1,
          title: data.title ?? "",
          content: data.content ?? "",
          category: data.category ?? "",
          tags: data.tags ?? [],
          status: data.status ?? "draft",
          author: data.author!, // from auth context later
          readingTime: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        fakePosts.push(newPost);
        resolve(newPost);
        return;
      }

      // ----------------------------------
      // UPDATE
      // ----------------------------------
      const index = fakePosts.findIndex((p) => p.id === postId);
      if (index === -1) {
        reject(new Error("Post not found"));
        return;
      }

      fakePosts[index] = {
        ...fakePosts[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };

      resolve(fakePosts[index]);
    }, 400);
  });
}

/** list page */
export function fakeFetchPosts(): Promise<Post[]> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(fakePosts), 300);
    });
}

/** detail page */
export function fakeFetchPostById(id: number): Promise<Post> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const post = fakePosts.find((p) => p.id === id);
            if (!post) {
                reject(new Error("Post not found"));
            }
            resolve(post!);
        }, 300);
    });
}
