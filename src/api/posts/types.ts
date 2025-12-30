export interface PostSummary {
    id: number;
    title: string;
    excerpt: string;
    author: string;
    createdAt: string;
}

export interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    category: string;
    tags?: string[];
    readingTime: number;
    createdAt: string;
    updatedAt: string;
    status: "draft" | "published";
}
