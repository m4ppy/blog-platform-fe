export interface PostSummary {
    id: number;
    title: string;
    excerpt: string;
    author: string;
    createdAt: string;
}

export interface Author {
    id: string;
    name: string;
}

export type PostStatus = "draft" | "published";
export interface Post {
    id: number;
    title: string;
    content: string;
    author: Author;
    category: string;
    tags?: string[];
    readingTime: number;
    createdAt: string;
    updatedAt: string;
    status: PostStatus;
}
