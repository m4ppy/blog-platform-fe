import { fakePosts } from "./fakePosts";
import type { Post as FakePost } from "./types";

/** list page */
export function fakeFetchPosts(): Promise<FakePost[]> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(fakePosts), 300);
    });
}

/** detail page */
export function fakeFetchPostById(id: number): Promise<FakePost> {
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
