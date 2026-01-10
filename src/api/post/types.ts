import type { Category } from "../category/types";
import type { Tag } from "../tag/types";

export interface Author {
    id: string;
    name: string;
}

export type PostStatus = "DRAFT" | "PUBLISHED";

export interface Post {
    id: string;
    title: string;
    content: string;
    author: Author;
    category: Category;
    tags?: Tag[];
    readingTime: number;
    createdAt: string;
    updatedAt: string;
    status: PostStatus;
}

export interface PostRequest {
    title: string;
    content: string;
    categoryId: string;
    tagIds: string[];
    status: PostStatus;
}