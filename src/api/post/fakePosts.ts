import type { Post } from "./types";

export const fakePosts: Post[] = [
    {
        id: 1,
        title: "First Post",
        content: "This is the FULL content of the first post.",
        author: {
            id: 1,
            name: "Leon",
        },
        category: "General",
        tags: ["Introduction", "Welcome"],
        readingTime: 5,
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01",
        status: "published",
    },
    {
        id: 2,
        title: "Second Post",
        content: "Here is the detailed content of the second post.",
        author: {
            id: 1,
            name: "Leon",
        },
        category: "Tech",
        tags: ["Spring", "Security"],
        readingTime: 8,
        createdAt: "2025-01-02",
        updatedAt: "2025-01-02",
        status: "draft",
    },
];
